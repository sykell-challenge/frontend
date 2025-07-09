import Register from '../components/Register'
import { Link } from '@tanstack/react-router'

const RegisterTemplate = () => {
    return (
        <div className="border-border border-[16px] px-16 pt-4 pb-8 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl">Register</h2>
            <Register />
            <Link to="/login" className='p-button p-button-link w-full py-2 mt-2 !text-text hover:!text-text-dark text-center'>
                Already have an account? Login
            </Link>
        </div>
    )
}

export default RegisterTemplate