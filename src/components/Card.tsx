import React from 'react';
import '../App.css';

interface Props {
  name: string;
  birth_year: string;
  gender: string;
}

class Card extends React.Component<Props> {
  render() {
    const { name, birth_year, gender } = this.props;

    return (
      <div className="card">
        <h3>{name}</h3>
        <p>
          <span className="label">Year of birth: </span>
          <span className="value">{birth_year}</span>
        </p>
        <p>
          <span className="label">Gender: </span>
          <span className="value">{gender}</span>
        </p>
      </div>
    );
  }
}

export default Card;
