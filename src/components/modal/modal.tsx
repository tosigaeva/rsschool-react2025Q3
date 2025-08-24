import { useEffect, useRef } from 'react';

import { Portal } from '@/components/portal';

type Props = {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
};

export function Modal({ children, onClose, open }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocusedElement.current = document.activeElement as HTMLElement;

    const getFocusableElements = (): HTMLElement[] => {
      if (!modalRef.current) return [];

      const focusableSelectors =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      );
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!modalRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          firstElement.focus();
          return;
        }

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
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

    setTimeout(() => {
      const focusableElements = getFocusableElements();

      const firstFormElement = focusableElements.find(
        (element) =>
          element.tagName === 'INPUT' ||
          element.tagName === 'SELECT' ||
          element.tagName === 'TEXTAREA'
      );

      if (firstFormElement) {
        firstFormElement.focus();
      } else if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';

      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-10 bg-gray-900/80"
        onClick={(event) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
          ) {
            onClose();
          }
        }}
      />
      <div
        className="fixed top-1/2 left-1/2 z-20 max-h-[95vh] w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white p-5 outline-none"
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </Portal>
  );
}
