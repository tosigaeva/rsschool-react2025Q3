import { useState } from 'react';
import { SearchPanelSection } from '#/pages/search/components/search-panel';
import ThrowErrorButton from '#/shared/ui/ThrowErrorButton';
import { SearchResultSection } from '#/pages/search/components/search-result';
import { Outlet, useOutlet, useSearchParams } from 'react-router';
import useSearchTermStorage from '#/shared/hooks/useSearchTermStorage.ts';
import {
  useCharactersQuery,
  useInvalidateCharacters,
} from '#/shared/api/useQueries.ts';
import { RefreshButton } from '#/shared/ui/RefreshButton.tsx';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useSearchTermStorage('searchTerm');

  const [shouldThrow, setShouldThrowError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  const { data, isLoading, error, isFetched } = useCharactersQuery(
    searchTerm,
    currentPage
  );

  const invalidate = useInvalidateCharacters();

  if (error) {
    console.error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }

  if (shouldThrow) {
    throw new Error('Simulated render error');
  }

  const outlet = useOutlet();
  const isDetailsOpen = !!outlet;

  const onSelectCharacter = () => {};
  return (
    <div className="relative mx-auto my-0 max-w-[1200px] p-5">
      <SearchPanelSection onSearch={setSearchTerm} />
      <RefreshButton onClick={() => invalidate()} />
      <ThrowErrorButton onClick={() => setShouldThrowError(true)} />
      <div
        className={`main-content ${isDetailsOpen ? 'main-content_with-details' : ''}`}
      >
        <SearchResultSection
          results={data?.results || []}
          error={error}
          hasBeenSearched={isFetched}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
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
