import React from 'react';
import Button from '@mui/material/Button';
import {
  getStatusSeverity,
  getStatusDisplayText,
} from '../../utils/getStatusSeverity';
import type { CrawlStatus } from '../../types/apis/crawl';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid';
import { useNavigate } from '@tanstack/react-router';
import useApiRequest from '../../hooks/apis/useAuthRequest';
import { BACKEND_ROUTES } from '../../consts/backendRoutes';
import { Snackbar } from '@mui/material';
import useJobsStore from '../../stores/jobs';

interface CrawlJobsTableProps {}

const paginationModel = { page: 0, pageSize: 5 };

const useColumns = (
  setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const navigate = useNavigate();

  const { makeRequest: cancelCrawlRequest } = useApiRequest({
    endpoint: '/crawl',
    method: 'DELETE',
    requiresAuth: true,
    manual: true,
  });

  const columns: GridColDef[] = [
    {
      field: 'url',
      headerName: 'URL',
      flex: 1,
      align: 'left',
      renderCell: (params) => (
        <a className="truncate" href={'/results/' + params.row.urlId}>
          {params.value}
        </a>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={getStatusDisplayText(
            params.row.status as CrawlStatus,
            !!params.row.data,
          )}
          color={getStatusSeverity(params.row.status as CrawlStatus)}
        />
      ),
    },
    {
      field: 'progress',
      headerName: 'Progress',
      width: 150,
      align: 'center',
      renderCell: (params) => (
        <div className="flex justify-center items-center h-full">
          <LinearProgress
            variant="determinate"
            value={params.row.progress || 0}
            style={{ height: '8px', width: '100px' }}
          />
        </div>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      renderCell: (params) =>
        params.row.startedAt
          ? new Date(params.row.startedAt as string).toLocaleString()
          : '-',
    },
    {
      field: 'completedAt',
      headerName: 'Completed At',
      width: 180,
      renderCell: (params) =>
        params.row.completedAt
          ? new Date(params.row.completedAt as string).toLocaleString()
          : '-',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      type: 'actions',
      getActions: (params: any) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityOutlinedIcon />}
            label="View Details"
            onClick={() => {
              navigate({ to: `/results/${params.row.urlId}` });
            }}
          />,
          <GridActionsCellItem
            icon={<ClearOutlinedIcon />}
            label="Cancel Job"
            onClick={async () => {
              if (params.row.status !== 'running') {
                setMessage('Job is not running, cannot cancel');
                console.warn('Job is not running, cannot cancel');
                return;
              }
              const [success, response] = await cancelCrawlRequest(
                { id: params.row.id },
                BACKEND_ROUTES.STOP_CRAWL(params.row.jobId),
              );
              if (success) {
                // navigate({ to: '/results' });
                setMessage('Crawl job cancelled successfully');
              } else {
                console.error('Failed to cancel crawl job:', response);
              }
            }}
          />,
        ];
      },
    },
  ];

  return columns;
};

const CrawlJobsTable: React.FC<CrawlJobsTableProps> = ({}) => {
  const [message, setMessage] = React.useState('');

  const columns = useColumns(setMessage);

  const jobs = useJobsStore((state) => state.jobs);

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1000px] h-[400px] max-h-[600px]">
        <DataGrid
          label="Crawl Jobs Table"
          rows={
            jobs?.map((job, index) => ({
              id: index,
              ...job,
            })) || []
          }
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          autoPageSize
          checkboxSelection
          showToolbar
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={message !== ''}
        // autoHideDuration={6000}
        onClose={() => setMessage('')}
        message={message}
        action={
          <Button color="inherit" onClick={() => setMessage('')}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default CrawlJobsTable;
