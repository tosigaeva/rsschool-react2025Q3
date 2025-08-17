'use client';

import type { CardProps } from '#/types';

import { useNavigation } from '#/hooks/useNavigation';
import { useSelectionStore } from '#/lib/store/useSelectionStore';
import Link from 'next/link';

export function Card({ id, character }: CardProps) {
  const selected = useSelectionStore((state) => state.selected);
  const toggleSelection = useSelectionStore((state) => state.toggleSelection);

  const { generateDetailsLink } = useNavigation();

  return (
    <div className="card">
      <Link href={generateDetailsLink(id)} className="no-underline">
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
