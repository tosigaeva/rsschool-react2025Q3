import { useEffect, useState } from 'react';
import { SearchPanelSection } from '#/entities/search/search-panel';
import ThrowErrorButton from '#/shared/ui/ThrowErrorButton';
import { SearchResultSection } from '#/entities/search/search-result';
import { Outlet, useOutlet, useSearchParams } from 'react-router';
import useSearchTermStorage from '#/shared/hooks/useSearchTermStorage.ts';
import { useFetchAll } from '#/shared/api/useClient.ts';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useSearchTermStorage('searchTerm');
  const { loadData, isLoading, results, totalPages, hasBeenSearched, error } =
    useFetchAll();

  const [shouldThrow, setShouldThrowError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const handler = setTimeout(() => {
      loadData(searchTerm, currentPage).then(() => {});
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [loadData, searchTerm, currentPage]);

  useEffect(() => {
    if (error !== null) {
      console.error(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
    return () => {};
  }, [error]);

  if (shouldThrow) {
    throw new Error('Simulated render error');
  }

  const handleThrow = () => {
    setShouldThrowError(true);
  };

  const outlet = useOutlet();
  const isDetailsOpen = !!outlet;

  const onSelectCharacter = () => {};
  return (
    <div className="relative mx-auto my-0 max-w-[1200px] p-5">
      <SearchPanelSection onSearch={setSearchTerm} />
      <ThrowErrorButton onClick={handleThrow} />
      <div
        className={`main-content ${isDetailsOpen ? 'main-content_with-details' : ''}`}
      >
        <SearchResultSection
          results={results}
          error={error}
          hasBeenSearched={hasBeenSearched}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber: number) =>
            setSearchParams({ page: pageNumber.toString() })
          }
          onSelectCharacter={onSelectCharacter}
        />
        <Outlet />
      </div>
    </div>
  );
}
