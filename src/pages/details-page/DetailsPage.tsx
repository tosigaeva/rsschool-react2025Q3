import { CardDetails } from '#/pages/search/components/card-details';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useCharacterDetailsQuery } from '#/shared/api/useQueries.ts';

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const {
    data: character,
    isLoading,
    error,
  } = useCharacterDetailsQuery(id || '');

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!character) return null;

  return (
    <CardDetails
      details={character}
      onClick={() => navigate({ pathname: '/', search })}
    />
  );
};
