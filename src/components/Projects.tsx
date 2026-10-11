import { projects } from '../data/portfolio';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <SectionTemplate
      id="projects"
      title="Projects"
      intro="Things I am building and have shipped, from AI tools to a real business platform."
    >
      <ul className={styles.grid}>
        {projects.map((p, i) => (
          <li key={p.id}>
            <Reveal fill delay={(i % 2) * 120}>
              <Card as="article" className={styles.project}>
                <div className={styles.top}>
                  <span className={p.status === 'In progress' ? `${styles.badge} ${styles.live}` : styles.badge}>
                    <i aria-hidden="true" />
                    {p.status}
                  </span>
                  <time>{p.period}</time>
                </div>
                <h3>{p.title}</h3>
                <p className={styles.kind}>{p.kind}</p>
                <p className={styles.summary}>{p.summary}</p>
                <ul className={styles.features}>
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <ul className={styles.stack} aria-label="Technologies used">
                  {p.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionTemplate>
  );
}
