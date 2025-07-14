import React from 'react';
import Card from '@mui/material/Card';
import CrawlJobsTable from '../components/CrawlJobsTable';
import CrawlJobsTableSkeleton from '../components/CrawlJobsTableSkeleton';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import useApiRequest from '../../hooks/apis/useAuthRequest';
import type { CrawlJob } from '../../types';
import useJobsStore from '../../stores/jobs';

const CrawlJobsSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const { data, loading, error, refetch } = useApiRequest<Array<CrawlJob>>({
    endpoint: '/crawl-history',
    method: 'GET',
    requiresAuth: true,
    manual: false,
  });

  const [firstLoad, setFirstLoad] = React.useState(true);

  const jobs = useJobsStore((state) => state.jobs);
  const setJobs = useJobsStore((state) => state.setJobs);

  React.useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      await refetch();
      if (!cancelled) {
        console.log(parseInt(process.env.POLLING_INTERVAL || '5000'), 'ms');
        setTimeout(tick, parseInt(process.env.POLLING_INTERVAL || '5000'));
      }
    };

    tick();

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!firstLoad) {
      return;
    }
    if (!data) {
      return;
    }
    console.log('Setting jobs from API data');
    setJobs(data);
  }, [data]);

  React.useEffect(() => {
    if (jobs) {
      setFirstLoad(false);
    }
  }, [jobs]);

  if (loading && firstLoad) {
    return (
      <Card className={`w-full ${className}`}>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Crawl Jobs</h3>

          <CrawlJobsTableSkeleton />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col justify-center w-full gap-4 ${className}`}>
        <Alert severity="error" className="w-full">
          {error?.message || 'No crawl jobs found.'}
        </Alert>
        <div className="flex justify-center ">
          <Button variant="contained" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <div
        className={`flex flex-col justify-center w-full gap-12 ${className}`}
      >
        <Alert severity="info" className="w-full">
          No crawl jobs found. Start a new crawl job to see results.
        </Alert>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      <CrawlJobsTable />
    </div>
  );
};

export default CrawlJobsSection;
