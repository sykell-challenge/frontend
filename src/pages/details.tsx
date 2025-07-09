import Title from "../components/Title";
import LinksTable from "../templates/LinksTable";
import TagsBarChart from "../templates/TagsBarChart";
import URLPieChart from "../templates/URLPieChart";
import WebsiteInformation from "../templates/WebsiteInformation";

const Details = () => {
  return (
    <div className="w-full flex flex-col gap-8 items-start justify-center pl-[15vw]">
      <Title title="Details" />

      <div className="flex flex-col gap-8">
        <WebsiteInformation
          title="Example Website"
          loginPageAvailable={true}
          url="https://example.com"
          htmlVersion="HTML5"
        />
        <div className="flex gap-32">
          <div className="flex flex-col gap-8">
            <URLPieChart
              internalUrlCount={10}
              externalUrlCount={5}
              brokenUrlCount={2}
            />
            <TagsBarChart
              tags={[
                { name: "h1", count: 10, color: "#358C84" },
                { name: "h2", count: 20, color: "#205B73" },
                { name: "h3", count: 30, color: "#307B8C" },
              ]}
            />
          </div>
          <LinksTable
            links={[
              { link: "https://example.com", type: "internal", status: "completed" },
              { link: "https://example.com/about", type: "internal", status: "processing" },
              { link: "https://example.com/contact", type: "external", status: "failed" },
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default Details;
