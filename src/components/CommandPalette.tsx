import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './CommandPalette.module.css';

export interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

interface Props { open: boolean; onClose: () => void; commands: Command[] }

export default function CommandPalette({ open, onClose, commands }: Props) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActive(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (c: Command | undefined) => {
    if (!c) return;
    onClose();
    window.setTimeout(c.run, 60);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[active]); }
  };

  let lastGroup = '';
  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.panel} role="dialog" aria-modal="true" aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}
      >
        <div className={styles.search}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, open a link, run an action…"
            role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-activedescendant={results.length ? `cmd-${active}` : undefined}
            aria-label="Search commands"
          />
          <kbd>Esc</kbd>
        </div>

        <ul id="cmd-list" role="listbox" className={styles.list}>
          {results.length === 0 && <li className={styles.empty}>No results for “{query}”.</li>}
          {results.map((c, i) => {
            const header = c.group !== lastGroup;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {header && <p className={styles.group}>{c.group}</p>}
                <div
                  id={`cmd-${i}`} role="option" aria-selected={i === active}
                  className={i === active ? `${styles.item} ${styles.on}` : styles.item}
                  onMouseMove={() => setActive(i)} onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  {c.hint && <small>{c.hint}</small>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.foot} aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
        </div>
      </div>
    </div>
  );
}
