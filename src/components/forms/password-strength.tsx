import { getPasswordStrengthScore } from '@/shared/utils/password';

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const score = getPasswordStrengthScore(password);
  const colors = [
    'bg-gray-300',
    'bg-red-400',
    'bg-yellow-400',
    'bg-blue-400',
    'bg-green-500',
  ];

  return (
    <div className="mt-1 h-2 w-full rounded bg-gray-200">
      <div
        className={`h-2 rounded ${colors[score]}`}
        style={{ width: `${(score / 4) * 100}%` }}
      />
    </div>
  );
}
