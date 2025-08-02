import '#/App.css';
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
  onSelectCharacter,
}: SearchResultSectionProps) {
  if (error)
    return (
      <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
    );

  if (isLoading) return <p>Loading...</p>;

  if (hasBeenSearched && !results.length)
    return <p className="no-results">No results found.</p>;

  return (
    <div className="flex w-[700px] flex-col justify-center gap-y-8">
      <div className="flex flex-wrap justify-center gap-6">
        {results.map((item, index) => (
          <Card
            key={index}
            character={item}
            onClick={() => onSelectCharacter(item)}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onClick={onPageChange}
      />
    </div>
  );
}
