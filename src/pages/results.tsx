import Title from "../components/Title";
import URLTable from "../templates/URLTable";
import WebsitesTable from "../templates/WebsitesTable";
import { ScrollPanel } from 'primereact/scrollpanel';

const Results = () => {

  return (
    <div className="w-full flex flex-col items-start justify-center px-[15vw] gap-8">
      <Title title="Results Dashboard" />
      <ScrollPanel className="w-full h-[80vh] p-0">
        <div className="flex gap-4 h-max w-max">
          <WebsitesTable
            websites={[
              {
                title: "Example Website",
                html: "<html>...</html>",
                internalUrlCount: 10,
                externalUrlCount: 5,
                brokenUrlCount: 2,
                loginFormPresent: true,
                tags: [
                  { name: "h1", count: 3, color: "#FF6384" },
                  { name: "h2", count: 2, color: "#36A2EB" },
                  { name: "h3", count: 1, color: "#FF9F40" },
                  { name: "p", count: 5, color: "#FFCE56" },
                  { name: "table", count: 2, color: "#36A2EB" }
                ],
              },
              {
                title: "Another Website",
                html: "<html>...</html>",
                internalUrlCount: 8,
                externalUrlCount: 3,
                brokenUrlCount: 1,
                loginFormPresent: false,
                tags: [
                  { name: "h1", count: 4, color: "#FF6384" },
                  { name: "h2", count: 1, color: "#36A2EB" },
                ],
              },
              {
                title: "Third Website",
                html: "<html>...</html>",
                internalUrlCount: 5,
                externalUrlCount: 2,
                brokenUrlCount: 0,
                loginFormPresent: true,
                tags: [
                  { name: "h1", count: 2, color: "#FF6384" },
                  { name: "h2", count: 1, color: "#36A2EB" },
                ],
              },
              {
                title: "Fourth Website",
                html: "<html>...</html>",
                internalUrlCount: 12,
                externalUrlCount: 6,
                brokenUrlCount: 3,
                loginFormPresent: false,
                tags: [
                  { name: "h1", count: 5, color: "#FF6384" },
                  { name: "h2", count: 2, color: "#36A2EB" },
                ],
              },
            ]}
          />
          <URLTable
            urls={[
              { url: "https://example.com", status: "completed" },
              { url: "https://another-example.com", status: "processing" },
              { url: "https://third-example.com", status: "failed" },
            ]}
          />
        </div>
      </ScrollPanel>
    </div>
  );
};

export default Results;
