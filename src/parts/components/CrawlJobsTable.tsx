import React from 'react';
import Button from '@mui/material/Button'
import { getStatusSeverity, getStatusDisplayText } from '../../utils/getStatusSeverity';
import type { CrawlJob } from '../../types';
import type { CrawlStatus } from '../../types/apis/crawl';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface CrawlJobsTableProps {
  jobs: CrawlJob[];
  onViewDetails: (jobId: string) => void;
  onCancel: (jobId: string) => void;
}

const CrawlJobsTable: React.FC<CrawlJobsTableProps> = ({
  jobs,
  onViewDetails,
  onCancel,
}) => {
  const statusBodyTemplate = (rowData: CrawlJob) => {
    return (
      <div className="flex flex-col gap-1">
        <Chip
          label={getStatusDisplayText(rowData.status as CrawlStatus, !!rowData.data)}
          color={getStatusSeverity(rowData.status as CrawlStatus)}
        />
        {rowData.status === 'error' && rowData.error && (
          <span className="text-xs text-red-600">{rowData.error}</span>
        )}
        {['started', 'running'].includes(rowData.status) && rowData.data && (
          <span className="text-xs text-blue-600">Results available</span>
        )}
      </div>
    );
  };

  const progressBodyTemplate = (rowData: CrawlJob) => {
    if (['queued', 'started', 'running'].includes(rowData.status)) {
      return (
        <LinearProgress
          value={rowData.progress || 0}
          style={{ height: '8px', width: '100px' }}
        />
      );
    }
    return null;
  };

  const actionsBodyTemplate = (rowData: CrawlJob) => {
    return (
      <div className="flex gap-2">
        {(rowData.status === 'completed' || (['started', 'running'].includes(rowData.status) && rowData.data)) && (
          <Button
            startIcon={<VisibilityOutlinedIcon />}
            size="small"
            className="p-button-text"
            onClick={() => onViewDetails(rowData.jobId)}
          />
        )}
        {['queued', 'started', 'running'].includes(rowData.status) && (
          <Button
            startIcon={<ClearOutlinedIcon />}
            size="small"
            className="p-button-text p-button-danger"
            onClick={() => onCancel(rowData.jobId)}
          />
        )}
      </div>
    );
  };

  const urlBodyTemplate = (rowData: CrawlJob) => {
    return (
      <a className="max-w-xs truncate" href={"/results/" + rowData.urlId}>
        {rowData.url}
      </a>
    );
  };

  const timeBodyTemplate = (rowData: CrawlJob) => {
    return new Date(rowData.startedAt as string).toLocaleString();
  };



  return (
    <div className="w-full">
      <TableContainer component={Paper} sx={{ minWidth: 650 }} aria-label="crawl jobs table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.jobId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{urlBodyTemplate(job)}</TableCell>
                <TableCell>{statusBodyTemplate(job)}</TableCell>
                <TableCell>{progressBodyTemplate(job)}</TableCell>
                <TableCell>{timeBodyTemplate(job)}</TableCell>
                <TableCell>{actionsBodyTemplate(job)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CrawlJobsTable;
