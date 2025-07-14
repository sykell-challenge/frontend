import React from 'react';
import Card from '@mui/material/Card';
import CrawlJobsTable from '../components/CrawlJobsTable';
import CrawlJobsTableSkeleton from '../components/CrawlJobsTableSkeleton';
import Button from '@mui/material/Button';
import { Alert, Typography } from '@mui/material';
import CrawlForm from '../components/CrawlForm';
import useApiRequest from '../../hooks/apis/useAuthRequest';
import type { CrawlJob } from '../../types';

const CrawlJobsSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { data: jobs, loading, error, refetch } = useApiRequest<Array<CrawlJob>>({
    endpoint: "/crawl-history",
    method: "GET",
    requiresAuth: true,
    manual: false,
  });

  if (loading) {
    return <Card className={`w-full ${className}`}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Crawl Jobs</h3>

        <CrawlJobsTableSkeleton />


      </div>
    </Card>
  }

  if (error) {
    return <div className={`flex flex-col justify-center w-full gap-4 ${className}`}>
      <Alert severity="error" className="w-full">
        {error?.message || 'No crawl jobs found.'}
      </Alert>
      <div className="flex justify-center ">
        <Button variant='contained' onClick={() => refetch()}>Retry</Button>
      </div>

    </div>;
  }

  if (!jobs?.length) {
    return <div className={`flex flex-col justify-center w-full gap-12 ${className}`}>
      <Alert severity="info" className="w-full">
        No crawl jobs found. Start a new crawl job to see results.
      </Alert>
      <CrawlForm />
    </div>;
  }

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>

      <CrawlJobsTable
        key={jobs?.length}
        jobs={jobs || []}
      />

    </div>

  );
};

export default CrawlJobsSection;
