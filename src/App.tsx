import React from 'react';
import TopSection from './components/TopSection';

class App extends React.Component {
  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
  };

  render() {
    return <TopSection onSearch={this.handleSearch} />;
  }
}

export default App;
