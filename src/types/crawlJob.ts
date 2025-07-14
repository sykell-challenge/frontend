import type { CrawlResponse } from './apis/crawl';

export interface CrawlJob {
  ID: number;
  startedAt?: string;
  jobId?: string;
  status?: string;
  url?: string;
  urlId?: number;
  data?: CrawlResponse;
  progress?: number;
  error?: string;
}
