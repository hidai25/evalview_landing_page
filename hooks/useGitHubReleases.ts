import { useState, useEffect } from 'react';

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  prerelease: boolean;
  html_url: string;
}

export interface ParsedRelease {
  version: string;
  title: string;
  date: string;
  isLatest: boolean;
  isPrerelease: boolean;
  url: string;
  features: string[];
  improvements: string[];
  bugFixes: string[];
  other: string[];
}

const GITHUB_REPO = 'hidai25/EvalView';
const PYPI_PACKAGE = 'evalview';
const CACHE_KEY = 'evalview_github_releases';
const CACHE_KEY_REPO = 'evalview_github_repo';
const CACHE_KEY_PYPI = 'evalview_pypi_version';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function parseReleaseBody(body: string): { features: string[]; improvements: string[]; bugFixes: string[]; other: string[] } {
  const features: string[] = [];
  const improvements: string[] = [];
  const bugFixes: string[] = [];
  const other: string[] = [];

  if (!body) return { features, improvements, bugFixes, other };

  const lines = body.split('\n');
  let currentSection: 'features' | 'improvements' | 'bugFixes' | 'other' = 'other';

  for (const line of lines) {
    const trimmedLine = line.trim();
    const lowerLine = trimmedLine.toLowerCase();

    // Detect section headers
    if (lowerLine.includes('feature') || lowerLine.includes('new') || lowerLine.includes('added')) {
      currentSection = 'features';
      continue;
    } else if (lowerLine.includes('improvement') || lowerLine.includes('enhanced') || lowerLine.includes('changed') || lowerLine.includes('updated')) {
      currentSection = 'improvements';
      continue;
    } else if (lowerLine.includes('fix') || lowerLine.includes('bug') || lowerLine.includes('resolved')) {
      currentSection = 'bugFixes';
      continue;
    }

    // Parse bullet points
    const bulletMatch = trimmedLine.match(/^[-*•]\s*(.+)$/);
    if (bulletMatch) {
      const content = bulletMatch[1].trim();
      if (content) {
        switch (currentSection) {
          case 'features':
            features.push(content);
            break;
          case 'improvements':
            improvements.push(content);
            break;
          case 'bugFixes':
            bugFixes.push(content);
            break;
          default:
            other.push(content);
        }
      }
    }
  }

  // If nothing was categorized, put all bullet points in "other"
  if (features.length === 0 && improvements.length === 0 && bugFixes.length === 0 && other.length === 0) {
    const allBullets = body.match(/^[-*•]\s*.+$/gm);
    if (allBullets) {
      allBullets.forEach(bullet => {
        const content = bullet.replace(/^[-*•]\s*/, '').trim();
        if (content) other.push(content);
      });
    }
  }

  return { features, improvements, bugFixes, other };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function useGitHubReleases() {
  const [releases, setReleases] = useState<ParsedRelease[]>([]);
  const [latestVersion, setLatestVersion] = useState<string>('');
  const [starCount, setStarCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check cache first
        const cachedReleases = localStorage.getItem(CACHE_KEY);
        const cachedRepo = localStorage.getItem(CACHE_KEY_REPO);

        let useCachedReleases = false;
        let useCachedRepo = false;

        if (cachedReleases) {
          const { data, timestamp } = JSON.parse(cachedReleases);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setReleases(data.releases);
            setLatestVersion(data.latestVersion);
            useCachedReleases = true;
          }
        }

        if (cachedRepo) {
          const { data, timestamp } = JSON.parse(cachedRepo);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStarCount(data.starCount);
            useCachedRepo = true;
          }
        }

        if (useCachedReleases && useCachedRepo) {
          setLoading(false);
          return;
        }

        // Fetch releases if not cached
        if (!useCachedReleases) {
          const releasesResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`);
          if (releasesResponse.ok) {
            const data: GitHubRelease[] = await releasesResponse.json();
            const parsedReleases: ParsedRelease[] = data.map((release, index) => {
              const { features, improvements, bugFixes, other } = parseReleaseBody(release.body);
              return {
                version: release.tag_name.replace(/^v/, ''),
                title: release.name || `Release ${release.tag_name}`,
                date: formatDate(release.published_at),
                isLatest: index === 0,
                isPrerelease: release.prerelease,
                url: release.html_url,
                features,
                improvements,
                bugFixes,
                other,
              };
            });
            const latest = parsedReleases[0]?.version || '';
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              data: { releases: parsedReleases, latestVersion: latest },
              timestamp: Date.now(),
            }));
            setReleases(parsedReleases);
            setLatestVersion(latest);
          }
        }

        // Fetch repo info for star count if not cached
        if (!useCachedRepo) {
          const repoResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
          if (repoResponse.ok) {
            const repoData = await repoResponse.json();
            const stars = repoData.stargazers_count || 0;
            localStorage.setItem(CACHE_KEY_REPO, JSON.stringify({
              data: { starCount: stars },
              timestamp: Date.now(),
            }));
            setStarCount(stars);
          }
        }

        // Fetch latest version from PyPI (source of truth for pip installs)
        const cachedPypi = localStorage.getItem(CACHE_KEY_PYPI);
        let useCachedPypi = false;
        if (cachedPypi) {
          const { data, timestamp } = JSON.parse(cachedPypi);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setLatestVersion(data.version);
            useCachedPypi = true;
          }
        }
        if (!useCachedPypi) {
          const pypiResponse = await fetch(`https://pypi.org/pypi/${PYPI_PACKAGE}/json`);
          if (pypiResponse.ok) {
            const pypiData = await pypiResponse.json();
            const pypiVersion = pypiData.info?.version || '';
            if (pypiVersion) {
              localStorage.setItem(CACHE_KEY_PYPI, JSON.stringify({
                data: { version: pypiVersion },
                timestamp: Date.now(),
              }));
              setLatestVersion(pypiVersion);
            }
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { releases, latestVersion, starCount, loading, error };
}
