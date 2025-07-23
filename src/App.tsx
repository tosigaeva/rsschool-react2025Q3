import TopSection from './components/TopSection';
import BottomSection from './components/BottomSection';
import ThrowErrorButton from './components/ThrowErrorButton';
import './App.css';
import { useEffect, useState } from 'react';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

function App() {
  const [results, setResults] = useState<Person[]>([]);
  const [hasSearch, setHasSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrow, setShouldThrowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';

    setIsLoading(true);

    (async () => {
      try {
        const results = await fetchCharacters(savedSearchTerm);

        setResults(results);
        setHasSearch(!!savedSearchTerm);
        setIsLoading(false);
      } catch (error) {
        handleError(error);
      }
    })();
  }, []);

  const fetchCharacters = async (searchTerm: string): Promise<Person[]> => {
    const url = searchTerm
      ? `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(searchTerm)}`
      : 'https://swapi.py4e.com/api/people/';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.results;
  };

  const handleError = (error: unknown): void => {
    console.error(error);

    setIsLoading(false);

    const textError =
      error instanceof Error ? error.message : 'Unknown error occurred';
    setErrorMessage(textError);
  };

  const handleSearch = async (searchTerm: string) => {
    setResults([]);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const results = await fetchCharacters(searchTerm);

      setResults(results);
      setHasSearch(true);
      setIsLoading(false);

      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      handleError(error);
    }
  };

  const handleThrow = () => {
    setShouldThrowError(true);
  };

  if (shouldThrow) {
    throw new Error('Simulated render error');
  }

  return (
    <>
      <h1>Star Wars Character Finder</h1>
      <TopSection onSearch={handleSearch} />
      <ThrowErrorButton onClick={handleThrow} />
      <BottomSection
        results={results}
        hasSearch={hasSearch}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default App;
