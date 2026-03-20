import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://evalview.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const DIST_DIR = path.resolve('dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

// ---------------------------------------------------------------------------
// Static body content for each route (visible to crawlers that don't run JS)
// ---------------------------------------------------------------------------

const bodyContent = {
  '/': `
    <h1>EvalView — Regression Testing for AI Agents</h1>
    <p><strong>Snapshot behavior, detect regressions, block broken agents before production.</strong></p>
    <p>EvalView sends test queries to your agent, records everything (tool calls, parameters, sequence, output, cost, latency), and diffs it against a golden baseline. When something changes, you know immediately.</p>
    <p>Normal tests catch crashes. Tracing shows what happened after the fact. EvalView catches the harder class: the agent returns 200 but silently takes the wrong tool path, skips a clarification, or degrades output quality after a model update.</p>
    <h2>Quick Start</h2>
    <pre><code>pip install evalview
evalview init        # Detect agent, create starter suite
evalview snapshot    # Save current behavior as baseline
evalview check       # Catch regressions after every change
evalview demo        # See it live, no API key needed</code></pre>
    <h2>What It Catches</h2>
    <ul>
      <li><strong>PASSED</strong> — Behavior matches baseline. Ship with confidence.</li>
      <li><strong>TOOLS_CHANGED</strong> — Different tools called. Review the diff.</li>
      <li><strong>OUTPUT_CHANGED</strong> — Same tools, output shifted. Review the diff.</li>
      <li><strong>REGRESSION</strong> — Score dropped significantly. Fix before shipping.</li>
    </ul>
    <h2>Four Scoring Layers</h2>
    <ul>
      <li><strong>Tool calls + sequence</strong> — exact tool names, order, parameters (free)</li>
      <li><strong>Code-based checks</strong> — regex, JSON schema, contains/not_contains (free)</li>
      <li><strong>Semantic similarity</strong> — output meaning via embeddings (~$0.00004/test)</li>
      <li><strong>LLM-as-judge</strong> — output quality scored by GPT, Claude, Gemini, DeepSeek, or Ollama (~$0.01/test)</li>
    </ul>
    <p>The first two layers alone catch most regressions — fully offline, zero cost.</p>
    <h2>Key Features</h2>
    <ul>
      <li>Golden baseline regression detection with tool call and parameter diffing</li>
      <li>Multi-turn conversation testing with per-turn judge scoring</li>
      <li>Multi-reference baselines (up to 5 variants for non-deterministic agents)</li>
      <li>Production monitoring with Slack alerts</li>
      <li>Statistical testing with pass@k reliability metrics</li>
      <li>Real traffic capture via proxy</li>
      <li>Test generation from live agents</li>
      <li>CI/CD with GitHub Actions, PR comments, cost/latency/model change alerts</li>
      <li>SKILL.md validation for Claude Code and OpenAI Codex</li>
      <li>MCP contract testing for interface drift detection</li>
      <li>Works fully offline with Ollama</li>
    </ul>
    <h2>How EvalView Compares</h2>
    <h3>vs. LangSmith</h3>
    <p>LangSmith is for observability — it shows what your agent did. EvalView is for regression testing — it tells you whether your agent broke. They're complementary.</p>
    <p><a href="/vs/langsmith">Read EvalView vs LangSmith comparison</a></p>
    <h3>vs. Braintrust</h3>
    <p>Braintrust scores agent quality. EvalView detects when behavior changes automatically through golden baseline diffing. EvalView is fully free and open source.</p>
    <p><a href="/vs/braintrust">Read EvalView vs Braintrust comparison</a></p>
    <h3>vs. Langfuse</h3>
    <p>Langfuse is for LLM observability. EvalView is for regression testing with golden baselines and CI gating.</p>
    <p><a href="/vs/langfuse">Read EvalView vs Langfuse comparison</a> | <a href="/vs/deepeval">Read EvalView vs DeepEval comparison</a></p>
    <h2>Supported Frameworks</h2>
    <p>Works with LangGraph, CrewAI, OpenAI Assistants, Anthropic Claude, HuggingFace, Ollama, MCP servers, and any HTTP API.</p>
    <h2>Guides</h2>
    <ul>
      <li><a href="/ai-agent-testing-ci-cd">AI Agent Testing in CI/CD</a></li>
      <li><a href="/ai-agent-regression-testing">AI Agent Regression Testing</a></li>
      <li><a href="/mcp-server-testing">MCP Server Testing</a></li>
      <li><a href="/langgraph-testing">LangGraph Testing in CI/CD</a></li>
      <li><a href="/tool-calling-agent-testing">Tool-Calling Agent Testing</a></li>
    </ul>
    <p>Free and open source under the Apache 2.0 license.</p>
    <p><a href="https://github.com/hidai25/eval-view">View on GitHub</a> | <a href="https://pypi.org/project/evalview/">Install from PyPI</a></p>`,

  '/blog': `
    <h1>EvalView Blog</h1>
    <p>Engineering deep-dives, reliability guides, and practical CI workflows for teams building and testing AI agents.</p>
    <ul>
      <li><a href="/ai-agent-testing-ci-cd">AI Agent Testing in CI/CD</a></li>
      <li><a href="/ai-agent-regression-testing">AI Agent Regression Testing</a></li>
      <li><a href="/mcp-server-testing">MCP Server Testing</a></li>
      <li><a href="/langgraph-testing">LangGraph Testing in CI/CD</a></li>
      <li><a href="/tool-calling-agent-testing">Tool-Calling Agent Testing</a></li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a></p>`,

  '/vs/langsmith': `
    <h1>EvalView vs LangSmith</h1>
    <p>LangSmith is strongest for observability, debugging, and the broader LangChain ecosystem. EvalView is strongest for regression testing: generate tests, snapshot behavior, diff tool paths, and block regressions in CI/CD.</p>
    <h2>Choose LangSmith when</h2>
    <ul>
      <li>you want trace collection and debugging dashboards</li>
      <li>you are already deep in LangChain or LangGraph</li>
      <li>you want a broader platform for prompt iteration and agent development</li>
    </ul>
    <h2>Choose EvalView when</h2>
    <ul>
      <li>you need AI agent regression testing</li>
      <li>you want golden baseline testing for agents</li>
      <li>you care about tool-call, sequence, output, cost, and latency diffs</li>
      <li>you want a lightweight CI gate instead of a larger platform decision</li>
    </ul>
    <h2>EvalView workflow</h2>
    <pre><code>evalview generate --agent http://localhost:8000
evalview snapshot tests/generated --approve-generated
evalview check tests/generated</code></pre>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/vs/langfuse': `
    <h1>EvalView vs Langfuse</h1>
    <p>Langfuse is strongest as an open-source LLM observability platform. EvalView is strongest as a regression testing system for AI agents in CI/CD.</p>
    <h2>Choose Langfuse when</h2>
    <ul>
      <li>you want traces, dashboards, metrics, and production observability</li>
      <li>you want a broader OSS platform for LLM workflows</li>
      <li>you want prompt and telemetry infrastructure across apps</li>
    </ul>
    <h2>Choose EvalView when</h2>
    <ul>
      <li>you need regression testing for AI agents</li>
      <li>you want to snapshot agent behavior and catch drift before shipping</li>
      <li>you care about tool-call and sequence diffs, not just traces</li>
      <li>you want a fast zero-traffic onboarding story from a URL or logs</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/vs/braintrust': `
    <h1>EvalView vs Braintrust</h1>
    <p>Braintrust is strongest for broader eval workflows and scoring infrastructure. EvalView is strongest for regression testing with golden baselines and tool-path diffs.</p>
    <h2>Choose Braintrust when</h2>
    <ul>
      <li>you want a broader evaluation platform</li>
      <li>you care about experiment, data, and scorer workflows</li>
      <li>you already have production traces and want to turn them into evaluation loops</li>
    </ul>
    <h2>Choose EvalView when</h2>
    <ul>
      <li>you need tool-calling agent testing</li>
      <li>you want golden baseline regression detection</li>
      <li>you want to go from zero tests to a draft suite from just an endpoint or log file</li>
      <li>your main question is: did my agent break?</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/vs/deepeval': `
    <h1>EvalView vs DeepEval</h1>
    <p>DeepEval is strongest as a metric-heavy LLM evaluation framework. EvalView is strongest at regression testing agent behavior, especially tool use, sequence, and trajectory changes.</p>
    <h2>Choose DeepEval when</h2>
    <ul>
      <li>you want metric-first evaluation for outputs, RAG, hallucination, and safety</li>
      <li>you prefer a Python test framework feel</li>
      <li>your main problem is scoring outputs rather than diffing behavior paths</li>
    </ul>
    <h2>Choose EvalView when</h2>
    <ul>
      <li>your agent uses tools and multi-step trajectories</li>
      <li>you need AI agent testing in CI/CD</li>
      <li>you want golden baseline testing</li>
      <li>you want to generate your first suite from a URL or logs</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/ai-agent-testing-ci-cd': `
    <h1>AI Agent Testing in CI/CD</h1>
    <p>If you are looking for AI agent testing in CI/CD, the practical problem is not just "does the output look okay?" It is "did my agent behavior change in a way that should block this merge?" EvalView is built for that workflow.</p>
    <h2>What EvalView tests in CI</h2>
    <ul>
      <li>tool calls</li>
      <li>tool sequence</li>
      <li>output drift</li>
      <li>cost changes</li>
      <li>latency changes</li>
      <li>safety contracts like forbidden_tools</li>
    </ul>
    <h2>Recommended workflow</h2>
    <pre><code>evalview generate --agent http://localhost:8000
evalview snapshot tests/generated --approve-generated
evalview check --json --fail-on REGRESSION
evalview ci comment --results tests/generated/generated.report.json</code></pre>
    <h2>Works especially well for</h2>
    <ul>
      <li>LangGraph agents</li>
      <li>MCP servers and MCP-based agents</li>
      <li>generic HTTP agents</li>
      <li>tool-calling assistants</li>
      <li>teams shipping agent changes through GitHub Actions</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/ai-agent-regression-testing': `
    <h1>AI Agent Regression Testing</h1>
    <p>Regression testing for AI agents is not just output scoring. It is verifying that tool use, turn sequence, safety boundaries, latency, and cost still behave the way your team approved.</p>
    <h2>What should be regression-tested</h2>
    <ul>
      <li>tool usage and tool order</li>
      <li>multi-turn clarification flows</li>
      <li>refusal and safety behavior</li>
      <li>cost and latency drift</li>
      <li>final output shape for user-visible responses</li>
    </ul>
    <h2>Why EvalView fits this workflow</h2>
    <ul>
      <li>golden baseline testing for agents</li>
      <li>draft suite generation from a URL or logs</li>
      <li>approval-gated snapshots before locking in expectations</li>
      <li>CI comments that surface behavior changes in pull requests</li>
    </ul>
    <h2>Recommended commands</h2>
    <pre><code>evalview generate --agent http://localhost:8000
evalview snapshot tests/generated --approve-generated
evalview check tests/generated</code></pre>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/mcp-server-testing': `
    <h1>MCP Server Testing</h1>
    <p>MCP servers introduce a clean tool contract, but that does not remove regression risk. You still need tests for tool discovery, tool choice, argument shape, safety boundaries, and multi-step behavior.</p>
    <h2>What teams need to catch</h2>
    <ul>
      <li>wrong tool selection</li>
      <li>tool argument drift</li>
      <li>forbidden tool usage in sensitive scenarios</li>
      <li>clarification turns before tool execution</li>
      <li>behavior changes after tool or prompt updates</li>
    </ul>
    <h2>Why EvalView is a good fit</h2>
    <ul>
      <li>MCP-aware discovery for generation</li>
      <li>tool-path clustering into draft tests</li>
      <li>forbidden_tools contracts for safety-sensitive flows</li>
      <li>CI-friendly regression checks for MCP agents</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/langgraph-testing': `
    <h1>LangGraph Testing in CI/CD</h1>
    <p>LangGraph gives you stateful agent flows, but you still need a reliable way to verify graph behavior after prompt, model, tool, or node changes. EvalView gives you that regression loop.</p>
    <h2>What matters for LangGraph</h2>
    <ul>
      <li>state-driven multi-turn flows</li>
      <li>tool-node selection and sequence</li>
      <li>branching behavior and fallbacks</li>
      <li>user-visible output regressions</li>
      <li>cost and latency changes by run path</li>
    </ul>
    <h2>Recommended workflow</h2>
    <ul>
      <li>generate a draft suite from the running agent</li>
      <li>review and approve snapshots</li>
      <li>run regression checks in GitHub Actions on every pull request</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/tool-calling-agent-testing': `
    <h1>Tool-Calling Agent Testing</h1>
    <p>The hardest agent bugs are often not in the final text. They are in the hidden trajectory: wrong tool, wrong order, missing clarification, or dangerous tool use in the wrong scenario.</p>
    <h2>What to assert</h2>
    <ul>
      <li>tool presence</li>
      <li>tool sequence</li>
      <li>forbidden tool usage</li>
      <li>clarification before action</li>
      <li>output checks only when the wording is stable enough to matter</li>
    </ul>
    <h2>How EvalView helps</h2>
    <ul>
      <li>clusters behavior by tool path instead of treating every phrasing variation as a new test</li>
      <li>generates native YAML tests from live probing or logs</li>
      <li>turns approved behavior into a regression gate in CI/CD</li>
    </ul>
    <p><a href="/">Back to EvalView homepage</a> | <a href="https://github.com/hidai25/eval-view">View on GitHub</a></p>`,

  '/blog/your-ai-agent-didnt-crash-it-just-started-lying': `
    <article>
      <h1>Your AI Agent Didn't Crash. It Just Quietly Started Lying.</h1>
      <p><time datetime="2026-03-11">March 11, 2026</time> &middot; By Hidai Bar-Mor, Creator of EvalView &middot; 4 min read</p>
      <p>The scariest agent bugs aren't the ones that throw errors. They're the ones where everything looks fine but the agent stopped calling its tools days ago and has been hallucinating ever since.</p>
      <h2>This keeps happening</h2>
      <p>Some version update quietly drops tool access. Or the model behind the API gets updated server side and suddenly your agent stops using its tools. Or a checkpoint resumes with bad state. Or an entire sub agent team just doesnt run and the orchestrator fills in the gap with whatever sounds right.</p>
      <p>No crash. No error. The output reads fine. Its just wrong.</p>
      <h2>Why normal testing misses this completely</h2>
      <p>Think about how most people test agents. You check the final output against some expected answer. Or you run an LLM judge that asks "is this response good" and it says yeah looks good to me.</p>
      <p>But the output isnt whats broken. The execution path is. The agent took a completely different route to get to something that sounds similar enough to pass. It skipped tools, hallucinated data, took shortcuts.</p>
      <h2>What I actually do now</h2>
      <p>I stopped testing outputs and started testing the execution path. When my agent is working correctly I record everything. Which tools got called, what order, what parameters. I save that as a baseline. Then after any change I run the same thing again and diff the two traces.</p>
      <pre><code>  ✓ login-flow           PASSED
  ⚠ refund-request       TOOLS_CHANGED
      - lookup_order → check_policy → process_refund
      + lookup_order → process_refund
  ✗ billing-dispute      REGRESSION  score 85 → 55</code></pre>
      <p>Tools disappeared? I see it immediately. Score tanked? Same. Before any user does.</p>
      <h2>If you take one thing from this</h2>
      <p>Just start recording your agents tool calls. Save what the agent does when its working, and compare against that after you make changes. Prompt tweaks, model swaps, dependency bumps, all of it.</p>
      <p>I ended up building <a href="https://github.com/hidai25/eval-view">EvalView</a> around this. Snapshot behavior. Compare runs. Catch regressions before they hit production.</p>
      <p>Start recording tool calls. Start diffing trajectories. Start treating agent behavior like something you can baseline, compare, and protect.</p>
    </article>
    <p><a href="/blog">Back to blog</a> | <a href="/">Back to EvalView homepage</a></p>`,

  '/privacy': `
    <h1>Privacy Policy</h1>
    <p><em>Last updated: March 19, 2026</em></p>
    <h2>Overview</h2>
    <p>EvalView is an open-source project maintained by Hidai Bar-Mor. This policy explains how we handle data when you visit evalview.com.</p>
    <h2>What we collect</h2>
    <p><strong>Website analytics:</strong> We use Google Analytics (GA4) to understand how visitors use evalview.com. Google Analytics collects anonymized usage data including pages visited, time on site, referral source, and browser type. This data is aggregated and cannot identify you personally.</p>
    <p><strong>Waitlist emails:</strong> If you join our Cloud waitlist, we collect your email address. We use this only to notify you about EvalView Cloud availability. We never sell or share your email with third parties.</p>
    <h2>The open-source CLI tool</h2>
    <p>The EvalView CLI tool (pip install evalview) runs entirely on your machine. It does not send data to our servers unless you explicitly opt in to anonymous telemetry. Test data, golden baselines, and results stay local by default.</p>
    <h2>Cookies</h2>
    <p>Google Analytics sets cookies to distinguish unique visitors and track sessions. You can opt out using a browser extension or by enabling Do Not Track in your browser settings.</p>
    <h2>Your rights</h2>
    <p>You can request deletion of your waitlist email at any time by emailing hidai@evalview.com.</p>
    <h2>Contact</h2>
    <p>Questions about privacy? Email <a href="mailto:hidai@evalview.com">hidai@evalview.com</a>.</p>
    <p><a href="/">Back to EvalView homepage</a></p>`,

  '/terms': `
    <h1>Terms of Service</h1>
    <p><em>Last updated: March 19, 2026</em></p>
    <h2>Overview</h2>
    <p>These terms govern your use of evalview.com and the EvalView open-source software. By using the website or software, you agree to these terms.</p>
    <h2>The open-source software</h2>
    <p>EvalView is distributed under the Apache 2.0 license. You are free to use, modify, and distribute the software in accordance with that license. The software is provided "as is" without warranty of any kind.</p>
    <h2>The website</h2>
    <p>evalview.com provides documentation, comparisons, and marketing information about EvalView. We make reasonable efforts to keep the content accurate but don't guarantee all information is current or error-free.</p>
    <h2>Cloud waitlist</h2>
    <p>The EvalView Cloud waitlist is a notification list only. Joining does not create a service agreement or guarantee access to any future product.</p>
    <h2>Intellectual property</h2>
    <p>The EvalView name, logo, and website design are the property of Hidai Bar-Mor. The open-source software is licensed under Apache 2.0. Content on the website may be quoted with attribution.</p>
    <h2>Limitation of liability</h2>
    <p>To the fullest extent permitted by law, EvalView and its maintainers are not liable for any indirect, incidental, special, or consequential damages arising from your use of the software or website.</p>
    <h2>Contact</h2>
    <p>Questions about these terms? Email <a href="mailto:hidai@evalview.com">hidai@evalview.com</a>.</p>
    <p><a href="/">Back to EvalView homepage</a></p>`,
};

// ---------------------------------------------------------------------------
// Route definitions (meta tags + structured data)
// ---------------------------------------------------------------------------

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
        softwareVersion: '0.5.3',
        description:
          'Open-source regression testing framework for AI agents. Snapshot behavior, diff tool calls, detect regressions, and block broken agents in CI/CD.',
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        screenshot: `${SITE_URL}/og-image.png`,
        downloadUrl: 'https://pypi.org/project/evalview/',
        featureList: [
          'Golden baseline regression detection',
          'Tool call and parameter diffing',
          'Multi-turn conversation testing with per-turn judge scoring',
          'Production monitoring with Slack alerts',
          '14 framework adapters (LangGraph, CrewAI, OpenAI, Anthropic, HuggingFace, Ollama, MCP)',
          'Statistical testing with pass@k metrics',
          'LLM-as-judge evaluation (GPT, Claude, Gemini, DeepSeek, Ollama)',
          'CI/CD with GitHub Actions, PR comments, cost/model alerts',
          'Real traffic capture via proxy',
          'Test generation from live agents',
          'SKILL.md validation for Claude Code and OpenAI Codex',
          'MCP contract testing for interface drift',
          'Works fully offline with Ollama',
        ],
        author: {
          '@type': 'Organization',
          name: 'EvalView',
          url: SITE_URL,
          sameAs: [
            'https://github.com/hidai25/eval-view',
            'https://pypi.org/project/evalview/',
            'https://x.com/Hidai_barmor',
          ],
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '[data-prerendered]'],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is EvalView?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'EvalView is an open-source regression testing framework for AI agents. It sends test queries to your agent, records everything (tool calls, parameters, sequence, output, cost, latency), and diffs against a golden baseline. Install with pip install evalview.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is EvalView different from LangSmith?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "LangSmith is for observability and tracing — it shows you what your agent did. EvalView is for testing and regression detection — it tells you whether your agent broke. They're complementary tools.",
            },
          },
          {
            '@type': 'Question',
            name: 'Is EvalView free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. EvalView is free and open source under the Apache 2.0 license. Core regression detection works without any API keys. Use Ollama for completely free, fully offline LLM-as-judge evaluation.',
            },
          },
          {
            '@type': 'Question',
            name: 'What frameworks does EvalView support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'EvalView works with LangGraph, CrewAI, OpenAI Assistants, Anthropic Claude, HuggingFace, Ollama, MCP servers, and any HTTP API. It also supports SKILL.md validation for Claude Code and OpenAI Codex.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can EvalView run in CI/CD?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. EvalView has a GitHub Action (hidai25/eval-view@v0.5.3), exit codes, JSON output, and PR comments with cost/latency/model change alerts. It works with GitHub Actions, GitLab CI, CircleCI, and any CI system that runs Python.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can EvalView handle non-deterministic LLM outputs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. EvalView provides multi-reference goldens (up to 5 variants per test), statistical mode with pass@k metrics, flexible subsequence matching, and tool categories that match by intent instead of exact names.',
            },
          },
        ],
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
  {
    path: '/blog/your-ai-agent-didnt-crash-it-just-started-lying',
    title: "Your AI Agent Didn't Crash. It Just Quietly Started Lying. | EvalView Blog",
    description:
      "The scariest agent bugs aren't the ones that throw errors. They're the ones where everything looks fine but the agent stopped calling its tools days ago and has been hallucinating ever since.",
    ogType: 'article',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: "Your AI Agent Didn't Crash. It Just Quietly Started Lying.",
        description: "The scariest agent bugs aren't the ones that throw errors. They're the ones where the agent stopped calling its tools and has been hallucinating ever since.",
        url: `${SITE_URL}/blog/your-ai-agent-didnt-crash-it-just-started-lying`,
        image: `${SITE_URL}/og-image.png`,
        datePublished: '2026-03-11',
        dateModified: '2026-03-11',
        author: {
          '@type': 'Person',
          name: 'Hidai Bar-Mor',
          url: 'https://x.com/Hidai_barmor',
        },
        publisher: {
          '@type': 'Organization',
          name: 'EvalView',
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
        },
      },
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | EvalView',
    description:
      'EvalView privacy policy. How we handle your data when you visit evalview.com.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | EvalView',
    description:
      'EvalView terms of service for evalview.com and the EvalView open-source software.',
  },
];

// ---------------------------------------------------------------------------
// HTML rendering helpers
// ---------------------------------------------------------------------------

function upsertTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

// Global schemas included on every page
const globalSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EvalView',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Open-source regression testing framework for AI agents.',
    email: 'hidai@evalview.com',
    sameAs: [
      'https://github.com/hidai25/eval-view',
      'https://pypi.org/project/evalview/',
      'https://x.com/Hidai_barmor',
      'https://dev.to/evalview',
      'https://medium.com/@evalview',
      'https://glama.ai/mcp/servers/@hidai25/evalview-mcp',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EvalView',
    url: SITE_URL,
    description: 'Regression testing for AI agents. Snapshot behavior, detect regressions, block broken agents before production.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

function buildStructuredData(route) {
  const url = `${SITE_URL}${route.path}`;
  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url,
  };
  return [webpage, ...(route.structuredData || []), ...globalSchemas]
    .map(
      (schema) =>
        `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`
    )
    .join('\n');
}

function buildStaticBody(route) {
  const content = bodyContent[route.path];
  if (!content) return '';
  return `\n    <div id="static-content" data-prerendered="true" style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;color:#f8fafc;">${content}
    </div>`;
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

  // Replace structured data
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace(
    /(<link rel="icon" type="image\/png" href="\/logo\.png">)/,
    `${buildStructuredData(route)}\n\n    $1`
  );

  // Inject static body content after <div id="root"></div>
  const staticBody = buildStaticBody(route);
  if (staticBody) {
    html = html.replace(
      /(<div id="root"><\/div>)/,
      `$1${staticBody}`
    );
  }

  // Remove homepage noscript block from subpages (prevents content duplication)
  if (route.path !== '/') {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  }

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

  console.log(`Prerendered ${routes.length} routes with static body content.`);
}

main().catch((error) => {
  console.error('Failed to prerender SEO pages:', error);
  process.exitCode = 1;
});
