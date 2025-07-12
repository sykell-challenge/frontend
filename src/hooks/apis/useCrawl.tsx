
import useApiRequest from './useAuthRequest'
import type { CrawlJobResponse } from '../../types/apis/crawl';

const useCrawl = () => {
    const { makeRequest: startCrawlRequest } = useApiRequest({
        endpoint: "/crawl",
        method: "POST",
        requiresAuth: true,
    });

    const { makeRequest: cancelCrawlRequest } = useApiRequest({
        endpoint: "/crawl",
        method: "DELETE",
        requiresAuth: true,
    });

    async function startCrawl(url: string) {
        const [success, data] = await startCrawlRequest({ url });
        return [success, data as CrawlJobResponse];
    }

    async function cancelCrawl(jobId: string) {
        return await cancelCrawlRequest(undefined, `/crawl/${jobId}`);
    }

    return { startCrawl, cancelCrawl };
}

export default useCrawl