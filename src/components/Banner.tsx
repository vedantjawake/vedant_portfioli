import styles from './Banner.module.css';

/** Animated orbit banner that sits behind the hero profile card. */
export default function Banner() {
  return (
    <div className={styles.banner} aria-hidden="true">
      <svg viewBox="0 0 600 600" className={styles.svg}>
        <circle cx="300" cy="300" r="150" className={styles.ring} />
        <circle cx="300" cy="300" r="220" className={`${styles.ring} ${styles.dashed}`} />
        <circle cx="300" cy="300" r="285" className={styles.ring} />

        <g className={styles.orbitA}><circle cx="450" cy="300" r="9" fill="var(--accent)" /></g>
        <g className={styles.orbitB}><circle cx="80" cy="300" r="7" fill="var(--mint)" /></g>
        <g className={styles.orbitC}><circle cx="300" cy="15" r="6" fill="var(--text)" /></g>
      </svg>
    </div>
  );
}
