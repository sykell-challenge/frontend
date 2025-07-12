import Register from '../components/Register'
import { Link, Typography } from '@mui/material'

const RegisterTemplate = () => {
    return (
        <div className="px-16 pt-4 pb-8 flex flex-col items-center justify-center gap-4">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Register
            </Typography>

            <Register />

            <Link
                href="/login"
                component="a"
                variant='body2'
                sx={{ alignSelf: 'center', marginTop: 2 }}>
                Already have an account? Login
            </Link>
        </div>
    )
}

export default RegisterTemplate