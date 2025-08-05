import type { CardDetailsProps } from '#/types';

export function CardDetails({ details, onClick }: CardDetailsProps) {
  if (!details) return null;

  const entries = Object.entries(details);

  return (
    <div className="card-details">
      <div className="text-start break-all">
        <button
          className="absolute top-[10px] right-[10px] w-10 bg-transparent px-0 py-1.5 text-xl font-thin"
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
