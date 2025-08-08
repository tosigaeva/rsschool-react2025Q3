import { CardDetails } from '#/pages/search/components/card-details';
import { useNavigate, useParams } from 'react-router';
import { useCharacterDetailsQuery } from '#/shared/api/useQueries.ts';

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: character,
    isLoading,
    error,
  } = useCharacterDetailsQuery(id || '');

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <CardDetails
      details={character ?? null}
      onClick={() =>
        navigate({ pathname: '/', search: window.location.search })
      }
    />
  );
};
