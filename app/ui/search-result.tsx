import { fetchCharacters } from '@/lib/data';
import Card from '@/ui/card';

import type { Character } from '../../src/types';

export default async function SearchResult({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { results, totalPages } = await fetchCharacters(query, currentPage);

  console.log(totalPages);

  return (
    <div
      data-testid="search-results"
      className="flex w-3xl flex-col justify-center gap-y-8"
    >
      <div className="flex flex-wrap justify-center gap-6">
        {results.map((item: Character) => {
          const id = item.url.split('/').filter(Boolean).pop() ?? '1';
          return <Card key={id} id={id} character={item} />;
        })}
      </div>
    </div>
  );
}
