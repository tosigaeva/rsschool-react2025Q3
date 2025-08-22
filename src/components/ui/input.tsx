type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  id: string;
  label: string;
};
export function Input({ error, id, label, ...props }: Props) {
  return (
    <div className="flex min-h-12 flex-col gap-1">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="rounded-lg border border-gray-100 p-1 text-sm"
      />
      {error && <span className="min-h-4 text-xs text-red-600">{error}</span>}
    </div>
  );
}
