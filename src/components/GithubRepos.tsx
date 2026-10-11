import { useGithubRepos } from '../hooks/useGithubRepos';
import Card from '../templates/Card';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './GithubRepos.module.css';

const USER = 'vedantjawake';

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5', JavaScript: '#F1E05A', TypeScript: '#3178C6', CSS: '#7F5AB6',
  HTML: '#E34C26', Java: '#B07219', 'C++': '#F34B7D', PHP: '#8892BF',
};

function timeAgo(iso?: string) {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return 'Updated today';
  if (days < 30) return `Updated ${days}d ago`;
  const months = Math.floor(days / 30);
  return months < 12 ? `Updated ${months}mo ago` : `Updated ${Math.floor(months / 12)}y ago`;
}

export default function GithubRepos() {
  const { repos, status } = useGithubRepos(USER);

  return (
    <SectionTemplate
      id="github"
      title="Code on GitHub"
      intro="My newest public repositories, pulled straight from GitHub."
    >
      <div className={styles.bar}>
        <span className={status === 'live' ? `${styles.pill} ${styles.live}` : styles.pill} role="status">
          <i aria-hidden="true" />
          {status === 'loading' && 'Loading from GitHub…'}
          {status === 'live' && 'Live from GitHub'}
          {status === 'offline' && 'Saved snapshot (GitHub unreachable)'}
        </span>
        <a className={styles.all} href={`https://github.com/${USER}?tab=repositories`} target="_blank" rel="noreferrer">
          View all repositories ↗
        </a>
      </div>

      <ul className={styles.grid} aria-busy={status === 'loading'}>
        {status === 'loading'
          ? Array.from({ length: 3 }, (_, i) => (
              <li key={i}><div className={styles.skeleton} aria-hidden="true" /></li>
            ))
          : repos.map((r, i) => (
              <li key={r.name}>
                <Reveal fill delay={(i % 3) * 100}>
                  <Card as="article" className={styles.repo}>
                    <a href={r.url} target="_blank" rel="noreferrer" className={styles.link}>
                      <h3>{r.name}</h3>
                      <p>{r.description ?? 'No description yet.'}</p>
                      <div className={styles.meta}>
                        {r.language && (
                          <span className={styles.lang}>
                            <i style={{ background: LANG_COLORS[r.language] ?? 'var(--muted)' }} aria-hidden="true" />
                            {r.language}
                          </span>
                        )}
                        <span aria-label={`${r.stars} stars`}>★ {r.stars}</span>
                        {r.pushedAt && <span>{timeAgo(r.pushedAt)}</span>}
                      </div>
                    </a>
                  </Card>
                </Reveal>
              </li>
            ))}
      </ul>
    </SectionTemplate>
  );
}
