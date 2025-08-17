import { generateCSV } from '../../app/[locale]/actions';
import { useTranslations } from 'next-intl';

export function CSVDownloadButton() {
  const t = useTranslations();

  const handleDownload = async () => {
    try {
      const result = await generateCSV();

      if (result.success && result.data) {
        // Create blob and download
        const blob = new Blob([result.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename || 'characters.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to generate CSV:', result.error);
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
    >
      Download CSV
    </button>
  );
}
