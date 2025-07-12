import { useEffect } from 'react';
import useApiRequest from './useAuthRequest';
import type { CrawlResponse } from '../../types/apis/crawl';

export interface UrlDataResponse {
  data: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    url: string;
    title: string;
    status: string;
    status_code: number;
    html_version: string;
    login_form: boolean;
    tags: Array<{
      tagName: string;
      count: number;
    }>;
    links: Array<{
      link: string;
      type: string;
      status_code: number;
    }>;
    crawl_jobId: string;
  };
}

export const useUrlData = (urlId: string) => {
  const { data, loading, error, makeRequest } = useApiRequest<UrlDataResponse>({
    endpoint: `/urls/${urlId}`,
    method: "GET",
    requiresAuth: true,
    manual: true,
  });

  useEffect(() => {
    if (urlId) {
      makeRequest();
    }
  }, [urlId]);

  // Transform the API response to match CrawlResponse format
  console.log("useUrlData response:", data);
  const transformedData: CrawlResponse | null = data?.data ? {
    title: data.data.title,
    status_code: data.data.status_code,
    html_version: data.data.html_version,
    login_form: data.data.login_form,
    tags: data.data.tags,
    links: data.data.links,
    links_count: data.data.links.length,
    tags_count: data.data.tags.length,
    url_status: data.data.status
  } : null;

  return {
    data: transformedData,
    originalData: data?.data,
    loading,
    error,
    refetch: () => makeRequest()
  };
};
