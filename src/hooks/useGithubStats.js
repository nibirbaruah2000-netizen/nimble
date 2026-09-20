import { useEffect, useState } from 'react';
import { PROFILE } from '../data/social';

// Clearly-labeled illustrative placeholders — NOT Mohsin's real GitHub
// statistics. Swap `fetchLiveStats` in for `DEMO_STATS` once you're
// ready to wire up the real GitHub API (see below).
const DEMO_STATS = {
  isLive: false,
  repositories: 24,
  followers: 0,
  contributionsLastYear: 0,
  topLanguages: [
    { name: 'JavaScript', percent: 55 },
    { name: 'TypeScript', percent: 20 },
    { name: 'HTML/CSS', percent: 15 },
    { name: 'Other', percent: 10 },
  ],
};

/**
 * Returns { data, loading }. Currently always resolves to demo data.
 *
 * To go live: fetch `https://api.github.com/users/${PROFILE.github.username}`
 * (and /repos, /events for contributions) client-side or via a small
 * serverless function, map the response into this same shape, and
 * set `isLive: true`.
 */
export function useGithubStats() {
  const [state, setState] = useState({ data: DEMO_STATS, loading: false });

  useEffect(() => {
    // Intentionally left as demo data — see comment above for the
    // real API integration path. `PROFILE.github.username` is already
    // wired up and ready to use once you connect a live source.
    setState({ data: DEMO_STATS, loading: false });
  }, []);

  return state;
}

export { DEMO_STATS };
export const GITHUB_USERNAME = PROFILE.github.username;
