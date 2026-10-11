import type { ElementType, PointerEvent, ReactNode } from 'react';
import styles from './Card.module.css';

interface Props {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Surface template with a cursor-tracking spotlight and glowing border. */
export default function Card({ as: Tag = 'div', className = '', children }: Props) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <Tag className={`${styles.card} ${className}`.trim()} onPointerMove={onMove}>
      {children}
    </Tag>
  );
}
