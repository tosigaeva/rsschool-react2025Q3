import { useSelectionStore } from '#/shared/store/useSelectionStore.ts';
import type { Character } from '#/types';
import { useEffect, useRef, useState } from 'react';

export function Flyout() {
  const selected = useSelectionStore((state) => state.selected);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');

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
  };

  useEffect(() => {
    if (downloadUrl && downloadRef.current) {
      downloadRef.current.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl('');
    }
  }, [downloadUrl]);

  if (selected.length === 0) return null;

  return (
    <div className="bg-secondary-300 border-secondary-300 secondary-shadow-md fixed right-5 bottom-5 z-2 w-fit rounded-lg border-2 px-6 py-4">
      <span className="mb-5 inline-block text-black">
        {selected.length} items are selected
      </span>
      <div>
        <button
          className="hover:border-secondary-400 hover:bg-secondary-400 border-black text-black normal-case"
          onClick={clearSelection}
        >
          Unselect all
        </button>
        <button
          className="hover:border-secondary-400 hover:bg-secondary-400 border-black text-black normal-case"
          onClick={handleDownload}
        >
          Download
        </button>
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
