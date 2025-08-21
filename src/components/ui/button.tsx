type Props = {
  className: string;
  onClick: () => void;
  text: string;
};

export function Button({ className, onClick, text }: Props) {
  const defaultClassName =
    'py-2 px-5 border-none rounded-lg cursor-pointer font-bold text-white  w-60';
  return (
    <button className={`${defaultClassName} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
