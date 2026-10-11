import type { ReactNode } from 'react';
import Reveal from './Reveal';
import styles from './SectionTemplate.module.css';

interface Props {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Page-level template: every portfolio section is rendered through this. */
export default function SectionTemplate({ id, title, intro, children }: Props) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <h2 id={`${id}-title`} className={styles.title}>{title}</h2>
            {intro && <p className={styles.intro}>{intro}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
