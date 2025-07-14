import { createFileRoute, useNavigate } from '@tanstack/react-router'
import CircularProgress from '@mui/material/CircularProgress';
import CrawlResultsLayout from '../../parts/templates/CrawlResultsLayout';
import { Alert, Button, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import useApiRequest from '../../hooks/apis/useAuthRequest';
import type { URL } from '../../types/urls';
import React from 'react';
import useUrlStore from '../../stores/job';

export const Route = createFileRoute('/results/$url')({
  component: RouteComponent,
})

function RouteComponent() {
  const { url: urlId } = Route.useParams()
  const { data, loading, error, makeRequest } = useApiRequest<URL>({
    endpoint: `/urls/${urlId}`,
    method: "GET",
    requiresAuth: true,
  });

  const url = useUrlStore((state) => state.url);
  const setUrl = useUrlStore((state) => state.setUrl);

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!data) {
      return
    }

    setUrl(data)

    // if (data.status === 'running' || data.status === 'queued') {
    //   // If the job is still running or queued, we can set an interval to poll for updates
    //   const interval = setInterval(() => {
    //     makeRequest();
    //   }, 5000); 

    //   return () => clearInterval(interval);
    // }
  }, [data])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <CircularProgress />
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="w-full p-16">
        <Alert severity="error">
          {error ? 'Failed to fetch URL data' : 'No data found for this URL'}
        </Alert>
        <div className="flex gap-4 py-16">
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => navigate({ to: '/results' })}
          >
            Go Back
          </Button>

          <Button
            startIcon={<RefreshIcon />}
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>



        </div>
      </div>
    );
  }

  const isCompleted = url.status === 'done';

  return (
    <CrawlResultsLayout
      data={url}
      url={url.url}
      isInProgress={!isCompleted}
    />
  );
}
