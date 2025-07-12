import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { useUrlInputHandlers } from '../../hooks/useUrlInputHandlers';

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
          <InputText
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // onKeyPress={handleKeyPress}
            className='flex-1'
            placeholder='http://example.com/foo/bar/index.html'
          />
          <Button
            label={isLoading ? "Adding..." : "Add URL"}
            type='submit'
            className='px-6 py-2'
            onClick={handleAddUrl}
            disabled={!url.trim() || isLoading}
            loading={isLoading}
          />
        </form>

        {error && <Message severity="error" text="Please enter a valid url!" />}
      </div>
    </Card>
  );
};

export default URLInputForm;
