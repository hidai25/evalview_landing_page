import { useEffect } from 'react';

interface MetadataConfig {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  structuredData?: Record<string, unknown>[];
}

const SITE_URL = 'https://evalview.com';
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

function upsertStructuredData(schemas: Record<string, unknown>[]) {
  document.head
    .querySelectorAll('script[data-evalview-schema="dynamic"]')
    .forEach((node) => node.remove());

  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.evalviewSchema = 'dynamic';
    script.dataset.evalviewSchemaIndex = String(index);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function usePageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  structuredData = [],
}: MetadataConfig) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    getOrCreateMeta('meta[name="description"]', { name: 'description' }).content = description;
    getOrCreateMeta('meta[property="og:type"]', { property: 'og:type' }).content = ogType;
    getOrCreateMeta('meta[property="og:title"]', { property: 'og:title' }).content = title;
    getOrCreateMeta('meta[property="og:description"]', { property: 'og:description' }).content = description;
    getOrCreateMeta('meta[property="og:url"]', { property: 'og:url' }).content = url;
    getOrCreateMeta('meta[property="og:image"]', { property: 'og:image' }).content = OG_IMAGE;
    getOrCreateMeta('meta[name="twitter:card"]', { name: 'twitter:card' }).content = 'summary_large_image';
    getOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).content = title;
    getOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).content = description;
    getOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).content = OG_IMAGE;
    getOrCreateCanonical().href = url;

    upsertStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url,
      },
      ...structuredData,
    ]);
  }, [description, ogType, path, structuredData, title]);
}
