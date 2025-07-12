import useApiRequest from './apis/useAuthRequest';
import type { CrawlJobResponse } from '../types/apis/crawl';

export const useCrawlActions = () => {
  const { 
    makeRequest: executeStartCrawl, 
    loading: startCrawlLoading, 
    error: startCrawlError 
  } = useApiRequest({
    endpoint: "/crawl",
    method: "POST",
    requiresAuth: true,
  });

  const { 
    makeRequest: executeCancelCrawl, 
    loading: cancelCrawlLoading 
  } = useApiRequest({
    endpoint: "/crawl",
    method: "DELETE", 
    requiresAuth: true,
  });

  const startCrawl = async (url: string): Promise<CrawlJobResponse> => {
    const [success, data] = await executeStartCrawl({ url: url.trim() });
    if (success) {
      return data as CrawlJobResponse;
    }
    throw new Error('Failed to start crawl');
  };

  const cancelCrawl = async (jobId: string): Promise<void> => {
    const [success] = await executeCancelCrawl(undefined, `/crawl/${jobId}`);
    if (!success) {
      throw new Error('Failed to cancel crawl');
    }
  };

  return {
    startCrawl,
    cancelCrawl,
    isStarting: startCrawlLoading,
    isCancelling: cancelCrawlLoading,
    startCrawlError,
  };
};
