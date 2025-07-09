import useAxios from 'axios-hooks'

const useRegister = () => {
    const [{ }, execute] = useAxios(
        {
            url: "http://localhost:8080/users",
            method: "POST",
        },
        { manual: true }
    );

    async function register(username: string, password: string, email?: string) {
        try {
            const response = await execute({ data: { username, password, email } });            

            return [true, response.data];
        } catch (error) {
            return [false, error];
        }
    }

    return { register };
}

export default useRegister
