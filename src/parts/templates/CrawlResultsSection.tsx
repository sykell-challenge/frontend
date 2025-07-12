import React from 'react';
import { Button } from 'primereact/button';
import CrawlResultsLayout from './CrawlResultsLayout';
import { useSelectedJob } from '../../hooks/useSelectedJob';

const CrawlResultsSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { selectedJob, hasValidJobData, clearSelection } = useSelectedJob();

  // Don't render if no job is selected or no data available
  if (!hasValidJobData || !selectedJob || !selectedJob.data) {
    return null;
  }

  const title = `${selectedJob.status === 'completed' ? 'Crawl Results' : 'Partial Results'}: ${selectedJob.url}`;
  const isInProgress = selectedJob.status === 'started';

  return (
    <div className={`relative ${className}`}>
      {/* Close button positioned absolutely in the top right */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          icon="pi pi-times"
          className="p-button-text"
          onClick={clearSelection}
          tooltip="Close Details"
        />
      </div>
      
      <CrawlResultsLayout 
        data={selectedJob.data}
        url={selectedJob.url}
        title={title}
        isInProgress={isInProgress}
        className={className}
      />
    </div>
  );
};

export default CrawlResultsSection;
