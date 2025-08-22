import { useState } from 'react';

import { Header } from '@/components/header';
import { Modal } from '@/components/modal';
import { ModalButtons } from '@/components/modal-buttons';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl p-8">
        <ModalButtons setIsOpen={setIsOpen} setModalContent={setModalContent} />
        <Modal onClose={() => setIsOpen(false)} open={isOpen}>
          {modalContent}
        </Modal>
      </main>
    </>
  );
}

export default App;
