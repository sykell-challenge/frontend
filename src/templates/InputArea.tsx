import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const InputArea = () => {
    return (
        <div className="border-border border-[16px] p-16 flex flex-col items-center justify-center gap-6 w-[60vw]">

            <InputText className='bg-border text-text p-2 w-11/12' placeholder='http://example.com/foo/bar/index.html' />
            <Button
                label="GO"
                className='bg-border text-text w-48 py-2 hover:text-text-dark'
                onClick={() => window.location.href = '/details'}
            />
        </div>
    )
}

export default InputArea    