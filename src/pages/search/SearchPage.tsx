import { useEffect, useState } from 'react';
import { SearchPanelSection } from '#/pages/search/components/search-panel';
import ThrowErrorButton from '#/shared/ui/ThrowErrorButton';
import { SearchResultSection } from '#/pages/search/components/search-result';
import { Outlet, useOutlet, useSearchParams } from 'react-router';
import useSearchTermStorage from '#/shared/hooks/useSearchTermStorage.ts';
import { useFetchAll } from '#/shared/api/useClient.ts';

export function SearchPage() {
  const [searchTerm] = useSearchTermStorage('searchTerm');
  const { loadData, isLoading, results, totalPages, hasBeenSearched, error } =
    useFetchAll();

  const [shouldThrow, setShouldThrowError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    loadData(searchTerm, currentPage).then(() => {});
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
    <div className={'app'}>
      <SearchPanelSection onSearch={loadData} />
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
