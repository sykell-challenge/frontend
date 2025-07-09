import { create } from 'zustand'
import type { CrawlResponse } from '../types/apis/crawl';

const useCrawlStore = create<{
  crawlData: CrawlResponse | null;
  setCrawlData: (data: CrawlResponse | null) => void;
  url: string;
  setUrl: (url: string) => void;
}>((set) => ({
  crawlData: null,
  setCrawlData: (data) => set({ crawlData: data }),
  url: '',
  setUrl: (url) => set({ url }),
}))

export default useCrawlStore