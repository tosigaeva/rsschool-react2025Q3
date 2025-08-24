type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ className = '', ...props }: Props) {
  return (
    <input
      type="checkbox"
      {...props}
      className={`h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400 ${className}`}
    />
  );
}
