import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const Login = () => {
    return (
        <div className="border-border border-[16px] px-16 pt-4 pb-8 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl">Login</h2>

            <InputText className='bg-border text-text p-2' placeholder='Username' />
            <InputText className='bg-border text-text p-2' placeholder='Password' type='password' />
            <Button label="Login" className='bg-border text-text w-48 py-2 mt-4 hover:text-text-dark' />
            <a href="/register" className='p-button p-button-link w-full py-2 mt-2 hover:text-text-dark' >Create an account instead</a>
        </div>
    )
}

export default Login