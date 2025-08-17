import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import "#/app/global.css";
import { Raleway } from "next/font/google";

const releway = Raleway({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Star Wars Character Finder",
  description: "Search and explore characters from the Star Wars universe",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html>
      <body className={releway.className}>
        <NextIntlClientProvider>
          <div id="root">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
