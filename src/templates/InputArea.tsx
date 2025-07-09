import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import useCrawlStore from '../stores/crawl'

import { useNavigate } from '@tanstack/react-router'

const InputArea = () => {
    const url = useCrawlStore((state) => state.url);
    const setUrl = useCrawlStore((state) => state.setUrl);

    const navigate = useNavigate();

    return (
        <div className="border-border border-[16px] p-16 flex flex-col items-center justify-center gap-6 w-[60vw]">

            <InputText value={url} onChange={(e) => setUrl(e.target.value)} className='!bg-border !text-text w-11/12' placeholder='http://example.com/foo/bar/index.html' />
            <Button
                label="GO"
                className='!bg-border !text-text w-48 py-2 hover:!text-text-dark !border-none'

                onClick={() => {
                    navigate({ to: '/details' });
                }}
            />
        </div>
    )
}

export default InputArea    