export type Link = {
    link: string;
    type: "internal" | "external" | "broken";
    status: "queued" | "processing" | "completed" | "failed";
};
