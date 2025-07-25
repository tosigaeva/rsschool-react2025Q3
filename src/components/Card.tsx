import '../App.css';
import type { CardProps } from '../types';

function Card({ name, birth_year, gender }: CardProps) {
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

export default Card;
