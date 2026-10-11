import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant };
type NativeProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; variant?: Variant };

export default function Button(props: AnchorProps | NativeProps) {
  const { variant = 'primary', className = '', ...rest } = props;
  const cls = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if ('href' in rest && rest.href) {
    return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
