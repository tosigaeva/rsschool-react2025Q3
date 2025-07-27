import './App.css';
import { Route, Routes } from 'react-router';
import { SearchPage } from '#/pages/search';
import { NotFoundPage } from '#/pages/not-found';
import { DetailsPage } from '#/pages/details-page';
import { AboutPage } from '#/pages/about';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />}>
        <Route path="/details/:id" element={<DetailsPage />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
