import React from 'react';
import Button from '@mui/material/Button';
import { useUrlInputHandlers } from '../../hooks/useUrlInputHandlers';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';

const URLInputForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { url, setUrl, handleAddUrl, error, isLoading } = useUrlInputHandlers();
  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleAddUrl();
  //   }
  // };

  return (
    <Card className={`w-full ${className}`}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Add URL to Crawl</h3>
        <form className="flex gap-4" onSubmit={(e) => {
          e.preventDefault()
          handleAddUrl()
        }}>
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // onKeyPress={handleKeyPress}
            className='flex-1'
            placeholder='http://example.com/foo/bar/index.html'
          />
          <Button
            type='submit'
            className='px-6 py-2'
            onClick={handleAddUrl}
            disabled={!url.trim() || isLoading}
            loading={isLoading}
          >
            {isLoading ? "Adding..." : "Add URL"}
          </Button>
        </form>

        {error && <Alert severity="error">Please enter a valid url!</Alert>}
      </div>
    </Card>
  );
};

export default URLInputForm;
