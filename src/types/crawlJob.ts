import type { CrawlResponse } from './apis/crawl';

export interface CrawlJob {
  completed_at?: string;
  startedAt?: string;
  duration_ms?: number;
  is_active?: boolean;
  jobId: string;
  status: string;
  url: string;
  urlId: string;
  data?: CrawlResponse;
  progress?: number;
  error?: string;
}
