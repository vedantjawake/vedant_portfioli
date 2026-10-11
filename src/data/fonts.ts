export interface FontPair {
  id: string;
  label: string;
  note: string;
  display: string; // headings
  body: string;    // paragraphs and UI
  href: string;    // Google Fonts stylesheet (loaded only when needed)
}

const G = 'https://fonts.googleapis.com/css2?';

/** The first pair is the default. Add or remove pairs freely. */
export const fontPairs: FontPair[] = [
  {
    id: 'elegant', label: 'Elegant', note: 'Playfair Display + Inter',
    display: "'Playfair Display', Georgia, serif", body: "'Inter', system-ui, sans-serif",
    href: `${G}family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600;700&display=swap`,
  },
];
