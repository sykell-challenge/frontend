import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import useApiRequest from '../../hooks/apis/useAuthRequest';
import { useNavigate } from '@tanstack/react-router';
import type { Response } from '../../types/apis/postCrawl';

const CrawlForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const [url, setUrl] = React.useState('');
  const [error, setError] = React.useState("");
  const { makeRequest: makeCrawlRequest, loading: isLoading, } = useApiRequest<Response>({
    endpoint: "/crawl",
    method: "POST",
    requiresAuth: true,
    manual: true,
  });

  const navigate = useNavigate();

  async function onAddUrlClick(urlInput: string = url) {
    if (!urlInput.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    if (!urlInput.startsWith("http")) {
      urlInput = "http://" + urlInput;
    }

    const [success, response] = await makeCrawlRequest({ url: urlInput });
    if (!success) {
      setError("Failed to add URL. Please try again later.");
      return;
    }
    if (response instanceof Error) {
      setError("Failed to add URL. Please try again later.");
      return;
    }

    if (response.error) {
      setError(response.error.message || "An error occurred while adding the URL, try again later or try a different URL.");
      return;
    }

    if (!response.data.ID) {
      setError("Invalid response from server. No ID found.");
      return;
    }
    navigate({ to: `/results/${response.data.ID}` });
  }

  return (

    <div className={"flex flex-col gap-4 w-full" + (className ? ` ${className}` : '')}>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => {
        e.preventDefault()
        onAddUrlClick()
      }}>
        <TextField
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='flex-1'
          placeholder='http://example.com/foo/bar/index.html'
        />
        <Button
          type='submit'
          className='px-6 py-2'
          variant='contained'
          disabled={!url.trim() || isLoading}
          loading={isLoading}
        >
          {isLoading ? "Adding..." : "Add URL"}
        </Button>
      </form>

      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

export default CrawlForm;
