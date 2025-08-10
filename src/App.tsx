import {
  AboutPage,
  DetailsPage,
  Flyout,
  NotFoundPage,
  SearchPage,
} from '#/pages';
import { Header } from '#/widgets/header';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />}>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Flyout />
    </>
  );
}

export default App;
