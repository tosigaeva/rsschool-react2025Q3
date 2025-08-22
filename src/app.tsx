import { useState } from 'react';

import { Header } from '@/components/header';
import { Modal } from '@/components/modal';
import { ModalButtons } from '@/components/modal-buttons';

type ModalType = 'hook' | 'uncontrolled' | null;

function App() {
  const [modalType, setModalType] = useState<ModalType>(null);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl p-8">
        <ModalButtons setModalType={setModalType} />
        <Modal onClose={() => setModalType(null)} open={modalType !== null}>
          {modalType === 'uncontrolled' && <div>Uncontrolled modal</div>}
          {modalType === 'hook' && <div>Hook modal</div>}
        </Modal>
      </main>
    </>
  );
}

export default App;
