import { about } from '../data/portfolio';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './About.module.css';

export default function About() {
  return (
    <SectionTemplate id="about" title="About me">
      <div className={styles.grid}>
        <div className={styles.story}>
          <Reveal><blockquote className={styles.quote}>{about.quote}</blockquote></Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={p} delay={i * 100}><p>{p}</p></Reveal>
          ))}
        </div>

        <aside className={styles.side}>
          <Reveal>
            <Card>
              <h3>Quick facts</h3>
              <dl className={styles.facts}>
                {about.facts.map((f) => (
                  <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
                ))}
              </dl>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card>
              <h3>Core strengths</h3>
              <ul className={styles.chips}>{about.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
            </Card>
          </Reveal>
          <Reveal delay={200}>
            <Card>
              <h3>Interests</h3>
              <ul className={styles.chips}>{about.interests.map((s) => <li key={s}>{s}</li>)}</ul>
            </Card>
          </Reveal>
          <Reveal delay={300}>
            <Card>
              <h3>Exploring now</h3>
              <ul className={`${styles.chips} ${styles.alt}`}>{about.learning.map((s) => <li key={s}>{s}</li>)}</ul>
            </Card>
          </Reveal>
        </aside>
      </div>
    </SectionTemplate>
  );
}
