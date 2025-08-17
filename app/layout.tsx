// import type { Metadata } from 'next';

import { locales } from '#/i18n';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '#/app/global.css';
import { Raleway } from 'next/font/google';

const releway = Raleway({ subsets: ['latin', 'cyrillic'] });

// export const metadata: Metadata = {
//   title: 'Rick and Morty Character Search',
//   description: 'Search and explore characters from the Rick and Morty universe',
// };
//
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={releway.className} inmaintabuse="1">
        <NextIntlClientProvider messages={messages}>
          <div id="root">qwe{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
