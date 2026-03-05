'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const navItems = [
    { href: '/sobre', label: 'Sobre' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/setores', label: 'Setores' },
    { href: '/projetos', label: 'Projetos' },
    { href: '/insights', label: 'Insights' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <>
      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Menu de navegação"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="btn primary" href="/contato" onClick={() => setMenuOpen(false)}>
          Fale conosco
        </Link>
      </div>

      <header className="header">
        <div className="container nav">
          <Link className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logosdmmain.svg" alt="Serra do Mar Engenharia" />
            <span>Serra do Mar</span>
          </Link>
          <nav className="nav-links" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={pathname === item.href ? { color: 'var(--text)' } : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="btn primary" href="/contato">Fale conosco</Link>
          <button
            id="hamburger"
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </>
  );
}
