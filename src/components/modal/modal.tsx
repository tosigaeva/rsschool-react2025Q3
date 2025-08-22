import { useEffect, useRef } from 'react';

import { Portal } from '@/components/portal';

type Props = {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
};
export function Modal({ children, onClose, open }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  });
  if (!open) return null;
  return (
    <Portal>
      <div className="fixed inset-0 z-10 bg-gray-900/80" />
      <div
        className="fixed top-1/2 left-1/2 z-10 w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 cursor-pointer text-lg"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </Portal>
  );
}
