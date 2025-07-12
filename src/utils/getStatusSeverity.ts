import type { CrawlStatus } from "../types/apis/crawl";


export type StatusSeverity = 
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

/**
 * Maps crawl job status to PrimeReact severity
 */

export const getStatusSeverity = (status: CrawlStatus): StatusSeverity => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'error':
    case 'cancelled':
      return 'danger';
    case 'running':
      return 'warning';
    case 'queued':
      return 'info';
    default:
      return 'info';
  }
};

/**
 * Gets display text for status, handling special cases
 */
export const getStatusDisplayText = (status: CrawlStatus, hasData?: boolean): string => {
  if (status === 'running' && hasData) {
    return 'PARTIAL DATA';
  }
  return status.toUpperCase();
};
