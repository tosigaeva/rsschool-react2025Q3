import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars Character Finder',
  description:
    'Search and explore detailed information about Star Wars characters using the SWAPI (Star Wars API). Built with Next.js for a fast and responsive experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
