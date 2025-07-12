import React from 'react';
import useCrawlStore from '../stores/crawl';

export const useSelectedJob = () => {
  const selectedJobId = useCrawlStore((state) => state.selectedJobId);
  const setSelectedJobId = useCrawlStore((state) => state.setSelectedJobId);
  
  const selectedJob = useCrawlStore(
    React.useCallback((state) => {
      if (!state.selectedJobId) return null;
      return state.jobs.find(job => job.jobId === state.selectedJobId) || null;
    }, [selectedJobId])
  );

  const hasValidJobData = React.useMemo(() => {
    if (!selectedJob || !selectedJob.data) return false;
    return selectedJob.status === 'completed' || (selectedJob.status === 'started' && selectedJob.data);
  }, [selectedJob]);

  const clearSelection = React.useCallback(() => {
    setSelectedJobId(null);
  }, [setSelectedJobId]);

  return {
    selectedJob,
    selectedJobId,
    hasValidJobData,
    clearSelection,
    setSelectedJobId
  };
};
