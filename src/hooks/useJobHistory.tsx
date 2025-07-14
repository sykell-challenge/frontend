import React from 'react';
import useJobsStore from '../stores/jobs';
import { useCrawlHistory } from './apis/useCrawlHistory';

export const useJobHistory = () => {
  const setJobs = useJobsStore((state) => state.setJobs);
  const { data: historyData, loading: historyLoading, error: historyError } = useCrawlHistory();

  React.useEffect(() => {
    console.log(historyData)
    if (historyData?.job_history) {
      const jobsFromHistory = historyData.job_history;
      setJobs(jobsFromHistory);
    }
  }, [historyData, setJobs]);

  return {
    historyData,
    historyLoading,
    historyError,
  };
};
