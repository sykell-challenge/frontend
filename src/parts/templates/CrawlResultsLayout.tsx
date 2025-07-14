import React from 'react';
import Title from '../components/Title';
import LinksTable from './LinksTable';
import TagsBarChart from './TagsBarChart';
import URLPieChart from './URLPieChart';
import WebsiteInformation from './WebsiteInformation';
import type { CrawlResponse } from '../../types/apis/crawl';
import { Alert, Card, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from '@tanstack/react-router';
interface CrawlResultsLayoutProps {
  data: CrawlResponse;
  url: string;
  isInProgress?: boolean;
  className?: string;
}

const CrawlResultsLayout: React.FC<CrawlResultsLayoutProps> = ({
  data,
  url,
  isInProgress = false,
  className
}) => {

  const navigate = useNavigate();

  return (
    <Paper className={`w-full h-full flex flex-col items-start justify-start ${className}`}>
      {isInProgress && (
        <Alert severity="info" className="w-full flex justify-center items-center">
          This crawl is still in progress. The data shown below is partial and will be updated when the crawl completes.
        </Alert>
      )}

      <div className="flex justify-center items-center my-6 flex-col sm:flex-row w-full relative">
        <div className="absolute left-4">
          <IconButton
            onClick={() => navigate({ to: "/results" })}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <Title title="Crawl Results" className="mx-auto" />
      </div>


      <div className="flex flex-wrap gap-4 w-full h-full">
        <WebsiteInformation
          className="w-full md:max-h-32"
          title={data.title}
          loginPageAvailable={data.loginFormPresent}
          url={url}
          htmlVersion={data.htmlVersion}
        />

        <div className="flex flex-col w-full gap-4 md:flex-row lg:w-1/3 lg:flex-col">
          <div className="w-full h-44 md:h-56 lg:h-60">
            {data.tags &&
              <TagsBarChart
                tags={data?.tags || []}
              />
            }
          </div>

          <div className="w-full h-28 md:h-36 lg:h-40">
            {data.links && data.links.length &&
              <URLPieChart
                internalUrlCount={data.links.filter(link => link.type === 'internal').length}
                externalUrlCount={data.links.filter(link => link.type === 'external').length}
                brokenUrlCount={data.links.filter(link => link.type === 'inaccessible').length}
              />
            }
          </div>
        </div>

        <div className="w-full lg:flex-1 lg:w-7/12 min-h-[400px]">
          {
            data.links && data.links.length && <LinksTable
              links={data.links.map((link) => ({
                link: link.link,
                type: link.type,
                statusCode: link.statusCode.toString()
              })) || []}
            />
          }
        </div>

      </div>
    </Paper>

  );
};

export default CrawlResultsLayout;
