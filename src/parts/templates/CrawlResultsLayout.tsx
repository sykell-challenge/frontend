import React from 'react';
import Title from '../components/Title';
import LinksTable from './LinksTable';
import TagsBarChart from './TagsBarChart';
import URLPieChart from './URLPieChart';
import WebsiteInformation from './WebsiteInformation';
import type { CrawlResponse } from '../../types/apis/crawl';

interface CrawlResultsLayoutProps {
  data: CrawlResponse;
  url: string;
  title: string;
  isInProgress?: boolean;
  className?: string;
}

const CrawlResultsLayout: React.FC<CrawlResultsLayoutProps> = ({
  data,
  url,
  title,
  isInProgress = false,
  className
}) => {
  const colors = ['#358C84', '#205B73', '#307B8C'];

  return (
    <div className={`w-full flex flex-col items-center justify-start ${className}`}>

      <div className="flex justify-between items-center mb-6">
        <Title title="Crawl Results" />
      </div>

      {isInProgress && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <strong>Note:</strong> This crawl is still in progress. The data shown below is partial and will be updated when the crawl completes.
        </div>
      )}

      <div className="flex flex-col gap-8">
        <WebsiteInformation
          title={data.title}
          loginPageAvailable={data.login_form}
          url={url}
          htmlVersion={data.html_version}
        />
        <div className="flex gap-32">
          <div className="flex flex-col gap-8">
            <URLPieChart
              internalUrlCount={data.links.filter(link => link.type === 'internal').length}
              externalUrlCount={data.links.filter(link => link.type === 'external').length}
              brokenUrlCount={data.links.filter(link => link.type === 'inaccessible').length}
            />
            <TagsBarChart
              tags={data?.tags?.map(tag => ({
                name: tag.tagName,
                count: tag.count,
                color: colors[data.tags.indexOf(tag) % colors.length]
              })) || []}
            />
          </div>
          <LinksTable
            links={data.links.map((link) => ({
              link: link.link,
              type: link.type,
              status: link.status_code.toString()
            })) || []}
          />
        </div>
      </div>
    </div>

  );
};

export default CrawlResultsLayout;
