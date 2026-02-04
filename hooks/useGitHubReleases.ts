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
const CACHE_KEY = 'evalview_github_releases';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReleases() {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setReleases(data.releases);
            setLatestVersion(data.latestVersion);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`);

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubRelease[] = await response.json();

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

        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: { releases: parsedReleases, latestVersion: latest },
          timestamp: Date.now(),
        }));

        setReleases(parsedReleases);
        setLatestVersion(latest);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch GitHub releases:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch releases');
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  return { releases, latestVersion, loading, error };
}
