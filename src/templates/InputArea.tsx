import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const InputArea = () => {
    return (
        <div className="border-border border-[16px] p-16 flex flex-col items-center justify-center gap-6 w-[60vw]">

            <InputText className='!bg-border !text-text w-11/12' placeholder='http://example.com/foo/bar/index.html' />
            <Button
                label="GO"
                className='!bg-border !text-text w-48 py-2 hover:!text-text-dark !border-none'
                
                onClick={() => window.location.href = '/details'}
            />
        </div>
    )
}

export default InputArea    