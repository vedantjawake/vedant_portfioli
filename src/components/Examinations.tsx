import { examinations } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './Examinations.module.css';

export default function Examinations() {
  const { ref, inView } = useInView<HTMLOListElement>(0.15);

  return (
    <SectionTemplate
      id="examinations"
      title="Examination"
      intro="My academic path, from school to a master’s degree, most recent first."
    >
      <ol ref={ref} className={inView ? `${styles.timeline} ${styles.visible}` : styles.timeline}>
        <span className={styles.line} aria-hidden="true" />
        {examinations.map((e, i) => (
          <li key={e.id} className={styles.item}>
            <span className={e.status === 'Pursuing' ? `${styles.marker} ${styles.current}` : styles.marker} aria-hidden="true">
              {e.short}
            </span>
            <Reveal delay={i * 120}>
              <Card as="article" className={styles.card}>
                <div className={styles.top}>
                  <time>{e.year}</time>
                  <span className={e.status === 'Pursuing' ? `${styles.pill} ${styles.live}` : styles.pill}>
                    {e.status}
                  </span>
                </div>
                <h3>{e.name}</h3>
                <p className={styles.inst}>{e.institution}</p>
                {e.score && <p className={styles.score}>{e.score}</p>}
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionTemplate>
  );
}
