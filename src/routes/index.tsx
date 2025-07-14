import { createFileRoute } from '@tanstack/react-router';
import Crawler from '../parts/pages/crawler';

export const Route = createFileRoute('/')({
  component: Crawler,
});
