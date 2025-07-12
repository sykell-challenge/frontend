import React from 'react';
import { Button } from '@mui/material/Button';
import CrawlResultsLayout from './CrawlResultsLayout';
import type { CrawlJob } from '../../types';

interface CrawlResultsContainerProps {
  selectedJob: CrawlJob;
  onClose: () => void;
  className?: string;
}

const CrawlResultsContainer: React.FC<CrawlResultsContainerProps> = ({ 
  selectedJob, 
  onClose, 
  className 
}) => {
  if (!selectedJob.data) {
    return null;
  }

  const title = `${selectedJob.status === 'completed' ? 'Crawl Results' : 'Partial Results'}: ${selectedJob.url}`;
  const isInProgress = selectedJob.status === 'started';

  return (
    <div className={`relative ${className}`}>
      {/* Close button positioned absolutely */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          icon="pi pi-times"
          className="p-button-text"
          onClick={onClose}
          tooltip="Close Details"
        />
      </div>
      
      <CrawlResultsLayout
        data={selectedJob.data}
        url={selectedJob.url}
        title={title}
        isInProgress={isInProgress}
      />
    </div>
  );
};

export default CrawlResultsContainer;
