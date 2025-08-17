import { ButtonProps } from '#/components/ui/props/buttonProps';

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className="bg-primary-500 hover:bg-primary-400 hover:border-primary-400 text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
