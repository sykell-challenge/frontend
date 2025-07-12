import { Link, Typography } from '@mui/material'
import Login from '../components/Login'

const LoginTemplate = () => {
    return (
        <div className="px-16 pt-4 pb-8 flex flex-col items-center justify-center gap-4">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Sign in
            </Typography>

            <Login />

            <Link
                href="/register"
                component="a"
                variant='body2'
                sx={{ alignSelf: 'center' }}
            >
                Create an account instead
            </Link>
        </div>
    )
}

export default LoginTemplate