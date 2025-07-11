import React from 'react';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends React.Component<Props> {
  render() {
    return (
      <input
        type="text"
        placeholder="Search for a character..."
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default SearchInput;
