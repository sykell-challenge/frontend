import Button from '@mui/material/Button'
import useRegister from '../../hooks/apis/useRegister';
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Box, FormControl, FormLabel } from '@mui/material';

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
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Box
                component="form"
                className="p-4"
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2
                }}
                onSubmit={handleSubmit}
            >
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>

                    <TextField
                        id="username"
                        type="text"
                        autoComplete="username"
                        required
                        fullWidth
                        variant="outlined"
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        fullWidth
                        variant="outlined"
                        placeholder='test@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        fullWidth
                        variant="outlined"
                        placeholder='*******'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <TextField
                        id="confirmPassword"
                        className='p-2'
                        placeholder='********'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </FormControl>
                <Button
                    variant="contained"
                    className='w-full py-2 mt-4'
                    type="submit"
                >
                    Register
                </Button>
            </Box>
        </>
    );
};

export default Register;
