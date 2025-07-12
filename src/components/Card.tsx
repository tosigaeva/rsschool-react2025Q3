import React from 'react';

interface Props {
  name: string;
  birth_year: string;
  gender: string;
}

class Card extends React.Component<Props> {
  render() {
    const { name, birth_year, gender } = this.props;

    return (
      <>
        <h3>{name}</h3>
        <p>
          <span>Year of birth: </span>
          <span>{birth_year}</span>
        </p>
        <p>
          <span>Gender: </span>
          <span>{gender}</span>
        </p>
      </>
    );
  }
}

export default Card;
