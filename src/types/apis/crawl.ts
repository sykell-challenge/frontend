type CrawlStats = {
  numberOfInternalLinks: number;
  numberOfExternalLinks: number;
  numberOfBrokenLinks: number;
};

type CrawlTag = {
  tagName: string;
  count: number;
};

type CrawlData = {
  internalLinks: string[];
  externalLinks: string[];
  brokenLinks: string[];
  title: string;
  stats: CrawlStats;
  tags: CrawlTag[];
};

export type CrawlResponse = CrawlData