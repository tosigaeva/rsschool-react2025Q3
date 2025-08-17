import type { ButtonProps } from '#/shared/ui/props/buttonProps.ts';

export function RefreshButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Refresh</button>;
}
