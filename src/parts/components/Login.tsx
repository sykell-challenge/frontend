import Button from '@mui/material/Button';

import useLogin from '../../hooks/apis/useLogin';
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Box, FormControl, FormLabel } from '@mui/material';

const Login = () => {
  const { login } = useLogin();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState<string | null>(null);

  const navigate = useNavigate();

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        className="p-4"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
        onSubmit={async (e) => {
          e.preventDefault();

          const [success, data] = await login(username, password);
          if (success) {
            localStorage.setItem('token', data.token);
            navigate({ to: '/' });
          } else {
            console.error('Login failed:', data);
            setError(data?.response?.data?.error || 'Login failed');
          }
        }}
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
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          className=" w-full py-2 mt-4 "
          type="submit"
          fullWidth
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
