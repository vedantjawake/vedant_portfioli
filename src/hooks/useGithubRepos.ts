import { useEffect, useState } from 'react';
import { fallbackRepos } from '../data/portfolio';
import type { GithubRepo } from '../types';

export type RepoStatus = 'loading' | 'live' | 'offline';

interface ApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
}

const KEY = 'gh-repos-v1';

/** Loads your newest public repositories from GitHub; falls back to a saved list. */
export function useGithubRepos(user: string, limit = 6) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<RepoStatus>('loading');

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(KEY);
      if (cached) {
        setRepos(JSON.parse(cached) as GithubRepo[]);
        setStatus('live');
        return;
      }
    } catch { /* storage unavailable */ }

    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub responded ${r.status}`);
        return r.json() as Promise<ApiRepo[]>;
      })
      .then((data) => {
        const list: GithubRepo[] = data
          .filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase())
          .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
          .slice(0, limit)
          .map((r) => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count,
            url: r.html_url,
            pushedAt: r.pushed_at,
          }));
        if (list.length === 0) throw new Error('No repositories');
        setRepos(list);
        setStatus('live');
        try { sessionStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
      })
      .catch(() => {
        if (ctrl.signal.aborted) return;
        setRepos(fallbackRepos);
        setStatus('offline');
      });

    return () => ctrl.abort();
  }, [user, limit]);

  return { repos, status };
}
