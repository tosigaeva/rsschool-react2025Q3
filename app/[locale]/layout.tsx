"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "#/components/error-boundary";
import { Flyout } from "#/components/flyout";
import { Header } from "#/components/header/Header";
import { ThemeProvider } from "#/components/theme/provider";
import { queryClient } from "#/lib/api/queryClient";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  return (
    <NextIntlClientProvider locale={locale}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Flyout />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
}
