'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from '#/components/error-boundary';
import { Flyout } from '#/components/flyout';
import { Header } from '#/components/header/Header';
import { ThemeProvider } from '#/components/theme/provider';
import { queryClient } from '#/lib/api/queryClient';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
          asd
          <main>{children}</main>
          <Flyout />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
