import useJobsStore from '../stores/jobs';
import { useUrlValidation } from './useUrlValidation';
import { useCrawlActions } from './useCrawlActions';

export const useUrlInputHandlers = () => {
  const url = useJobsStore((state) => state.url);
  const setUrl = useJobsStore((state) => state.setUrl);
  const jobs = useJobsStore((state) => state.jobs);
  const addJob = useJobsStore((state) => state.addJob);
  const selectedJobId = useJobsStore((state) => state.selectedJobId);
  const setSelectedJobId = useJobsStore((state) => state.setSelectedJobId);

  // Use smaller, focused hooks
  const { validationError, setValidationError, validateUrl, clearValidationError } = useUrlValidation();
  const { startCrawl, cancelCrawl, isStarting, isCancelling, startCrawlError } = useCrawlActions();


  const handleAddUrl = async () => {
    const error = validateUrl(url);
    if (error) {
      setValidationError(error);
      return;
    }

    clearValidationError();

    try {

      const jobResponse = await startCrawl(url);
      addJob({
        jobId: jobResponse.jobId,
        url: url,
        urlId: jobResponse.urlId,
        status: 'queued',
        progress: 0,
        startedAt: new Date().toString()
      });
      setUrl('');
    } catch (err) {
      console.error('Error starting crawl:', err);
    }
  };

  const handleCancel = async (jobId: string) => {
    try {
      await cancelCrawl(jobId);
    } catch (err) {
      console.error('Error cancelling crawl:', err);
    }
  };

  const handleViewDetails = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  return {
    // State
    url,
    setUrl,
    jobs,
    selectedJobId,
    setSelectedJobId,
    error: validationError || startCrawlError?.message || null,
    isLoading: isStarting || isCancelling,

    // Handlers
    handleAddUrl,
    handleCancel,
    handleViewDetails,
  };
};
