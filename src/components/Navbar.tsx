import { useState } from 'react';
import { profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollProgress } from '../hooks/useScrollProgress';
import type { Theme } from '../hooks/useTheme';
import FontPicker from './FontPicker';
import Logo from './Logo';
import styles from './Navbar.module.css';

export const NAV_ITEMS = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certification' },
  { id: 'examinations', label: 'Examination' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
const IDS = NAV_ITEMS.map((n) => n.id);

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  fontId: string;
  onFontChange: (id: string) => void;
}

export default function Navbar({ theme, onToggleTheme, onOpenPalette, fontId, onFontChange }: Props) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  const progress = useScrollProgress();

  return (
    <header className={styles.nav}>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label={`${profile.shortName}, back to top`}>
          <Logo size={38} />
          <span className={styles.brandName}>{profile.shortName}</span>
        </a>

        <nav aria-label="Primary" className={`${styles.links} ${open ? styles.open : ''}`}>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? styles.active : undefined}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.search} onClick={onOpenPalette} aria-label="Open command palette (Ctrl K)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
          <a className={styles.resume} href={profile.resumeUrl} download>Resume</a>
          <FontPicker fontId={fontId} onSelect={onFontChange} />
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            )}
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
