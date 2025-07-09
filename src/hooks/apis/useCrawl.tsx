
import useAxios from 'axios-hooks'
import type { CrawlResponse } from '../../types/apis/crawl';


const useCrawl = () => {
    const [{ }, execute] = useAxios(
        {
            url: "http://localhost:8080/crawl",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        },
        { manual: true }
    );

    async function crawl(url: string) {
        try {
            const response = await execute({ data: { url } });

            return [true, response.data as CrawlResponse];
        } catch (error) {
            return [false, error];
        }
    }

    return { crawl };
}

export default useCrawl