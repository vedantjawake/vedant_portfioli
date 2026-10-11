import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { certifications, profile, projects, skillGroups } from '../data/portfolio';
import Button from '../templates/Button';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './Profile.module.css';

function Counter({ value, label }: { value: number; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.value}>{n}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

const techCount = skillGroups.reduce((sum, g) => sum + g.skills.length, 0);

export default function Profile() {
  const stats = [
    { value: projects.length, label: 'Projects built' },
    { value: certifications.length, label: 'Certifications' },
    { value: techCount, label: 'Technologies' },
    { value: 3, label: 'Languages spoken' },
  ];

  return (
    <SectionTemplate id="profile" title="Profile" intro={profile.summary}>
      <div className={styles.grid}>
        <Reveal fill>
          <Card as="article" className={styles.details}>
            <h3 className={styles.cardTitle}>Details</h3>
            <dl className={styles.list}>
              {profile.details.map((d) => (
                <div key={d.label} className={styles.row}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
            <ul className={styles.socials} aria-label="Social links">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={profile.resumeUrl} download className={styles.resumeBtn}>Download resume (PDF)</Button>
          </Card>
        </Reveal>

        <ul className={styles.stats}>
          {stats.map((s, i) => (
            <li key={s.label}>
              <Reveal fill delay={120 + i * 100}>
                <Card className={styles.statCard}>
                  <Counter value={s.value} label={s.label} />
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </SectionTemplate>
  );
}
