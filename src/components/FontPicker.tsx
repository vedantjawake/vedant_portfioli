import { useEffect, useRef, useState } from 'react';
import { fontPairs } from '../data/fonts';
import { loadFontPair } from '../hooks/useFont';
import styles from './FontPicker.module.css';

interface Props { fontId: string; onSelect: (id: string) => void }

/** "Aa" button with a popover that previews every font pair. */
export default function FontPicker({ fontId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    fontPairs.forEach(loadFontPair); // so each option previews in its own font
    const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrap}>
      <button
        type="button" className={styles.btn} onClick={() => setOpen((o) => !o)}
        aria-haspopup="true" aria-expanded={open} aria-label="Change font"
      >
        Aa
      </button>
      {open && (
        <div className={styles.pop} role="group" aria-label="Font options">
          <p className={styles.title}>Choose a font</p>
          <ul>
            {fontPairs.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={p.id === fontId ? `${styles.opt} ${styles.on}` : styles.opt}
                  aria-pressed={p.id === fontId}
                  onClick={() => onSelect(p.id)}
                >
                  <span className={styles.name} style={{ fontFamily: p.display }}>Vedant Jawake</span>
                  <span className={styles.sample} style={{ fontFamily: p.body }}>
                    {p.label} · {p.note}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
