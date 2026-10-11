import {
  siCodechef, siCredly, siDevdotto, siGithub, siGmail,
  siHackerrank, siHashnode, siLeetcode, siMedium,
} from 'simple-icons';
import type { SocialId } from '../types';

// LinkedIn is not in the simple-icons set, so its glyph is drawn here.
const LINKEDIN =
  'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.84-2 3.8-2 4.06 0 4.84 2.67 4.84 6.14V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z';

const PATHS: Record<SocialId, string> = {
  github: siGithub.path,
  linkedin: LINKEDIN,
  email: siGmail.path,
  leetcode: siLeetcode.path,
  hackerrank: siHackerrank.path,
  codechef: siCodechef.path,
  devto: siDevdotto.path,
  hashnode: siHashnode.path,
  medium: siMedium.path,
  credly: siCredly.path,
};

interface Props { id: SocialId; size?: number }

export default function SocialIcon({ id, size = 22 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={PATHS[id]} />
    </svg>
  );
}
