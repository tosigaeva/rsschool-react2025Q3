type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`rounded-lg border border-gray-300 p-1 text-sm focus:border-blue-400 focus:outline-none ${className}`}
    />
  );
}
