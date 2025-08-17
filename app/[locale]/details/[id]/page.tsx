import { fetchCharacterDetails } from '#/shared/api/useQueries';

import { DetailsPage } from '../../../../components/details-page';

export default async function DetailsPageRoute({
  params,
}: {
  params: { id: string };
}) {
  const character = await fetchCharacterDetails('73');
  return <DetailsPage character={character} />;
}
