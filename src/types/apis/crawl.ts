interface CrawlData {
  html_version: string
  links: Link[]
  links_count: number
  login_form: boolean
  status_code: number
  tags: Tag[]
  tags_count: number
  title: string
  url_status: string
}

interface Link {
  link: string
  type: string
  status_code: number
}

interface Tag {
  tagName: string
  count: number
}

export type CrawlResponse = CrawlData;

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
  jobId: string;
  url: string;
  urlId: string;
  status: string;
  startedAt?: string ;
  completedAt?: string ;
  progress?: number;
  title?: string;
  statusCode?: number;
  htmlVersion?: string;
  loginForm?: boolean;
  linksCount?: number;
  tagsCount?: number;
  tags?: Array<{
    name: string;
    count: number;
  }>;
  links?: Array<{
    link: string;
    type: string;
    statusCode: number;
  }>;
};