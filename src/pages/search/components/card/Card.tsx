import '#/App.css';
import type { CardProps } from '#/types';
import { Link } from 'react-router';
import { useSelectionStore } from '#/shared/store/useSelectionStore';

export function Card({ character, onClick }: CardProps) {
  const id = character.url.split('/').filter(Boolean).pop();
  const selected = useSelectionStore((state) => state.selected);
  const toggleSelection = useSelectionStore((state) => state.toggleSelection);

  return (
    <div className="card">
      <Link
        to={{ pathname: `details/${id}`, search: `${window.location.search}` }}
        className={'no-text-decoration'}
        onClick={onClick}
      >
        <h3>{character.name}</h3>
        <p>
          <span className="label">Year of birth: </span>
          <span className="value">{character.birth_year}</span>
        </p>
        <p>
          <span className="label">Gender: </span>
          <span className="value">{character.gender}</span>
        </p>
      </Link>
      <label className="checkbox">
        <input
          type={'checkbox'}
          checked={selected.some((item) => item.url === character.url)}
          onChange={() => toggleSelection(character)}
        ></input>
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
