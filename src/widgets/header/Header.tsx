import '#/App.css';
import { NavLink } from 'react-router';

export function Header() {
  return (
    <header className="border-b-divider mb-12 flex justify-between border-b pt-5 pr-10 pl-5">
      <h1 className="mb-3.5 text-[28px] tracking-[1px]">
        Star Wars Character Finder
      </h1>
      <nav className="flex items-end gap-2">
        <NavLink to="/" className="nav-link" end>
          Search
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </nav>
    </header>
  );
}
