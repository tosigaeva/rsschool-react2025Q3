import { ButtonProps } from "#/components/ui/props/buttonProps";

export function RefreshButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Refresh</button>;
}
