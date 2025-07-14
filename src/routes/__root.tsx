import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Topbar from '../parts/components/Topbar';

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Topbar />
        <Outlet />
        {import.meta.env.NODE_ENV === 'development' && (
          <TanStackRouterDevtools />
        )}
      </>
    );
  },
  errorComponent: () => {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl">An error occurred</h1>
      </div>
    );
  },
});
