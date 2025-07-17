import React from 'react';
import TopSection from './components/TopSection';
import BottomSection from './components/BottomSection';
import ThrowErrorButton from './components/ThrowErrorButton';
import './App.css';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

interface State {
  results: Person[];
  hasSearch: boolean;
  isLoading: boolean;
  shouldThrow: boolean;
  errorMessage: string | null;
}

class App extends React.Component<Record<string, never>, State> {
  state = {
    results: [],
    hasSearch: false,
    isLoading: false,
    shouldThrow: false,
    errorMessage: null,
  };

  fetchCharacters = async (searchTerm: string): Promise<Person[]> => {
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

  handleSearch = async (searchTerm: string) => {
    this.setState({ results: [], isLoading: true, errorMessage: null });

    try {
      const results = await this.fetchCharacters(searchTerm);

      this.setState({ results, hasSearch: true, isLoading: false }, () =>
        console.log(this.state.results)
      );

      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      console.error(error);
      this.setState({
        isLoading: false,
        errorMessage:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ isLoading: true }, async () => {
      try {
        const results = await this.fetchCharacters(savedSearchTerm);
        this.setState({
          results,
          hasSearch: !!savedSearchTerm,
          isLoading: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({
          isLoading: false,
          errorMessage:
            error instanceof Error ? error.message : 'Unknown error occurred',
        });
      }
    });
  }

  handleThrow = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Simulated render error');
    }

    return (
      <>
        <h1>Star Wars Character Finder</h1>
        <TopSection onSearch={this.handleSearch} />
        <ThrowErrorButton onClick={this.handleThrow} />
        <BottomSection
          results={this.state.results}
          hasSearch={this.state.hasSearch}
          isLoading={this.state.isLoading}
          errorMessage={this.state.errorMessage}
        />
      </>
    );
  }
}

export default App;
