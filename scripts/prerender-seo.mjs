import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://www.evalview.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const DIST_DIR = path.resolve('dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

const routes = [
  {
    path: '/',
    title: 'EvalView – pytest for AI Agents | Open Source Agent Testing Framework',
    description:
      'EvalView is an open-source testing framework that brings pytest-style workflows to AI agents. Generate tests, track regressions, and keep tool-calling agents reliable in CI/CD.',
    ogType: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'EvalView',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        description:
          'Open-source testing framework for AI agents. Generate tests, snapshot behavior, detect regressions, and gate tool-calling agents in CI/CD.',
        url: SITE_URL,
        downloadUrl: 'https://pypi.org/project/evalview/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  },
  {
    path: '/blog',
    title: 'EvalView Blog | AI Agent Testing, Reliability, and CI',
    description:
      'Engineering deep-dives, reliability guides, and practical CI workflows for teams building and testing AI agents.',
    ogType: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'EvalView Blog',
        description:
          'Engineering deep-dives, reliability guides, and practical CI workflows for teams building and testing AI agents.',
        url: `${SITE_URL}/blog`,
      },
    ],
  },
  {
    path: '/vs/langsmith',
    title: 'EvalView vs LangSmith | AI Agent Regression Testing vs Observability',
    description:
      'Compare EvalView vs LangSmith. Use LangSmith for observability and traces. Use EvalView for regression testing, golden baselines, and CI gating for AI agents.',
  },
  {
    path: '/vs/langfuse',
    title: 'EvalView vs Langfuse | Regression Testing vs LLM Observability',
    description:
      'Compare EvalView vs Langfuse. Use Langfuse for LLM observability and metrics. Use EvalView for regression testing, golden baselines, and AI agent testing in CI/CD.',
  },
  {
    path: '/vs/braintrust',
    title: 'EvalView vs Braintrust | Agent Regression Testing vs Broader Evals',
    description:
      'Compare EvalView vs Braintrust. Use Braintrust for broader eval workflows and scoring. Use EvalView for regression testing with golden baselines and CI gating.',
  },
  {
    path: '/vs/deepeval',
    title: 'EvalView vs DeepEval | Agent Behavior Regression vs Metric-First Evals',
    description:
      'Compare EvalView vs DeepEval. Use DeepEval for metric-heavy output evaluation. Use EvalView for tool-using agent regression testing and behavior diffs in CI/CD.',
  },
  {
    path: '/ai-agent-testing-ci-cd',
    title: 'AI Agent Testing in CI/CD | EvalView',
    description:
      'AI agent testing in CI/CD with EvalView. Generate tests, snapshot behavior, detect regressions, and block broken tool-calling agents before production.',
  },
  {
    path: '/ai-agent-regression-testing',
    title: 'AI Agent Regression Testing | EvalView',
    description:
      'AI agent regression testing with EvalView. Generate tests, snapshot agent behavior, diff tool paths, and stop broken agent changes before production.',
  },
  {
    path: '/mcp-server-testing',
    title: 'MCP Server Testing | EvalView',
    description:
      'Test MCP servers and MCP-based agents with EvalView. Generate regression suites, verify tool usage, and catch tool contract drift before deployment.',
  },
  {
    path: '/langgraph-testing',
    title: 'LangGraph Testing in CI/CD | EvalView',
    description:
      'Test LangGraph agents in CI/CD with EvalView. Generate draft suites, snapshot behavior, and catch graph, tool, and trajectory regressions before merge.',
  },
  {
    path: '/tool-calling-agent-testing',
    title: 'Tool-Calling Agent Testing | EvalView',
    description:
      'Tool-calling agent testing with EvalView. Validate tool selection, tool order, safety contracts, and output regressions for multi-step AI agents.',
  },
];

function upsertTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function buildStructuredData(route) {
  const url = `${SITE_URL}${route.path}`;
  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url,
  };
  return [webpage, ...(route.structuredData || [])]
    .map(
      (schema) =>
        `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`
    )
    .join('\n');
}

function renderRoute(baseHtml, route) {
  const url = `${SITE_URL}${route.path}`;
  let html = baseHtml;

  html = upsertTag(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  html = upsertTag(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${route.description}">`
  );
  html = upsertTag(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${url}">`
  );
  html = upsertTag(
    html,
    /<meta property="og:type" content="[^"]*">/,
    `<meta property="og:type" content="${route.ogType || 'website'}">`
  );
  html = upsertTag(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  html = upsertTag(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${route.title}">`
  );
  html = upsertTag(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${route.description}">`
  );
  html = upsertTag(
    html,
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${OG_IMAGE}">`
  );
  html = upsertTag(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${route.title}">`
  );
  html = upsertTag(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${route.description}">`
  );
  html = upsertTag(
    html,
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${OG_IMAGE}">`
  );

  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace(
    /(<link rel="icon" type="image\/png" href="\/logo\.png">)/,
    `${buildStructuredData(route)}\n\n    $1`
  );

  return html;
}

async function writeRouteHtml(route, html) {
  if (route.path === '/') {
    await fs.writeFile(INDEX_PATH, html);
    return;
  }

  const outputDir = path.join(DIST_DIR, route.path.slice(1));
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, 'index.html'), html);
}

async function main() {
  const baseHtml = await fs.readFile(INDEX_PATH, 'utf8');

  for (const route of routes) {
    const html = renderRoute(baseHtml, route);
    await writeRouteHtml(route, html);
  }
}

main().catch((error) => {
  console.error('Failed to prerender SEO pages:', error);
  process.exitCode = 1;
});
