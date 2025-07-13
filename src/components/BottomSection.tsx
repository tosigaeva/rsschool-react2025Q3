import React from 'react';
import Card from './Card';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

interface Props {
  results: Person[];
  hasSearch: boolean;
  isLoading: boolean;
  errorMessage: string | null;
}

class BottomSection extends React.Component<Props> {
  render() {
    const { results, hasSearch, isLoading, errorMessage } = this.props;

    if (isLoading) return <p>Loading...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;
    if (hasSearch && !results.length) return <p>No results found.</p>;

    return (
      <>
        {results.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            birth_year={item.birth_year}
            gender={item.gender}
          />
        ))}
      </>
    );
  }
}

export default BottomSection;
