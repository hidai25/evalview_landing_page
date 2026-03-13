export interface SeoSection {
  heading: string;
  body?: string;
  bullets?: string[];
  code?: string;
}

export interface SeoPageContent {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  sections: SeoSection[];
}

export const seoPages: Record<string, SeoPageContent> = {
  '/vs/langsmith': {
    slug: '/vs/langsmith',
    title: 'EvalView vs LangSmith | AI Agent Regression Testing vs Observability',
    description: 'Compare EvalView vs LangSmith. Use LangSmith for observability and traces. Use EvalView for regression testing, golden baselines, and CI gating for AI agents.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs LangSmith',
    intro: 'LangSmith is strongest for observability, debugging, and the broader LangChain ecosystem. EvalView is strongest for regression testing: generate tests, snapshot behavior, diff tool paths, and block regressions in CI/CD.',
    sections: [
      {
        heading: 'Choose LangSmith when',
        bullets: [
          'you want trace collection and debugging dashboards',
          'you are already deep in LangChain or LangGraph',
          'you want a broader platform for prompt iteration and agent development',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'you need AI agent regression testing',
          'you want golden baseline testing for agents',
          'you care about tool-call, sequence, output, cost, and latency diffs',
          'you want a lightweight CI gate instead of a larger platform decision',
        ],
      },
      {
        heading: 'EvalView workflow',
        code: `evalview generate --agent http://localhost:8000\n` +
          `evalview snapshot tests/generated --approve-generated\n` +
          `evalview check tests/generated`,
      },
    ],
  },
  '/vs/langfuse': {
    slug: '/vs/langfuse',
    title: 'EvalView vs Langfuse | Regression Testing vs LLM Observability',
    description: 'Compare EvalView vs Langfuse. Use Langfuse for LLM observability and metrics. Use EvalView for regression testing, golden baselines, and AI agent testing in CI/CD.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs Langfuse',
    intro: 'Langfuse is strongest as an open-source LLM observability platform. EvalView is strongest as a regression testing system for AI agents in CI/CD.',
    sections: [
      {
        heading: 'Choose Langfuse when',
        bullets: [
          'you want traces, dashboards, metrics, and production observability',
          'you want a broader OSS platform for LLM workflows',
          'you want prompt and telemetry infrastructure across apps',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'you need regression testing for AI agents',
          'you want to snapshot agent behavior and catch drift before shipping',
          'you care about tool-call and sequence diffs, not just traces',
          'you want a fast zero-traffic onboarding story from a URL or logs',
        ],
      },
    ],
  },
  '/vs/braintrust': {
    slug: '/vs/braintrust',
    title: 'EvalView vs Braintrust | Agent Regression Testing vs Broader Evals',
    description: 'Compare EvalView vs Braintrust. Use Braintrust for broader eval workflows and scoring. Use EvalView for regression testing with golden baselines and CI gating.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs Braintrust',
    intro: 'Braintrust is strongest for broader eval workflows and scoring infrastructure. EvalView is strongest for regression testing with golden baselines and tool-path diffs.',
    sections: [
      {
        heading: 'Choose Braintrust when',
        bullets: [
          'you want a broader evaluation platform',
          'you care about experiment, data, and scorer workflows',
          'you already have production traces and want to turn them into evaluation loops',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'you need tool-calling agent testing',
          'you want golden baseline regression detection',
          'you want to go from zero tests to a draft suite from just an endpoint or log file',
          'your main question is: did my agent break?',
        ],
      },
    ],
  },
  '/vs/deepeval': {
    slug: '/vs/deepeval',
    title: 'EvalView vs DeepEval | Agent Behavior Regression vs Metric-First Evals',
    description: 'Compare EvalView vs DeepEval. Use DeepEval for metric-heavy output evaluation. Use EvalView for tool-using agent regression testing and behavior diffs in CI/CD.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs DeepEval',
    intro: 'DeepEval is strongest as a metric-heavy LLM evaluation framework. EvalView is strongest at regression testing agent behavior, especially tool use, sequence, and trajectory changes.',
    sections: [
      {
        heading: 'Choose DeepEval when',
        bullets: [
          'you want metric-first evaluation for outputs, RAG, hallucination, and safety',
          'you prefer a Python test framework feel',
          'your main problem is scoring outputs rather than diffing behavior paths',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'your agent uses tools and multi-step trajectories',
          'you need AI agent testing in CI/CD',
          'you want golden baseline testing',
          'you want to generate your first suite from a URL or logs',
        ],
      },
    ],
  },
  '/ai-agent-testing-ci-cd': {
    slug: '/ai-agent-testing-ci-cd',
    title: 'AI Agent Testing in CI/CD | EvalView',
    description: 'AI agent testing in CI/CD with EvalView. Generate tests, snapshot behavior, detect regressions, and block broken tool-calling agents before production.',
    eyebrow: 'Guide',
    headline: 'AI Agent Testing in CI/CD',
    intro: 'If you are looking for AI agent testing in CI/CD, the practical problem is not just “does the output look okay?” It is “did my agent behavior change in a way that should block this merge?” EvalView is built for that workflow.',
    sections: [
      {
        heading: 'What EvalView tests in CI',
        bullets: [
          'tool calls',
          'tool sequence',
          'output drift',
          'cost changes',
          'latency changes',
          'safety contracts like forbidden_tools',
        ],
      },
      {
        heading: 'Recommended workflow',
        code: `evalview generate --agent http://localhost:8000\n` +
          `evalview snapshot tests/generated --approve-generated\n` +
          `evalview check --json --fail-on REGRESSION\n` +
          `evalview ci comment --results tests/generated/generated.report.json`,
      },
      {
        heading: 'Works especially well for',
        bullets: [
          'LangGraph agents',
          'MCP servers and MCP-based agents',
          'generic HTTP agents',
          'tool-calling assistants',
          'teams shipping agent changes through GitHub Actions',
        ],
      },
    ],
  },
  '/ai-agent-regression-testing': {
    slug: '/ai-agent-regression-testing',
    title: 'AI Agent Regression Testing | EvalView',
    description: 'AI agent regression testing with EvalView. Generate tests, snapshot agent behavior, diff tool paths, and stop broken agent changes before production.',
    eyebrow: 'Guide',
    headline: 'AI Agent Regression Testing',
    intro: 'Regression testing for AI agents is not just output scoring. It is verifying that tool use, turn sequence, safety boundaries, latency, and cost still behave the way your team approved.',
    sections: [
      {
        heading: 'What should be regression-tested',
        bullets: [
          'tool usage and tool order',
          'multi-turn clarification flows',
          'refusal and safety behavior',
          'cost and latency drift',
          'final output shape for user-visible responses',
        ],
      },
      {
        heading: 'Why EvalView fits this workflow',
        bullets: [
          'golden baseline testing for agents',
          'draft suite generation from a URL or logs',
          'approval-gated snapshots before locking in expectations',
          'CI comments that surface behavior changes in pull requests',
        ],
      },
      {
        heading: 'Recommended commands',
        code: `evalview generate --agent http://localhost:8000\n` +
          `evalview snapshot tests/generated --approve-generated\n` +
          `evalview check tests/generated`,
      },
    ],
  },
  '/mcp-server-testing': {
    slug: '/mcp-server-testing',
    title: 'MCP Server Testing | EvalView',
    description: 'Test MCP servers and MCP-based agents with EvalView. Generate regression suites, verify tool usage, and catch tool contract drift before deployment.',
    eyebrow: 'Guide',
    headline: 'MCP Server Testing',
    intro: 'MCP servers introduce a clean tool contract, but that does not remove regression risk. You still need tests for tool discovery, tool choice, argument shape, safety boundaries, and multi-step behavior.',
    sections: [
      {
        heading: 'What teams need to catch',
        bullets: [
          'wrong tool selection',
          'tool argument drift',
          'forbidden tool usage in sensitive scenarios',
          'clarification turns before tool execution',
          'behavior changes after tool or prompt updates',
        ],
      },
      {
        heading: 'Why EvalView is a good fit',
        bullets: [
          'MCP-aware discovery for generation',
          'tool-path clustering into draft tests',
          'forbidden_tools contracts for safety-sensitive flows',
          'CI-friendly regression checks for MCP agents',
        ],
      },
    ],
  },
  '/langgraph-testing': {
    slug: '/langgraph-testing',
    title: 'LangGraph Testing in CI/CD | EvalView',
    description: 'Test LangGraph agents in CI/CD with EvalView. Generate draft suites, snapshot behavior, and catch graph, tool, and trajectory regressions before merge.',
    eyebrow: 'Guide',
    headline: 'LangGraph Testing in CI/CD',
    intro: 'LangGraph gives you stateful agent flows, but you still need a reliable way to verify graph behavior after prompt, model, tool, or node changes. EvalView gives you that regression loop.',
    sections: [
      {
        heading: 'What matters for LangGraph',
        bullets: [
          'state-driven multi-turn flows',
          'tool-node selection and sequence',
          'branching behavior and fallbacks',
          'user-visible output regressions',
          'cost and latency changes by run path',
        ],
      },
      {
        heading: 'Recommended workflow',
        bullets: [
          'generate a draft suite from the running agent',
          'review and approve snapshots',
          'run regression checks in GitHub Actions on every pull request',
        ],
      },
    ],
  },
  '/tool-calling-agent-testing': {
    slug: '/tool-calling-agent-testing',
    title: 'Tool-Calling Agent Testing | EvalView',
    description: 'Tool-calling agent testing with EvalView. Validate tool selection, tool order, safety contracts, and output regressions for multi-step AI agents.',
    eyebrow: 'Guide',
    headline: 'Tool-Calling Agent Testing',
    intro: 'The hardest agent bugs are often not in the final text. They are in the hidden trajectory: wrong tool, wrong order, missing clarification, or dangerous tool use in the wrong scenario.',
    sections: [
      {
        heading: 'What to assert',
        bullets: [
          'tool presence',
          'tool sequence',
          'forbidden tool usage',
          'clarification before action',
          'output checks only when the wording is stable enough to matter',
        ],
      },
      {
        heading: 'How EvalView helps',
        bullets: [
          'clusters behavior by tool path instead of treating every phrasing variation as a new test',
          'generates native YAML tests from live probing or logs',
          'turns approved behavior into a regression gate in CI/CD',
        ],
      },
    ],
  },
};
