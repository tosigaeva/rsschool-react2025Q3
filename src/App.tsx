import TopSection from './components/TopSection';
import BottomSection from './components/BottomSection';
import ThrowErrorButton from './components/ThrowErrorButton';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router';
import NotFound from './components/not-found.tsx';
import type { ApiResponse, Character } from './types';
import CardDetails from './components/card-details.tsx';
import useSearchStorage from './hooks/useSearchStorage.ts';

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchTerm, setSearchTerm] = useSearchStorage('searchTerm');

  const [results, setResults] = useState<Character[]>([]);
  const [hasSearch, setHasSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrow, setShouldThrowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const loadData = useCallback(async (searchTerm: string, page: number) => {
    setResults([]);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { results, count } = await fetchCharacters(searchTerm, page);

      setResults(results);
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
      setHasSearch(!!searchTerm);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    loadData(searchTerm, currentPage);
  }, [loadData, searchTerm, currentPage]);

  const fetchCharacters = async (
    searchTerm: string,
    page: number
  ): Promise<ApiResponse> => {
    const url = searchTerm
      ? `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(searchTerm)}&page=${page}`
      : `https://swapi.py4e.com/api/people/?page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return { results: data.results, count: data.count };
  };

  const handleError = (error: unknown): void => {
    console.error(error);

    setIsLoading(false);

    const textError =
      error instanceof Error ? error.message : 'Unknown error occurred';
    setErrorMessage(textError);
  };

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchParams({ page: '1' });
    await loadData(searchTerm, 1);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
  };

  const handleThrow = () => {
    setShouldThrowError(true);
  };

  if (shouldThrow) {
    throw new Error('Simulated render error');
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={'app'}>
            <h1>Star Wars Character Finder</h1>
            <TopSection onSearch={handleSearch} />
            <ThrowErrorButton onClick={handleThrow} />
            <div
              className={`main-content ${selectedCharacter ? 'main-content_with-details' : ''}`}
            >
              <BottomSection
                results={results}
                hasSearch={hasSearch}
                isLoading={isLoading}
                errorMessage={errorMessage}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onSelectCharacter={handleSelectCharacter}
              />
              {selectedCharacter && (
                <CardDetails
                  details={selectedCharacter}
                  onClick={handleCloseDetails}
                />
              )}
            </div>
          </div>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
