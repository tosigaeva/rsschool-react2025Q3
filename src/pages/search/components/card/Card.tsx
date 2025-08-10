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
        className="no-underline"
        onClick={onClick}
      >
        <h3>{character.name}</h3>
        <p className="mx-0 my-2 flex justify-start gap-x-2.5 text-lg">
          <span className="text-text-label">Year of birth: </span>
          <span>{character.birth_year}</span>
        </p>
        <p className="mx-0 my-2 flex justify-start gap-x-2.5 text-lg">
          <span className="text-text-label">Gender: </span>
          <span>{character.gender}</span>
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
