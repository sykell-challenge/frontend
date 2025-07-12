import React from 'react';
import useCrawlStore from '../stores/crawl';

export const useUrlValidation = () => {
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const jobs = useCrawlStore((state) => state.jobs);

  const validateUrl = (url: string): string | null => {
    if (!url.trim()) {
      return "Please enter a valid URL";
    }

    if (jobs.some(job => job.url === url.trim())) {
      return "This URL is already in the crawl queue";
    }

    return null;
  };

  const clearValidationError = () => {
    setValidationError(null);
  };

  return {
    validationError,
    setValidationError,
    validateUrl,
    clearValidationError,
  };
};
