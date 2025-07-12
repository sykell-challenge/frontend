import useApiRequest from './useAuthRequest';
import type { CrawlJob } from '../../types';

export type CrawlHistoryResponse =
  CrawlJob[];


export const useCrawlHistory = () => {
  const { data, loading, error, refetch } = useApiRequest<CrawlHistoryResponse>({
    endpoint: "/crawl-history",
    method: "GET",
    requiresAuth: true,
    manual: false,
  });

  return {
    data,
    loading,
    error,
    refetch
  };
};
