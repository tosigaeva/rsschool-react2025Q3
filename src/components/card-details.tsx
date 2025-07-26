import type { CardDetailsProps } from '../types';

function CardDetails({ details }: CardDetailsProps) {
  if (!details) return null;

  const entries = Object.entries(details);

  return (
    <div className="character-details">
      <div className="character-details__card">
        {entries.map(([key, value]) => (
          <p key={key}>
            <span className="character-details__label">{key}: </span>
            <span className="character-details__value">{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default CardDetails;
