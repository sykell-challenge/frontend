import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import useLogin from '../../hooks/apis/useLogin';
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
                navigate({ to: '/' });
            } else {
                console.error('Login failed:', data);
                setError(data?.response?.data?.error || 'Login failed');
            }
        }}>
            <InputText

                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputText

                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                label="Login"
                className=' w-full py-2 mt-4 '
                type="submit"
            />
        </form>
    </>
    )
}

export default Login