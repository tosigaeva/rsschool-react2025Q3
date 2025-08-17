import { fetchCharacters } from '#/lib/api/useQueries';
import { SearchPanelSection } from 'components/search-panel';
import { SearchResultSection } from 'components/search-result';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const validLocales = ['en', 'ru'];

export default async function HomePage(props: {
  params: { locale: string };
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const locale = props.params.locale;
  if (!validLocales.includes(locale)) {
    notFound();
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { results, totalPages } = await fetchCharacters(query, currentPage);

  return (
    <div className="relative mx-auto my-0 max-w-7xl p-5">
      <SearchPanelSection />
      <div className={`main-content`}>
        <SearchResultSection results={results} totalPages={totalPages} />
      </div>
    </div>
  );
}
