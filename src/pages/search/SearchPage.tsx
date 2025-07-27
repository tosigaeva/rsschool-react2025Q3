import { useCallback, useEffect, useState } from 'react';
import { SearchPanelSection } from '#/pages/search/components/search-panel';
import ThrowErrorButton from '#/shared/ui/ThrowErrorButton';
import { SearchResultSection } from '#/pages/search/components/search-result';
import type { Character } from '#/types';
import {Outlet, useNavigate, useSearchParams} from 'react-router';
import useSearchTermStorage from '#/shared/hooks/useSearchTermStorage.ts';
import { useClient } from '#/shared/api/useClient.ts';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useSearchTermStorage('searchTerm');
  const { loadData } = useClient();

  const [shouldThrow, setShouldThrowError] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Character[]>([]);
  const [hasBeenSearched, setHasBeenSearched] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;
  const navigate = useNavigate();

  const handleApiCall = useCallback(
    async (searchTerm: string, page: number) => {
      try {
        setResults([]);
        setLoading(true);
        setError(null);
        const { results, totalPages } = await loadData(searchTerm, page);
        setResults(results);
        setTotalPages(totalPages);
        setHasBeenSearched(!!searchTerm);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    },
    [loadData]
  );

  useEffect(() => {
    try {
      handleApiCall(searchTerm, currentPage);
      setSearchTerm(searchTerm);
      setSearchParams(searchParams);
    } catch (error) {
      setError(error);
    }
  }, [
    handleApiCall,
    searchTerm,
    currentPage,
    searchParams,
    setSearchParams,
    setSearchTerm,
  ]);

  useEffect(() => {
    if (error !== null) {
      console.error(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
      setLoading(false);
    }
    return () => {};
  }, [error]);

  if (shouldThrow) {
    throw new Error('Simulated render error');
  }

  const handleThrow = () => {
    setShouldThrowError(true);
  };

  const onSelectCharacter = (character: Character) => {
    console.log(character);
    const id = character.url.split('/').filter(Boolean).pop();
    navigate({
      pathname: `/details/${id}`,
      search: window.location.search,
    });
  };

  return (
    <div className={'app'}>
      <h1>Star Wars Character Finder</h1>
      <SearchPanelSection onSearch={handleApiCall} />
      <ThrowErrorButton onClick={handleThrow} />
      <div
        className={`main-content ${true ? 'main-content_with-details' : ''}`}
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
