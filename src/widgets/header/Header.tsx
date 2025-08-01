import '#/App.css';
import { NavLink } from 'react-router';

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Star Wars Character Finder</h1>
      <nav className="header__nav">
        <NavLink to="/" className="nav__link" end>
          Search
        </NavLink>
        <NavLink to="/about" className="nav__link">
          About
        </NavLink>
      </nav>
    </header>
  );
}
