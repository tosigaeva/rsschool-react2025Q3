import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { ErrorBoundary } from '#/features/error-boundary';
import { ThemeProvider } from '#/shared/state/theme/provider';
import App from './App';

const rootElement = document.getElementById('root');

const errMessage = 'Root element not found';

if (!rootElement) {
  throw new Error(errMessage);
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
