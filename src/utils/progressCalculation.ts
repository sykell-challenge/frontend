import type { CrawlStatus } from '../types/apis/crawl';

export const calculateJobProgress = (status: CrawlStatus): number => {
  switch (status) {
    case 'completed':
      return 100;
    case 'running':
      return 50;
    case 'queued':
    case 'error':
    case 'cancelled':
    default:
      return 0;
  }
};
