import { useCallback, useEffect, useState } from 'react';
import { fontPairs } from '../data/fonts';
import type { FontPair } from '../data/fonts';

const KEY = 'portfolio-font';

/** Adds the Google Fonts stylesheet for a pair, once. */
export function loadFontPair(pair: FontPair) {
  if (document.querySelector(`link[href="${pair.href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = pair.href;
  document.head.appendChild(link);
}

export function useFont() {
  const [fontId, setFontId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && fontPairs.some((p) => p.id === saved)) return saved;
    } catch { /* storage unavailable */ }
    return fontPairs[0].id;
  });

  useEffect(() => {
    const pair = fontPairs.find((p) => p.id === fontId) ?? fontPairs[0];
    loadFontPair(pair);
    const root = document.documentElement;
    root.style.setProperty('--font-display', pair.display);
    root.style.setProperty('--font-body', pair.body);
    try { localStorage.setItem(KEY, fontId); } catch { /* ignore */ }
  }, [fontId]);

  const select = useCallback((id: string) => setFontId(id), []);
  return { fontId, setFontId: select };
}
