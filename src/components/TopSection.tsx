import React from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

class TopSection extends React.Component {
  render() {
    return (
      <>
        <SearchInput />
        <SearchButton />
      </>
    );
  }
}

export default TopSection;
