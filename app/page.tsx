import SearchPanel from '@/ui/search-panel';
import SearchResult from '@/ui/search-result';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const isDetailsOpen = false;

  return (
    <main className="relative mx-auto my-0 flex max-w-7xl flex-col items-center p-5">
      <SearchPanel />
      <div
        className={`main-content ${isDetailsOpen ? 'main-content_with-details' : ''}`}
      >
        <SearchResult query={query} currentPage={currentPage}></SearchResult>
      </div>
    </main>
  );
}
