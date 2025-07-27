import type { ButtonProps } from '#/shared/ui/props/buttonProps.ts';

export function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Search</button>;
}
