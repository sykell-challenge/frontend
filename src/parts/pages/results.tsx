import { Card } from "@mui/material";
import CrawlJobsSection from "../templates/CrawlJobsSection";

const Results = () => {

  return (
    <div className="w-full h-full py-16 px-4 sm:p-16">
      <h1 className="text-4xl uppercase mb-4">Crawl Results</h1>
      <Card className="w-full hidden sm:flex p-16">
        <CrawlJobsSection />
      </Card>

      <CrawlJobsSection className="w-full sm:hidden mt-8" />
    </div>
  );
};

export default Results;
