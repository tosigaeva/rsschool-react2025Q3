import type { CardDetailsProps } from '../types';

function CardDetails({ details }: CardDetailsProps) {
  if (!details) return null;

  const entries = Object.entries(details);

  return (
    <div className="card card_details">
      {entries.map(([key, value]) => (
        <p key={key}>
          <span className="label">{key}: </span>
          <span className="value">{value}</span>
        </p>
      ))}
    </div>
  );
}

export default CardDetails;
