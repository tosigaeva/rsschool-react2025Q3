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

  handleSearch = async (searchTerm: string) => {
    this.setState({ results: [], isLoading: true, errorMessage: null });

    const url = searchTerm
      ? `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(searchTerm)}`
      : 'https://swapi.py4e.com/api/people/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const results: Person[] = data.results;

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
