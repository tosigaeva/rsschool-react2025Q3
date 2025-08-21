import { Header } from '@/components/header';
import { ModalButtons } from '@/components/modal-buttons';

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl p-8">
        <ModalButtons />
      </main>
    </>
  );
}

export default App;
