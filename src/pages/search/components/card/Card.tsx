import '#/App.css';
import type { CardProps } from '#/types';
import { Link } from 'react-router';

export function Card({ character, onClick }: CardProps) {
  const id = character.url.split('/').filter(Boolean).pop();

  return (
    <Link
      to={{ pathname: `details/${id}`, search: `${window.location.search}` }}
      className={'no-text-decoration'}
    >
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
    </Link>
  );
}
