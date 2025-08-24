import { type ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  id?: string;
};
export function Portal({ children, id = 'portal' }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = document.createElement('div');
    element.setAttribute('id', id);
    document.body.appendChild(element);
    setContainer(element);

    return () => {
      document.body.removeChild(element);
    };
  }, [id]);

  if (!container) return null;
  return createPortal(children, container);
}
