import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import useCrawlStore from '../../stores/crawl'

interface InputAreaProps {
  onCrawl?: () => void;
  loading?: boolean;
}

const InputArea = ({ onCrawl, loading = false }: InputAreaProps) => {
    const url = useCrawlStore((state) => state.url);
    const setUrl = useCrawlStore((state) => state.setUrl);

    return (
        <div className=" p-16 flex flex-col items-center justify-center gap-6 w-[60vw]">
            <InputText 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              className='w-11/12' 
              placeholder='http://example.com/foo/bar/index.html'
              disabled={loading}
            />
            <Button
                label={loading ? "CRAWLING..." : "GO"}
                className='w-48 py-2'
                onClick={onCrawl}
                disabled={loading || !url}
                loading={loading}
            />
        </div>
    )
}

export default InputArea    