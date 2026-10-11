import { socialLinks } from '../data/portfolio';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import type { SocialLink } from '../types';
import SocialIcon from './SocialIcon';
import styles from './Connect.module.css';

const GROUPS: SocialLink['group'][] = ['Professional', 'Competitive coding', 'Writing', 'Credentials'];

export default function Connect() {
  return (
    <SectionTemplate
      id="connect"
      title="Find me online"
      intro="My code, problem-solving profiles, articles and credentials, all in one place."
    >
      <div className={styles.groups}>
        {GROUPS.map((group, gi) => {
          const links = socialLinks.filter((l) => l.group === group);
          return (
            <Reveal key={group} delay={gi * 90}>
              <section aria-labelledby={`grp-${gi}`}>
                <h3 id={`grp-${gi}`} className={styles.groupTitle}>{group}</h3>
                <ul className={styles.list}>
                  {links.map((l) => (
                    <li key={l.id}>
                      <Card as="div" className={styles.tile}>
                        <a
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className={styles.link}
                          aria-label={`${l.label}: ${l.handle}`}
                        >
                          <span className={styles.icon}><SocialIcon id={l.id} size={26} /></span>
                          <span className={styles.text}>
                            <strong>{l.label}</strong>
                            <small>{l.handle}</small>
                          </span>
                          <span className={styles.arrow} aria-hidden="true">↗</span>
                        </a>
                      </Card>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}
      </div>
    </SectionTemplate>
  );
}
