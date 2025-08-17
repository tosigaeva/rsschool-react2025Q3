'use client';

import type { CardDetailsProps } from '#/types';

import { useNavigation } from '#/hooks/useNavigation';

export function CardDetails({ details }: CardDetailsProps) {
  const entries = Object.entries(details);

  const { goToSearchPage } = useNavigation();

  return (
    <div className="card-details">
      <div className="text-start break-all">
        <button
          data-testid="button-close-card-details"
          className="absolute top-2.5 right-2.5 w-10 bg-transparent px-0 py-1.5 text-xl font-thin"
          onClick={goToSearchPage}
        >
          ×
        </button>
        {entries.map(([key, value]) => (
          <p key={key}>
            <span className="text-text-label">{key}: </span>
            <span>{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
