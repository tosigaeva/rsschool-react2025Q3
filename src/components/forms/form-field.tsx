import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  error?: string;
  id: string;
  label: string;
};
export function FormField({ children, error, id, label }: Props) {
  return (
    <div className="flex min-h-12 flex-col gap-1">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && <span className="min-h-4 text-xs text-red-600">{error}</span>}
    </div>
  );
}
