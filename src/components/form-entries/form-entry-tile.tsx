import type { FormEntry } from '@/shared/store/form-store';

type Props = {
  entry: FormEntry;
};

export function FormEntryTile({ entry }: Props) {
  const style =
    entry.formType === 'hook'
      ? {
          bg: 'bg-green-50',
          border: 'border-green-100',
          text: 'text-green-500',
        }
      : {
          bg: 'bg-pink-50',
          border: 'border-green-100',
          text: 'text-pink-600',
        };
  const pictureFile = entry.data.picture?.[0];

  return (
    <article
      className={`rounded-xl border-2 bg-white p-4 shadow-sm ${style.border}`}
    >
      <span
        className={`mb-2 inline-block rounded-full px-2 py-0.25 text-xs font-bold ${style.bg} ${style.text}`}
      >
        {entry.formType}
      </span>
      {pictureFile && (
        <div className="mb-4 flex justify-center">
          <img
            alt="Uploaded picture"
            className="mt-1 h-40 w-40 rounded-md object-cover shadow-md"
            src={URL.createObjectURL(pictureFile)}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p>
          <strong>Name:</strong> {entry.data.name}
        </p>
        <p>
          <b>Age:</b> {entry.data.age}
        </p>
        <p>
          <b>Email:</b> {entry.data.email}
        </p>
        <p>
          <b>Country:</b> {entry.data.country}
        </p>
        <p>
          <b>Gender:</b> {entry.data.gender}
        </p>
      </div>
    </article>
  );
}
