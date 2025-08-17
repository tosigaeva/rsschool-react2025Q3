'use client';

import { Character } from '#/types';
import { useRouter, useSearchParams } from 'next/navigation';

import { CardDetails } from '../card-details';

interface DetailsPageProps {
  id: string;
}

export const DetailsPage = ({ character }: { character: Character }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const search = searchParams.toString() ? `?${searchParams.toString()}` : '';

  // const {
  //   data: character,
  //   isLoading,
  //   error,
  // } = useCharacterDetailsQuery(id);

  // if (error) return <p>{error.message}</p>;
  // if (isLoading) return <p>Loading...</p>;
  // if (!character) return null;

  return (
    <CardDetails
      details={character}
      onClick={() => console.error('ads')}
    />
  );
};
