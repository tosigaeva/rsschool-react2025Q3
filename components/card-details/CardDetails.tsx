import type { CardDetailsProps } from '#/types';

export function CardDetails({ details, onClick }: CardDetailsProps) {
  const entries = Object.entries(details);

  return (
    <div className="card-details">
      <div className="break-all text-start">
        <button
          data-testid="button-close-card-details"
          className="absolute right-2.5 top-2.5 w-10 bg-transparent px-0 py-1.5 text-xl font-thin"
          onClick={onClick}
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
