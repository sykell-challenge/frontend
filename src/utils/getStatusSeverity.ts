import type { CrawlStatus } from '../types/apis/crawl';

type StatusSeverity = 'success' | 'primary' | 'default' | 'secondary' | 'info';

/**
 * Maps crawl job status to PrimeReact severity
 */

export const getStatusSeverity = (status: CrawlStatus): StatusSeverity => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'error':
    case 'cancelled':
      return 'secondary';
    case 'running':
      return 'info';
    case 'queued':
      return 'primary';
    default:
      return 'default';
  }
};

/**
 * Gets display text for status, handling special cases
 */
export const getStatusDisplayText = (
  status: CrawlStatus,
  hasData?: boolean,
): string => {
  if (status === 'running' && hasData) {
    return 'PARTIAL DATA';
  }
  return status.toUpperCase();
};
