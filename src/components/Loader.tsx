import { useEffect, useState } from 'react';
import { profile } from '../data/portfolio';
import Logo from './Logo';
import styles from './Loader.module.css';

type Phase = 'show' | 'leave' | 'gone';

/** Short logo intro. When it leaves it adds `ready` to <html> so the hero animation starts. */
export default function Loader() {
  const [phase, setPhase] = useState<Phase>('show');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = window.setTimeout(() => {
      document.documentElement.classList.add('ready');
      setPhase('leave');
    }, reduce ? 200 : 1900);
    const t2 = window.setTimeout(() => setPhase('gone'), reduce ? 400 : 2700);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);

  if (phase === 'gone') return null;
  return (
    <div className={`${styles.loader} ${phase === 'leave' ? styles.leave : ''}`} aria-hidden="true">
      <div className={styles.mark}><Logo size={96} /></div>
      <p className={styles.name}>{profile.shortName}</p>
      <div className={styles.bar}><span /></div>
    </div>
  );
}
