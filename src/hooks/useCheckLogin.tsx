import { useLocation, useNavigate } from '@tanstack/react-router';

const useCheckLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let token = localStorage.getItem('token');

  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const expirationTime = decodedToken ? decodedToken.exp * 1000 : 0;

  if (expirationTime && expirationTime < Date.now()) {
    localStorage.removeItem('token');
    token = null;
  }

  if (!token && location.pathname === '/register') {
    return false;
  }

  if (!token) {
    navigate({ to: '/login' });
    return false;
  }

  return true;
};

export default useCheckLogin;
