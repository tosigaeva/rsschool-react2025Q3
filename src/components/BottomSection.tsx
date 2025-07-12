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
}

class BottomSection extends React.Component<Props> {
  render() {
    const { results, hasSearch } = this.props;

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
