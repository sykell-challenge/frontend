import { create } from 'zustand'
import type { CrawlResponse, CrawlStatus } from '../types/apis/crawl';
import type { CrawlJob } from '../types';


const useCrawlStore = create<{
  url: string;
  setUrl: (url: string) => void;
  jobs: CrawlJob[];
  addJob: (job: CrawlJob) => void;
  updateJob: (jobId: string, updates: Partial<CrawlJob>) => void;
  setJobs: (jobs: CrawlJob[]) => void;
  selectedJobId: string | null;
  setSelectedJobId: (jobId: string | null) => void;
}>((set) => ({
  url: '',
  setUrl: (url) => set({ url }),
  jobs: [],
  addJob: (job) => set(state => ({ jobs: [...state.jobs, job] })),
  updateJob: (jobId, updates) => set(state => ({
    jobs: state.jobs.map(job =>
      job.jobId === jobId ? { ...job, ...updates } : job
    )
  })),
  setJobs: (jobs) => set({ jobs }),
  selectedJobId: null,
  setSelectedJobId: (jobId) => set({ selectedJobId: jobId }),
}))

export default useCrawlStore