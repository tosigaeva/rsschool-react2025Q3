import { useState } from 'react';

import { FormEntries } from '@/components/form-entries';
import { HookForm, UncontrolledForm } from '@/components/forms';
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
          {modalType === 'uncontrolled' && <UncontrolledForm />}
          {modalType === 'hook' && (
            <HookForm onClose={() => setModalType(null)} />
          )}
        </Modal>
        <FormEntries />
      </main>
    </>
  );
}

export default App;
