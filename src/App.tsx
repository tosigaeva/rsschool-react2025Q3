import './App.css';
import { Route, Routes } from 'react-router';
import { SearchPage } from '#/pages/search';
import { NotFoundPage } from '#/pages/not-found';
import { DetailsPage } from '#/entities/details-page';
import { AboutPage } from '#/pages/about';
import { Flyout } from '#/entities/flyout';
import { Header } from '#/widgets/header';

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
