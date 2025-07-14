import useApiRequest from './useAuthRequest';

const useLogin = () => {
  const { makeRequest } = useApiRequest({
    endpoint: '/users/login',
    method: 'POST',
  });

  async function login(username: string, password: string) {
    return makeRequest({ username, password });
  }

  return { login };
};

export default useLogin;
