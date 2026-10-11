import { useScrollProgress } from '../hooks/useScrollProgress';
import styles from './BackToTop.module.css';

const R = 20;
const C = 2 * Math.PI * R;

export default function BackToTop() {
  const progress = useScrollProgress();
  const visible = progress > 0.06;
  return (
    <a
      href="#top"
      className={visible ? `${styles.btn} ${styles.show}` : styles.btn}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 48 48" className={styles.ring} aria-hidden="true">
        <circle cx="24" cy="24" r={R} className={styles.track} />
        <circle
          cx="24" cy="24" r={R} className={styles.bar}
          strokeDasharray={C} strokeDashoffset={C * (1 - progress)} transform="rotate(-90 24 24)"
        />
      </svg>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}
