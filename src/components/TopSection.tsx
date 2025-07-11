import React from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  inputValue: string;
}

class TopSection extends React.Component<Props, State> {
  state = {
    inputValue: '',
  };

  componentDidMount() {
    const stored = localStorage.getItem('searchTerm');
    if (stored) this.setState({ inputValue: stored });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearchClick = () => {
    const trim = this.state.inputValue.trim();
    console.log(this.state.inputValue);
    console.log(trim);
    this.props.onSearch(trim);
  };

  render() {
    return (
      <>
        <SearchInput
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <SearchButton onClick={this.handleSearchClick} />
      </>
    );
  }
}

export default TopSection;
