import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Topbar from '../components/Topbar'

export const Route = createRootRoute({
  component: () => {

    return <>
      <Topbar />
      <Outlet />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </>
  },
})
