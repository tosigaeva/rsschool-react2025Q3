import { NavLink } from 'react-router';
import { ThemeToggle } from '#/shared/theme/toggle';

export function Header() {
  return (
    <header className="border-b-divider mb-12 flex justify-between border-b px-5">
      <h1 className="mb-3.5 text-3xl">Star Wars Character Finder</h1>
      <div className="flex items-end gap-9">
        <nav className="flex items-end gap-2">
          <NavLink to="/" className="nav-link" end>
            Search
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
