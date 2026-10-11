import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import styles from './Reveal.module.css';

interface Props {
  children: ReactNode;
  delay?: number;
  fill?: boolean;
  className?: string;
}

/** Scroll-reveal wrapper: slides up, un-blurs and fades in once visible. */
export default function Reveal({ children, delay = 0, fill = false, className = '' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const cls = [styles.reveal, inView ? styles.in : '', fill ? styles.fill : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div ref={ref} className={cls} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
