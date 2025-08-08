import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from '#/pages/search/components/error-boundary';
import { ThemeProvider } from '#/shared/theme/provider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '#/shared/api/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
