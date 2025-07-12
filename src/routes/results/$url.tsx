import { createFileRoute } from '@tanstack/react-router'
import CircularProgress from '@mui/material/CircularProgress';
import CrawlResultsLayout from '../../parts/templates/CrawlResultsLayout';
import { useUrlData } from '../../hooks/apis/useUrlData';

export const Route = createFileRoute('/results/$url')({
  component: RouteComponent,
})

function RouteComponent() {
  const { url } = Route.useParams()
  const { data, originalData, loading, error } = useUrlData(url);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <CircularProgress />
      </div>
    );
  }

  if (error || !data || !originalData) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading URL Data
          </h2>
          <p className="text-gray-600">
            {error ? 'Failed to fetch URL data' : 'No data found for this URL'}
          </p>
        </div>
      </div>
    );
  }

  const title = `Crawl Results: ${originalData.url}`;
  const isCompleted = originalData.status === 'done';

  return (
    <CrawlResultsLayout
      data={data}
      url={originalData.url}
      title={title}
      isInProgress={!isCompleted}
    />
  );
}
