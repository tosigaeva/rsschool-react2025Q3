import { CardDetails } from '#/entities/card-details';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useFetchItem } from '#/shared/api/useClient.ts';

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadData, isLoading, character, error } = useFetchItem();

  useEffect(() => {
    if (!id) return;
    loadData(id).then(() => {});
  }, [loadData, id]);

  if (error)
    return (
      <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
    );

  if (isLoading) return <p>Loading...</p>;

  return (
    <CardDetails
      details={character}
      onClick={() =>
        navigate({ pathname: '/', search: window.location.search })
      }
    />
  );
};
