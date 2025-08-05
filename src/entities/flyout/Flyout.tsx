import { useSelectionStore } from '#/shared/state/store/useSelectionStore.ts';
import type { Character } from '#/types';
import { useRef, useState } from 'react';

export function Flyout() {
  const selected = useSelectionStore((state) => state.selected);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  if (selected.length === 0) return null;

  const generateCsvContent = (
    headers: (keyof Character)[],
    rows: Character[]
  ): string => {
    const rowLines = rows.map((row) => headers.map((head) => row[head]));
    return [headers.join(','), ...rowLines].join('\n');
  };

  const handleDownload = () => {
    const headers: (keyof Character)[] = [
      'name',
      'birth_year',
      'gender',
      'url',
    ];
    const csvContent = generateCsvContent(headers, selected);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }, 0);
  };

  return (
    <div className={'flyout'}>
      <span>{selected.length} items are selected</span>
      <div>
        <button onClick={clearSelection}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={`${selected.length}_items.csv`}
        style={{ display: 'none' }}
      >
        Download
      </a>
    </div>
  );
}
