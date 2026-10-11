import { profile, socialLinks } from '../data/portfolio';
import Logo from './Logo';
import SocialIcon from './SocialIcon';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}><Logo size={32} /><span>{profile.shortName}</span></div>
        <ul className={styles.socials} aria-label="Social links">
          {socialLinks.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <SocialIcon id={l.id} size={18} />
              </a>
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} {profile.name}. </p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
