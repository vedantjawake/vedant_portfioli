import { useMemo, useState } from 'react';
import { certifications } from '../data/portfolio';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './Certifications.module.css';

const ALL = 'All types';
const TYPES = [ALL, ...Array.from(new Set(certifications.map((c) => c.type)))];

export default function Certifications() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(ALL);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certifications.filter((c) => {
      const okType = type === ALL || c.type === type;
      const okQuery = !q || [c.title, c.issuer, c.type, ...c.tags].some((t) => t.toLowerCase().includes(q));
      return okType && okQuery;
    });
  }, [query, type]);

  return (
    <SectionTemplate
      id="certifications"
      title="Certification"
      intro="Courses, workshops and virtual job simulations that sharpened my AI and data skills."
    >
      <form className={styles.filters} role="search" onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span>Search certificates</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “AI”, “TCS” or “data”"
          />
        </label>
        <label className={styles.field}>
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </form>

      <p className={styles.count} role="status">
        Showing {results.length} of {certifications.length}
      </p>

      {results.length === 0 ? (
        <p className={styles.empty}>No certificate matches that search. Clear the search or choose “All types”.</p>
      ) : (
        <ul className={styles.grid}>
          {results.map((c, i) => (
            <li key={c.id}>
              <Reveal fill delay={(i % 3) * 100}>
                <Card as="article" className={styles.cert}>
                  <div className={styles.top}>
                    <span className={styles.type}>{c.type}</span>
                    {c.year && <time>{c.year}</time>}
                  </div>
                  <h3>{c.title}</h3>
                  <p className={styles.issuer}>{c.issuer}</p>
                  <ul className={styles.tags}>
                    {c.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </SectionTemplate>
  );
}
