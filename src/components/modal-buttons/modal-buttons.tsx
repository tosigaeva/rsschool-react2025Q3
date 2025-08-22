import { Button } from '@/components/ui';

type Props = {
  setIsOpen: (open: boolean) => void;
  setModalContent: (content: React.ReactNode) => void;
};
export function ModalButtons({ setIsOpen, setModalContent }: Props) {
  function openUncontrolledForm() {
    console.log('uncontrolled form');
    setModalContent(<div>Uncontrolled Form Content</div>);
    setIsOpen(true);
  }

  function openHookForm() {
    console.log('hook form');
    setModalContent(<div>Hook Form Content</div>);
    setIsOpen(true);
  }
  return (
    <div className="mb-8 flex gap-4">
      <Button
        className="bg-pink-400"
        onClick={openUncontrolledForm}
        text={'Open Uncontrolled Form'}
      />
      <Button
        className="bg-green-300"
        onClick={openHookForm}
        text={'Open Hook Form'}
      />
    </div>
  );
}
