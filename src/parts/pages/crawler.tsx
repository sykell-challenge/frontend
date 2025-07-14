import CrawlForm from "../components/CrawlForm";
import CrawlJobsSection from "../templates/CrawlJobsSection";
import CrawlResultsSection from "../templates/CrawlResultsSection";
import Title from "../components/Title";
import Card from "@mui/material/Card";

const Crawler = () => {

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen py-16 sm:p-16">
      <h1 className="mt-16 mb-8 sm:mt-32 text-4xl font-bold my-4">Web Crawler</h1>
      <Card className="w-full px-4 py-16 sm:p-16">
        <CrawlForm />
      </Card>
    </div>
  );
};

export default Crawler;
