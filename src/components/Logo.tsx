import { useId } from 'react';

interface Props { size?: number; title?: string }

/** Brand mark: hexagon with a V monogram and an accent dot. Matches /public/logo.svg. */
export default function Logo({ size = 40, title = 'Vedant Jawake logo' }: Props) {
  const gid = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={title}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB547" />
          <stop offset="1" stopColor="#6EE7C8" />
        </linearGradient>
      </defs>
      <path
        d="M32 6l22 12.5v27L32 58 10 45.5v-27z" pathLength={1}
        fill="none" stroke={`url(#${gid})`} strokeWidth="3" strokeLinejoin="round"
      />
      <path d="M21 22l11 22 11-22" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="51" r="3" fill="#FFB547" />
    </svg>
  );
}
