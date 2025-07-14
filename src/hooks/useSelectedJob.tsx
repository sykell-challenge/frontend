import React from 'react';
import useJobsStore from '../stores/jobs';

export const useSelectedJob = () => {
  const selectedJobId = useJobsStore((state) => state.selectedJobId);
  const setSelectedJobId = useJobsStore((state) => state.setSelectedJobId);
  
  const selectedJob = useJobsStore(
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
