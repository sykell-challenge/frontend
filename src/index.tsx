import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import './static/index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <PrimeReactProvider >
        <App />
      </PrimeReactProvider>
    </React.StrictMode>,
  );
}
