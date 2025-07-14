import { createFileRoute } from '@tanstack/react-router';
import Register from '../parts/pages/register';

export const Route = createFileRoute('/register')({
  component: Register,
});
