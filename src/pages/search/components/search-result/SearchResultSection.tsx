import { Card } from '#/pages/search/components/card';
import type { SearchResultSectionProps } from '#/types';
import { Pagination } from '#/pages/search/components/pagination';

export function SearchResultSection({
  results,
  hasBeenSearched,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: SearchResultSectionProps) {
  if (error)
    return (
      <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
    );

  if (isLoading) return <p>Loading...</p>;

  if (hasBeenSearched && !results.length)
    return <p className="mt-10">No results found.</p>;

  return (
    <div
      data-testid="search-results"
      className="flex w-3xl flex-col justify-center gap-y-8"
    >
      <div className="flex flex-wrap justify-center gap-6">
        {results.map((item) => {
          const id = item.url.split('/').filter(Boolean).pop() ?? '1';

          return <Card key={id} id={id} character={item} />;
        })}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onClick={onPageChange}
      />
    </div>
  );
}
