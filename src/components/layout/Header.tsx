import { Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useCollection } from '../../lib/collection';
import type { SectionId } from '../../lib/router';

const NAV: { id: SectionId; label: string; href: string }[] = [
  { id: 'home', label: 'HOME', href: '#/' },
  { id: 'timeline', label: 'TIMELINE', href: '#/timeline' },
  { id: 'civilizations', label: 'CIVILIZATIONS', href: '#/civilizations' },
  { id: 'artifacts', label: 'ARTIFACTS', href: '#/artifacts' },
  { id: 'collection', label: 'MY COLLECTION', href: '#/collection' },
];

export function Header({ active }: { active: SectionId }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useCollection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Menu mobile: Esc, focus iniziale, chiusura al cambio di hash
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onHash = () => setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Sezioni secondarie evidenziano la voce più vicina
  const navActive: SectionId = active === 'moments' ? 'timeline' : active === 'explore' ? 'artifacts' : active;

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Vai al contenuto
      </a>
      <div className="site-header__inner">
        <a href="#/" className="brand" aria-label="CHRONOS — torna all'inizio">
          <svg viewBox="0 0 32 32" className="brand__mark" aria-hidden="true">
            <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <path d="M16 16V6M16 16l6 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="brand__name">CHRONOS</span>
        </a>

        <nav className="nav" aria-label="Navigazione principale">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={n.href} className={`nav__link ${navActive === n.id ? 'is-active' : ''}`} aria-current={navActive === n.id ? 'location' : undefined}>
                  {n.label}
                  {n.id === 'collection' && favorites.length > 0 && (
                    <span className="nav__badge" aria-label={`${favorites.length} elementi salvati`}>
                      {favorites.length}
                    </span>
                  )}
                  {navActive === n.id && <motion.span layoutId="nav-underline" className="nav__underline" transition={{ type: 'spring', stiffness: 400, damping: 36 }} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__tools">
          <a href="#/explore" className="icon-btn" aria-label="Cerca nel museo">
            <Search size={18} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Menu mobile">
              <ol>
                {[...NAV, { id: 'explore' as SectionId, label: 'EXPLORE', href: '#/explore' }].map((n, i) => (
                  <motion.li key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <a href={n.href} className={navActive === n.id ? 'is-active' : ''} aria-current={navActive === n.id ? 'location' : undefined}>
                      <span className="mobile-menu__num">{String(i).padStart(2, '0')}</span>
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <p className="mobile-menu__payoff">EVERY SECOND TELLS A STORY.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
