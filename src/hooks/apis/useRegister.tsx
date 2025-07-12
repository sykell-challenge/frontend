import useApiRequest from './useAuthRequest'

const useRegister = () => {
    const { makeRequest } = useApiRequest({
        endpoint: "/users",
        method: "POST",
    });

    async function register(username: string, password: string, email?: string) {
        return makeRequest({ username, password, email });
    }

    return { register };
}

export default useRegister
