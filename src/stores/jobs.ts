import { create } from 'zustand'
import type { CrawlJob } from '../types';
import type { SocketMessage } from '../types/apis/crawl';

const useJobsStore = create<{
  jobs: Array<CrawlJob> | null;
  setJobs: (jobs: Array<CrawlJob> | null) => void;
  addJob: (job: CrawlJob) => void;
  updateJob: (job: SocketMessage) => void;
  removeJob: (jobId: string) => void;
}>((set) => ({
  jobs: null,
  setJobs: (jobs) => set({ jobs }),
  addJob: (job: CrawlJob) => set((state) => ({
    jobs: state.jobs ? [job, ...state.jobs] : [job],
  })),
  updateJob: (job: SocketMessage) =>
    set((state) => {
      return {
        jobs: state.jobs ? state.jobs.map(j => j.jobId?.toString() === job.jobId?.toString() ? { ...j, ...job } : j) : null,
      }
    }),
  removeJob: (jobId: string) => set((state) => ({
    jobs: state.jobs ? state.jobs.filter(job => job.jobId !== jobId) : null,
  })),
}))

export default useJobsStore