'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'search', href: '/' },
  { name: 'about', href: '/about' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex items-end gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`nav-link ${isActive ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
