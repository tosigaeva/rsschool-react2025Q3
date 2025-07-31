export function generateCsvContent<T>(headers: (keyof T)[], rows: T[]): string {
  const headerLine = headers.join(',');
  const rowLines = rows.map((row) => headers.map((head) => row[head]));
  return [headerLine, ...rowLines].join('\n');
}

export function downloadCsv(fileName: string, content: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
