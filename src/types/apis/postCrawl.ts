import { type URL } from '../urls';

export type Response = {
  alreadyCrawled: boolean;
  data: URL;
  error: {
    code: number;
    message: string;
  };
};
