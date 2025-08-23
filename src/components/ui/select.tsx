type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ children, className = '', ...props }: Props) {
  return (
    <select
      {...props}
      className={`rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-400 focus:outline-none ${className}`}
    >
      {children}
    </select>
  );
}
