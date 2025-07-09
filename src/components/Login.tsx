import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import useLogin from '../hooks/useLogin';
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Message } from 'primereact/message';

const Login = () => {
    const { login } = useLogin();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState<string | null>(null);

    const navigate = useNavigate();

    return (<>
        {error && <Message severity="error" text={error} />}
        <form className="p-4 flex flex-col gap-4" onSubmit={async (e) => {
            e.preventDefault();

            const [success, data] = await login(username, password);
            if (success) {
            localStorage.setItem('token', data.token);
            navigate({ to: '/urlinput' });
            } else {
            console.error('Login failed:', data);
            setError(data?.response?.data?.error || 'Login failed');
            }
        }}>
            <InputText
            className='!bg-border !text-text p-2 placeholder:!text-text/80'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <InputText
            className='!bg-border !text-text p-2 placeholder:!text-text/80'
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button
            label="Login"
            className='!bg-border !text-text w-full py-2 mt-4 hover:!text-text-dark !border-none'
            type="submit"
            />
        </form>
    </>
    )
}

export default Login