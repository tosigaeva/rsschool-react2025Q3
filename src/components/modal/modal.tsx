import ReactDOM from 'react-dom';

type Props = {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
};
export function Modal({ children, onClose, open }: Props) {
  if (!open) return null;

  const portalElement = document.getElementById('portal');
  if (!portalElement) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-10 bg-gray-900/80" />
      <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white p-10">
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </>,
    portalElement
  );
}
