import { useEffect } from 'react';

interface MetadataConfig {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = 'https://www.evalview.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function getOrCreateMeta(selector: string, attrs: Record<string, string>): HTMLMetaElement {
  const existing = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (existing) {
    return existing;
  }

  const meta = document.createElement('meta');
  Object.entries(attrs).forEach(([key, value]) => meta.setAttribute(key, value));
  document.head.appendChild(meta);
  return meta;
}

function getOrCreateCanonical(): HTMLLinkElement {
  const existing = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (existing) {
    return existing;
  }

  const link = document.createElement('link');
  link.rel = 'canonical';
  document.head.appendChild(link);
  return link;
}

export function usePageMetadata({ title, description, path }: MetadataConfig) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    getOrCreateMeta('meta[name="description"]', { name: 'description' }).content = description;
    getOrCreateMeta('meta[property="og:title"]', { property: 'og:title' }).content = title;
    getOrCreateMeta('meta[property="og:description"]', { property: 'og:description' }).content = description;
    getOrCreateMeta('meta[property="og:url"]', { property: 'og:url' }).content = url;
    getOrCreateMeta('meta[property="og:image"]', { property: 'og:image' }).content = OG_IMAGE;
    getOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).content = title;
    getOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).content = description;
    getOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).content = OG_IMAGE;
    getOrCreateCanonical().href = url;
  }, [description, path, title]);
}
