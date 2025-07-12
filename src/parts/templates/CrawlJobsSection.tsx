import React from 'react';
import Card  from '@mui/material/Card';
import CrawlJobsTable from '../components/CrawlJobsTable';
import CrawlJobsTableSkeleton from '../components/CrawlJobsTableSkeleton';
import { useUrlInputHandlers } from '../../hooks/useUrlInputHandlers';
import { useCrawlHistory } from '../../hooks/apis/useCrawlHistory';

const CrawlJobsSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { handleViewDetails, handleCancel, isLoading } = useUrlInputHandlers();
  const { data: jobs,
    loading,
    error,
    refetch } = useCrawlHistory()

  if (loading) {
    return <Card className={`w-full ${className}`}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Crawl Jobs</h3>

        <CrawlJobsTableSkeleton />


      </div>
    </Card>
  }

  return (
    <Card className={`w-full ${className}`}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Crawl Jobs</h3>

        <CrawlJobsTable
          key={jobs?.length}
          jobs={jobs || []}
          onViewDetails={handleViewDetails}
          onCancel={handleCancel}
        />

      </div>
    </Card>
  );
};

export default CrawlJobsSection;
