
import useAxios from 'axios-hooks'


const useLogin = () => {
    const [{ }, execute] = useAxios(
        {
            url: "http://localhost:8080/users/login",
            method: "POST",
        },
        { manual: true }
    );

    async function login(username: string, password: string) {
        try {
            const response = await execute({ data: { username, password } });            

            return [true, response.data];
        } catch (error) {
            return [false, error];
        }
    }

    return { login };
}

export default useLogin