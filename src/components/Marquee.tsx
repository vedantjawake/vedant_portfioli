import styles from './Marquee.module.css';

interface Props {
  items: string[];
  variant?: 'chips' | 'display';
  reverse?: boolean;
}

/** Infinite horizontal ticker. Items are repeated so the loop never shows a gap. */
export default function Marquee({ items, variant = 'chips', reverse = false }: Props) {
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className={variant === 'display' ? styles.display : styles.chip}>
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`${styles.marquee} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
