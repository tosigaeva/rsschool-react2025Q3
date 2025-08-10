import { CardDetails } from '#/pages/search/components/card-details';
import { useCharacterDetailsQuery } from '#/shared/api/useQueries.ts';
import { useNavigate, useParams, useSearchParams } from 'react-router';

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
