import type { URL } from '../urls';

export type CrawlResponse = URL;

export type CrawlStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'error'
  | 'cancelled';

export type SocketMessage = {
  ID: number;
  jobId: string;
  url: string;
  urlId: number;
  status: string;
  startedAt?: string;
  completedAt?: string;
  progress?: number;
  title?: string;
  statusCode?: string;
  htmlVersion?: string;
  loginForm?: boolean;
  linksCount?: number;
  tagsCount?: number;
  tags?: Array<{
    tagName: string;
    count: number;
  }>;
  links?: Array<{
    link: string;
    type: string;
    statusCode: string;
  }>;
};
