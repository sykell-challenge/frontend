import { createFileRoute, useNavigate } from '@tanstack/react-router'
import CircularProgress from '@mui/material/CircularProgress';
import CrawlResultsLayout from '../../parts/templates/CrawlResultsLayout';
import { useUrlData } from '../../hooks/apis/useUrlData';
import { Alert, Button, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';

export const Route = createFileRoute('/results/$url')({
  component: RouteComponent,
})

function RouteComponent() {
  const { url } = Route.useParams()
  const { data, originalData, loading, error } = useUrlData(url);

  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <CircularProgress />
      </div>
    );
  }

  if (error || !data || !originalData) {
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

  const isCompleted = originalData.status === 'done';

  return (
    <CrawlResultsLayout
      data={data}
      url={originalData.url}
      isInProgress={!isCompleted}
    />
  );
}
