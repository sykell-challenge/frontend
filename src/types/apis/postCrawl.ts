import { URL } from "../urls";

export type Request = {
    url: string;
}

export type Response = {
    alreadyCrawled: boolean;
    data: URL;
    error: {
        code: number;
        message: string;
    },
}