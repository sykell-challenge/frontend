import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { PrimeReactProvider } from 'primereact/api';
import { SocketProvider } from './contexts/SocketContext';

import './index.css';


const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <SocketProvider url="http://localhost:8080">
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </SocketProvider>
    </React.StrictMode>,
  );
}
