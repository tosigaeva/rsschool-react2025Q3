import type { ButtonProps } from '#/shared/ui/props/buttonProps.ts';

export function Button({ onClick }: ButtonProps) {
  return (
    <button
      className="bg-primary-500 hover:bg-primary-400 hover:border-primary-400 text-black"
      onClick={onClick}
    >
      Search
    </button>
  );
}
