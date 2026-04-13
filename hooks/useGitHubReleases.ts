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

const GITHUB_REPO = 'hidai25/eval-view';
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

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp >= CACHE_DURATION) return null;
    return data as T;
  } catch {
    return null;
  }
}

function writeCache(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // ignore quota / disabled storage
  }
}

async function fetchPypiVersion(): Promise<string | null> {
  const cached = readCache<{ version: string }>(CACHE_KEY_PYPI);
  if (cached?.version) return cached.version;
  try {
    const res = await fetch(`https://pypi.org/pypi/${PYPI_PACKAGE}/json`);
    if (!res.ok) return null;
    const data = await res.json();
    const version: string = data?.info?.version || '';
    if (version) writeCache(CACHE_KEY_PYPI, { version });
    return version || null;
  } catch {
    return null;
  }
}

async function fetchStarCount(): Promise<number | null> {
  const cached = readCache<{ starCount: number }>(CACHE_KEY_REPO);
  if (cached && typeof cached.starCount === 'number') return cached.starCount;
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
    if (!res.ok) return null;
    const data = await res.json();
    const stars: number = data?.stargazers_count ?? 0;
    writeCache(CACHE_KEY_REPO, { starCount: stars });
    return stars;
  } catch {
    return null;
  }
}

async function fetchReleases(): Promise<{ releases: ParsedRelease[]; latestVersion: string } | null> {
  const cached = readCache<{ releases: ParsedRelease[]; latestVersion: string }>(CACHE_KEY);
  if (cached?.releases) return cached;
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`);
    if (!res.ok) return null;
    const data: GitHubRelease[] = await res.json();
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
    const payload = { releases: parsedReleases, latestVersion: latest };
    writeCache(CACHE_KEY, payload);
    return payload;
  } catch {
    return null;
  }
}

export function useGitHubReleases() {
  const [releases, setReleases] = useState<ParsedRelease[]>([]);
  const [latestVersion, setLatestVersion] = useState<string>('');
  const [starCount, setStarCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [releasesResult, starsResult, pypiVersion] = await Promise.all([
          fetchReleases(),
          fetchStarCount(),
          fetchPypiVersion(),
        ]);

        if (cancelled) return;

        if (releasesResult) {
          setReleases(releasesResult.releases);
          if (releasesResult.latestVersion) setLatestVersion(releasesResult.latestVersion);
        }
        if (starsResult !== null) setStarCount(starsResult);
        // PyPI is source of truth for the install version — apply last.
        if (pypiVersion) setLatestVersion(pypiVersion);
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch release data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { releases, latestVersion, starCount, loading, error };
}
