import Card from './Card';
import '../App.css';
import Pagination from './pagination.tsx';
import type { BottomSectionProps } from '../types';

function BottomSection({
  results,
  hasSearch,
  isLoading,
  errorMessage,
  currentPage,
  totalPages,
  onPageChange,
}: BottomSectionProps) {
  if (isLoading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (hasSearch && !results.length)
    return <p className="no-results">No results found.</p>;

  return (
    <div className="bottom-section">
      <div className={'cards'}>
        {results.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            birth_year={item.birth_year}
            gender={item.gender}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onClick={onPageChange}
      />
    </div>
  );
}

export default BottomSection;
