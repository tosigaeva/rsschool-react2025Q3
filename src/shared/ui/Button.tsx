import type { ButtonProps } from '#/shared/ui/props/buttonProps.ts';

export function Button({ onClick }: ButtonProps) {
  return (
    <button className="button_yellow" onClick={onClick}>
      Search
    </button>
  );
}
