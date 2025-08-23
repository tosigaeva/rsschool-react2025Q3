import { FormEntryTile } from '@/components/form-entries';
import { useFormStore } from '@/shared/store';

export function FormEntries() {
  const entries = useFormStore((state) => state.entries);

  if (entries.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No form submissions yet. Submit a form to see data here.
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-bold">Form Submissions</h2>
      <div className="grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <FormEntryTile entry={entry} key={entry.id} />
        ))}
      </div>
    </section>
  );
}
