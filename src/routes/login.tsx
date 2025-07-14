import { createFileRoute } from '@tanstack/react-router';
import Login from '../parts/pages/login';

export const Route = createFileRoute('/login')({
  component: Login,
});
