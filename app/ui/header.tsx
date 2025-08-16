import NavLink from '@/ui/nav-links';

export default function Header() {
  return (
    <header className="border-b-divider mb-12 flex justify-between border-b px-5">
      <h1 className="mb-3.5 text-3xl">Star Wars Character Finder</h1>
      <div className="flex items-end gap-9">
        <NavLink />
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}
