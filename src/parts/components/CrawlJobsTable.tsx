import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { getStatusSeverity, getStatusDisplayText } from '../../utils/getStatusSeverity';
import type { CrawlJob } from '../../types';
import type { CrawlStatus } from '../../types/apis/crawl';

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
        <Tag
          value={getStatusDisplayText(rowData.status as CrawlStatus, !!rowData.data)}
          severity={getStatusSeverity(rowData.status as CrawlStatus)}
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
        <ProgressBar
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
            icon="pi pi-eye"
            size="small"
            className="p-button-text"
            onClick={() => onViewDetails(rowData.jobId)}
            tooltip={['started', 'running'].includes(rowData.status) ? 'View Partial Results' : 'View Details'}
          />
        )}
        {['queued', 'started', 'running'].includes(rowData.status) && (
          <Button
            icon="pi pi-times"
            size="small"
            className="p-button-text p-button-danger"
            onClick={() => onCancel(rowData.jobId)}
            tooltip="Cancel"
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
      <DataTable
        value={jobs}
        emptyMessage="No crawl jobs yet. Add a URL above to get started!"
        className="p-datatable-sm"
        stripedRows
      >
        <Column
          field="url"
          header="URL"
          body={urlBodyTemplate}
          className="w-2/5"
        />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          className="w-1/6"
        />
        <Column
          header="Progress"
          body={progressBodyTemplate}
          className="w-1/6"
        />
        <Column
          field="createdAt"
          header="Created"
          body={timeBodyTemplate}
          className="w-1/6"
        />
        <Column
          header="Actions"
          body={actionsBodyTemplate}
          className="w-1/12"
        />
      </DataTable>
    </div>
  );
};

export default CrawlJobsTable;
