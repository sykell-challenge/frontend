import Title from "../components/Title";
import LinksTable from "../templates/LinksTable";
import TagsBarChart from "../templates/TagsBarChart";
import URLPieChart from "../templates/URLPieChart";
import WebsiteInformation from "../templates/WebsiteInformation";
import useCrawlStore from "../stores/crawl";
import useCrawl from '../hooks/apis/useCrawl'
import React from "react";
import { useNavigate } from "@tanstack/react-router";

const Details = () => {
  const url = useCrawlStore((state) => state.url);
  const crawlData = useCrawlStore((state) => state.crawlData);
  const setCrawlData = useCrawlStore((state) => state.setCrawlData);

  const [error, setError] = React.useState<any | null>(null);

  const { crawl } = useCrawl();

  const navigate = useNavigate();

  React.useEffect(() => {
    setCrawlData(null);
    if (!url) {
      return;
    }

    crawl(url).then(([success, data]: any) => {
      if (success) {
        setCrawlData(data);
      } else {
        console.log(data)
        let error
        if(data.name==="AxiosError") {
          error= {
            message: data.response.data.error,
            code: data.response.data.statusCode
          }
        }
        setError(error);
      }
    });
  }, []);

  if (!url) {
    navigate({ to: '/urlinput' });
    return null;
  }

  if (!crawlData && !error) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-screen text-text">
        {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  let links = []

  if (crawlData.internalLinks) {
    links.push(...crawlData.internalLinks.map(link => ({
      link,
      type: "internal",
      status: "completed"
    })))
  }

  if (crawlData.externalLinks) {
    links.push(...crawlData.externalLinks.map(link => ({
      link,
      type: "external",
      status: "completed"
    })))
  }

  if (crawlData.brokenLinks) {
    links.push(...crawlData.brokenLinks.map(link => ({
      link,
      type: "broken",
      status: "completed"
    })))
  }

  const colors = ['#358C84', '#205B73', '#307B8C'];

  return (
    <div className="w-full flex flex-col gap-8 items-start justify-center pl-[15vw]">
      <Title title="Details" />

      <div className="flex flex-col gap-8">
        <WebsiteInformation
          title={crawlData.title}
          loginPageAvailable={true}
          url={url}
          htmlVersion="HTML5"
        />
        <div className="flex gap-32">
          <div className="flex flex-col gap-8">
            <URLPieChart
              internalUrlCount={crawlData.stats.numberOfInternalLinks}
              externalUrlCount={crawlData.stats.numberOfExternalLinks}
              brokenUrlCount={crawlData.stats.numberOfBrokenLinks}
            />
            <TagsBarChart
              tags={crawlData?.tags?.map(tag => ({
                name: tag.tagName,
                count: tag.count,
                color: colors[crawlData.tags.indexOf(tag) % colors.length]
              }))}
            />
          </div>
          <LinksTable
            links={
              links
            }
          />
        </div>

      </div>
    </div>
  );
};

export default Details;
