import Button from '@mui/material/Button'

import useLogin from '../../hooks/apis/useLogin';
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

const Login = () => {
    const { login } = useLogin();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState<string | null>(null);

    const navigate = useNavigate();

    return (<>
        {error && <Alert severity="error">{error}</Alert>}
        <form className="p-4 flex flex-col gap-4" onSubmit={async (e) => {
            e.preventDefault();

            const [success, data] = await login(username, password);
            if (success) {
                localStorage.setItem('token', data.token);
                navigate({ to: '/' });
            } else {
                console.error('Login failed:', data);
                setError(data?.response?.data?.error || 'Login failed');
            }
        }}>
            <TextField
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField

                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                className=' w-full py-2 mt-4 '
                type="submit"
            >Login</Button>
        </form>
    </>
    )
}

export default Login