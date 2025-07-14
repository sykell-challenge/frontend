import { type Link } from "./links";
import { type Tag } from "./tags";

export type URL = {
    ID: string;
    url: string;
    title: string;
    status: string;
    statusCode: string;
    htmlVersion: string;
    loginFormPresent: boolean;
    jobId: string;
    tags: Array<Tag>;
    links: Array<Link>;
}
