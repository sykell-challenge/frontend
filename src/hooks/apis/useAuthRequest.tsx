import useAxios from 'axios-hooks';

interface ApiRequestConfig {
  endpoint: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  requiresAuth?: boolean;
  manual?: boolean;
}

const useApiRequest = <T = any>(config: ApiRequestConfig) => {
  const baseUrl = import.meta.env.BACKEND_URL;

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (config.requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  };

  const [{ data, loading, error }, execute] = useAxios<T>(
    {
      url: `${baseUrl}${config.endpoint}`,
      method: config.method,
      headers: getHeaders(),
    },
    { manual: config.manual === true }, // By default, manual is false
  );

  async function makeRequest(
    requestData?: Record<string, any>,
    dynamicEndpoint?: string,
  ): Promise<[boolean, T | Error]> {
    try {
      const response = await execute({
        data: requestData,
        url: dynamicEndpoint
          ? `${baseUrl}${dynamicEndpoint}`
          : `${baseUrl}${config.endpoint}`,
      });
      return [true, response.data];
    } catch (error) {
      return [false, error as Error];
    }
  }

  return { makeRequest, data, loading, error, refetch: execute };
};

export default useApiRequest;
