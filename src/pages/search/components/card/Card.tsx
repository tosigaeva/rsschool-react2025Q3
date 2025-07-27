import '#/App.css';
import type { CardProps } from '#/types';

export function Card({ character, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{character.name}</h3>
      <p>
        <span className="label">Year of birth: </span>
        <span className="value">{character.birth_year}</span>
      </p>
      <p>
        <span className="label">Gender: </span>
        <span className="value">{character.gender}</span>
      </p>
    </div>
  );
}
