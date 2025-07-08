import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const Register = () => {
    return (
        <div className="border-border border-[16px] px-16 pt-4 pb-8 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl">Register</h2>

            <InputText className='bg-border text-text p-2' placeholder='abc@example.com' />
            <InputText className='bg-border text-text p-2' placeholder='Username' />
            <InputText className='bg-border text-text p-2' placeholder='Password' type='password' />
            <Button label="Register" className='bg-border text-text w-48 py-2 mt-4 hover:text-text-dark' />
            <a href="/login" className='p-button p-button-link w-full py-2 mt-2 hover:text-text-dark' >Already have an account? Login</a>
        </div>
    )
}

export default Register