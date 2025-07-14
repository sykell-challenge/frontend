import React from 'react';
import Button from '@mui/material/Button'
import { getStatusSeverity, getStatusDisplayText } from '../../utils/getStatusSeverity';
import type { CrawlJob } from '../../types';
import type { CrawlStatus } from '../../types/apis/crawl';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {
  DataGrid,
  GridActionsCellItem,
  Toolbar,
  ToolbarButton,

  type GridColDef
} from '@mui/x-data-grid';

interface CrawlJobsTableProps {
  jobs: CrawlJob[];
  onViewDetails: (jobId: string) => void;
  onCancel: (jobId: string) => void;
}



const CrawlJobsTable: React.FC<CrawlJobsTableProps> = ({
  jobs,
}) => {
  const columns: GridColDef[] = [
    { field: 'url', headerName: 'URL', flex: 1, align: 'left', renderCell: (params) => <a className="truncate" href={"/results/" + params.row.urlId}>{params.value}</a> },
    {
      field: 'status', headerName: 'Status', width: 150, align: 'center', renderCell: (params) => (
        <Chip
          label={getStatusDisplayText(params.row.status as CrawlStatus, !!params.row.data)}
          color={getStatusSeverity(params.row.status as CrawlStatus)}
        />
      )
    },
    {
      field: 'progress', headerName: 'Progress', width: 150, align: 'center', renderCell: (params) => (
        <div className="flex justify-center items-center h-full">
          <LinearProgress variant='determinate' value={params.row.progress || 0} style={{ height: '8px', width: '100px' }} />
        </div>
      )
    },
    { field: 'createdAt', headerName: 'Created At', width: 180, renderCell: (params) => new Date(params.row.startedAt as string).toLocaleString() },
    {
      field: 'actions', headerName: 'Actions', width: 150, type: 'actions',
      getActions: (params: any) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityOutlinedIcon />}
            label="View Details"
          />,
          <GridActionsCellItem
            icon={<ClearOutlinedIcon />}
            label="Cancel Job"
          />
        ]
      }
    }
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1000px]">
        <DataGrid
          label='Crawl Jobs Table'
          rows={jobs.map((job, index) => ({
            id: index,
            ...job,
          }))}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          autoPageSize
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default CrawlJobsTable;