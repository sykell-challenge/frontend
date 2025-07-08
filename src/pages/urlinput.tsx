import Title from "../components/Title";
import InputArea from "../templates/InputArea";

const UrlInput = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Title title="URL Input" />
      <div className="mt-24">
        <InputArea />
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <a href="/results" className='p-button p-button-link w-full py-2 mt-2 hover:text-text-dark' >Previous crawls</a>
      </div>
    </div>
  );
};

export default UrlInput;
