'use client';

import type { SearchResultSectionProps } from '#/types';

import { Card } from '#/components/card';
import { Pagination } from 'components/pagination';
import { useTranslations } from 'next-intl';

export function SearchResultSection({
  results,
  totalPages,
}: SearchResultSectionProps) {
  const t = useTranslations();

  if (!results.length) return <p className="mt-10">{t('search.noResults')}</p>;

  return (
    <div
      data-testid="search-results"
      className="flex w-3xl flex-col justify-center gap-y-8"
    >
      <div className="flex flex-wrap justify-center gap-6">
        {results.map((item) => {
          const id = item.url.split('/').filter(Boolean).pop() ?? '1';

          return <Card key={id} id={id} character={item} />;
        })}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
