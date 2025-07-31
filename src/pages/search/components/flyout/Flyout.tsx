import { useSelectionStore } from '#/shared/store/useSelectionStore.ts';
import { downloadCsv, generateCsvContent } from '#/shared/utils/csv.ts';
import type { Character } from '#/types';

export function Flyout() {
  console.log('Flyout mounted');
  const selected = useSelectionStore((state) => state.selected);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  if (selected.length === 0) return null;

  const handleDownload = () => {
    //TODO: Decide whether to include all fields or only specific ones
    //const headers: (keyof Character)[] = ['name', 'birth_year', 'gender', 'url'];
    const headers = Object.keys(selected[0]) as (keyof Character)[];
    const csvContent = generateCsvContent(headers, selected);
    const fileName = `${selected.length}_items.csv`;
    downloadCsv(fileName, csvContent);
  };

  return (
    <div className={'flyout'}>
      <span>{selected.length} items are selected</span>
      <div>
        <button onClick={clearSelection}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}
