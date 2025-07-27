import '#/App.css';
import type { PaginationProps } from '#/types/props';

export function Pagination({
  totalPages,
  currentPage,
  onClick,
}: PaginationProps) {
  return (
    <div className={'pagination'}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onClick(page)}
            className={'button_square'}
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
