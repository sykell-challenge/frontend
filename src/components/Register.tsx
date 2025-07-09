import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import useRegister from '../hooks/apis/useRegister';
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Message } from 'primereact/message';

const Register = () => {
    const { register } = useRegister();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Basic validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        const [success, data] = await register(username, password, email || undefined);
        if (success) {
            setSuccess('Registration successful! You can now login.');
            // Clear form
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            // Optionally navigate to login page after a delay
            setTimeout(() => {
                navigate({ to: '/login' });
            }, 2000);
        } else {
            console.error('Registration failed:', data);
            setError(data?.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <>
            {error && <Message severity="error" text={error} />}
            {success && <Message severity="success" text={success} />}
            <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
                <InputText
                    className='!bg-border !text-text p-2 placeholder:!text-text/80'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <InputText
                    className='!bg-border !text-text p-2 placeholder:!text-text/80'
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputText
                    className='!bg-border !text-text p-2 placeholder:!text-text/80'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <InputText
                    className='!bg-border !text-text p-2 placeholder:!text-text/80'
                    placeholder='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button
                    label="Register"
                    className='!bg-border !text-text w-full py-2 mt-4 hover:!text-text-dark'
                    type="submit"
                />
            </form>
        </>
    );
};

export default Register;
