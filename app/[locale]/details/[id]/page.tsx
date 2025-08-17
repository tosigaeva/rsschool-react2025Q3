import { CardDetails } from '#/components/card-details';
import { SearchPanelSection } from '#/components/search-panel';
import { SearchResultSection } from '#/components/search-result';
import { fetchCharacterDetails, fetchCharacters } from '#/lib/api/useQueries';

export default async function DetailsPageRoute(props: {
  params: { locale: string; id: string };
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { results, totalPages } = await fetchCharacters(query, currentPage);
  const character = await fetchCharacterDetails(props.params.id);
  return (
    <>
      <div className="relative mx-auto my-0 max-w-7xl p-5">
        <SearchPanelSection />
        <div className={`main-content main-content_with-details`}>
          <SearchResultSection results={results} totalPages={totalPages} />
          <CardDetails details={character} />
        </div>
      </div>
    </>
  );
}
