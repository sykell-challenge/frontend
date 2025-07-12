import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { getStatusSeverity, getStatusDisplayText } from '../../utils/getStatusSeverity';
import type { CrawlJob } from '../../types';
import type { CrawlStatus } from '../../types/apis/crawl';
import { Skeleton } from 'primereact/skeleton';

const CrawlJobsTable: React.FC = () => {
  const skeletonTemplate = (rowData: CrawlJob) => {
    return <Skeleton />
  };

  const jobs = [{},{},{},{}]

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
          body={skeletonTemplate}
          className="w-2/5"
        />
        <Column
          field="status"
          header="Status"
          body={skeletonTemplate}
          className="w-1/6"
        />
        <Column
          header="Progress"
          body={skeletonTemplate}
          className="w-1/6"
        />
        <Column
          field="createdAt"
          header="Created"
          body={skeletonTemplate}
          className="w-1/6"
        />
        <Column
          header="Actions"
          body={skeletonTemplate}
          className="w-1/12"
        />
      </DataTable>
    </div>
  );
};

export default CrawlJobsTable;
