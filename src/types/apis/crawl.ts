import type { URL } from "../urls";

export type CrawlResponse = URL;

// New types for job-based API
export type CrawlJobResponse = {
  jobId: string;
  message: string;
  url: string;
  urlId: string;
  status: CrawlStatus;
  startTime: string;
};

export type CrawlStatus = 'queued' | 'running' | 'completed' | 'error' | 'cancelled';

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
