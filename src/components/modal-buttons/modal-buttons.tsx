import { Button } from '@/components/ui';

type Props = {
  setModalType: (type: 'hook' | 'uncontrolled') => void;
};
export function ModalButtons({ setModalType }: Props) {
  function openUncontrolledForm() {
    setModalType('uncontrolled');
  }

  function openHookForm() {
    setModalType('hook');
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
