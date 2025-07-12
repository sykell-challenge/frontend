import Title from "../components/Title";
import CrawlJobsSection from "../templates/CrawlJobsSection";
import URLTable from "../templates/URLTable";
import WebsitesTable from "../templates/WebsitesTable";
import { ScrollPanel } from '@mui/material/scrollpanel';

const Results = () => {

  return (
    <div className="w-full flex flex-col items-start justify-center gap-8">
     <CrawlJobsSection />
    </div>
  );
};

export default Results;
