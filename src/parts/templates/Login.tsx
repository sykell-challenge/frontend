import Login from '../components/Login'

const LoginTemplate = () => {    
    return (
        <div className=" px-16 pt-4 pb-8 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl">Login</h2>

            <Login />
            <a href="/register" className='p-button p-button-link w-full py-2 mt-2' >Create an account instead</a>
        </div>
    )
}

export default LoginTemplate