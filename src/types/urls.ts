import { Link } from "./links";
import { Tag } from "./tags";

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
