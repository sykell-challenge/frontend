import URLInputForm from "../templates/URLInputForm";
import CrawlJobsSection from "../templates/CrawlJobsSection";
import CrawlResultsSection from "../templates/CrawlResultsSection";
import Title from "../components/Title";

const Crawler = () => {

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">

      <URLInputForm className="mb-4" />

      <CrawlJobsSection className="mb-4" />

      <CrawlResultsSection />
    </div>
  );
};

export default Crawler;
