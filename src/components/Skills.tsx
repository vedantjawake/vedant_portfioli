import type { CSSProperties } from 'react';
import { skillGroups } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import type { SkillGroup } from '../types';
import styles from './Skills.module.css';

function Group({ group }: { group: SkillGroup }) {
  const { ref, inView } = useInView<HTMLUListElement>(0.3);
  return (
    <Card as="article" className={styles.group}>
      <header className={styles.head}>
        <h3>{group.title}</h3>
        <span className={styles.count}>{group.skills.length}</span>
      </header>
      <p className={styles.blurb}>{group.blurb}</p>
      <ul ref={ref} className={inView ? `${styles.chips} ${styles.visible}` : styles.chips}>
        {group.skills.map((s, i) => (
          <li key={s} style={{ '--i': i } as CSSProperties}>{s}</li>
        ))}
      </ul>
    </Card>
  );
}

export default function Skills() {
  return (
    <SectionTemplate
      id="skills"
      title="Skills"
      intro="The languages, frameworks and fundamentals I use to build and ship."
    >
      <ul className={styles.grid}>
        {skillGroups.map((g, i) => (
          <li key={g.id}>
            <Reveal fill delay={(i % 3) * 100}><Group group={g} /></Reveal>
          </li>
        ))}
      </ul>
    </SectionTemplate>
  );
}
