import React from 'react';
import TopSection from './components/TopSection';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

interface State {
  results: Person[];
}

class App extends React.Component<Record<string, never>, State> {
  state = {
    results: [],
  };

  handleSearch = async (searchTerm: string) => {
    const url = searchTerm
      ? `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(searchTerm)}`
      : 'https://swapi.py4e.com/api/people/';

    try {
      const response = await fetch(url);
      const data = await response.json();
      const results: Person[] = data.results;

      this.setState({ results }, () => console.log(this.state.results));

      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return <TopSection onSearch={this.handleSearch} />;
  }
}

export default App;
