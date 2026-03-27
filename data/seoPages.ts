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
    intro: 'If you are comparing EvalView vs LangSmith, the key distinction is simple: LangSmith is strongest for agent observability, debugging, prompt workflows, and the broader LangChain/LangGraph ecosystem. EvalView is strongest for regression testing: generate tests, snapshot agent behavior, diff tool paths, and block regressions in CI/CD.',
    sections: [
      {
        heading: 'Choose LangSmith when',
        bullets: [
          'you want trace collection and debugging dashboards for LLM calls',
          'you are already deep in LangChain or LangGraph and want tight integration',
          'you want a broader platform for prompt iteration, dataset management, and agent development',
          'you need production monitoring with trace-level visibility into every LLM call',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'you need AI agent regression testing that catches silent behavior changes',
          'you want golden baseline testing — snapshot known-good behavior and diff against it',
          'you care about tool-call, sequence, output, cost, and latency diffs in a single report',
          'you want to generate a draft test suite from just an endpoint URL or traffic logs',
          'you want a lightweight CI gate that blocks broken agents before merge',
        ],
      },
      {
        heading: 'Best fit together',
        body: 'Many teams use both tools. LangSmith handles observability and development traces — showing you what your agent did in production. EvalView handles regression gating — telling you whether your agent broke before it reaches production. They solve different problems in the agent lifecycle.',
      },
      {
        heading: 'Key difference: observability vs testing',
        body: 'LangSmith answers "what happened?" after the fact. EvalView answers "did anything change?" before you ship. Normal tests catch crashes and tracing shows what happened after the fact. EvalView catches the harder class: the agent returns 200 OK but silently takes the wrong tool path, skips a clarification, or degrades output quality after a model update.',
      },
      {
        heading: 'EvalView workflow',
        body: 'EvalView is purpose-built for catching broken agent behavior before production. The core workflow takes three commands:',
        code: `# Generate tests from your running agent\nevalview generate --agent http://localhost:8000\n\n# Save current behavior as the approved baseline\nevalview snapshot tests/generated --approve-generated\n\n# On every PR, check for regressions\nevalview check tests/generated`,
      },
      {
        heading: 'Feature comparison',
        body: 'Here is how the two tools compare across key capabilities:',
        bullets: [
          'Golden baseline diffing — EvalView: Yes (core feature). LangSmith: No.',
          'Tool-call and sequence regression detection — EvalView: Yes. LangSmith: No (traces only).',
          'PR comments with regression alerts — EvalView: Yes (cost, latency, model change alerts). LangSmith: No.',
          'Test generation from a live agent — EvalView: Yes. LangSmith: No.',
          'Fully offline operation — EvalView: Yes (with Ollama). LangSmith: No (cloud-only).',
          'Production trace observability — EvalView: No. LangSmith: Yes (core feature).',
          'Prompt iteration and dataset management — EvalView: No. LangSmith: Yes.',
        ],
      },
    ],
  },
  '/vs/langfuse': {
    slug: '/vs/langfuse',
    title: 'EvalView vs Langfuse | Regression Testing vs LLM Observability',
    description: 'Compare EvalView vs Langfuse. Use Langfuse for LLM observability and metrics. Use EvalView for regression testing, golden baselines, and AI agent testing in CI/CD.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs Langfuse',
    intro: 'Langfuse is strongest as an open-source LLM observability platform with traces, metrics, and production dashboards. EvalView is strongest as a regression testing system that snapshots agent behavior and catches drift before shipping.',
    sections: [
      {
        heading: 'Choose Langfuse when',
        bullets: [
          'you want production-grade traces, dashboards, and metrics for LLM applications',
          'you want a broader open-source platform for LLM workflows and evaluation',
          'you want prompt and telemetry infrastructure across multiple apps and teams',
          'you need cost tracking and latency monitoring at the observability layer',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'you need regression testing for AI agents — not just observability',
          'you want to snapshot agent behavior and catch drift before shipping',
          'you care about tool-call and sequence diffs, not just output traces',
          'you want zero-traffic test generation from an agent URL or log file',
          'you want a CI gate that blocks broken agents in pull requests',
        ],
      },
      {
        heading: 'Key difference: monitoring vs gating',
        body: 'Langfuse tells you what happened in production — traces, costs, latency, user feedback. EvalView tells you what changed before production — tool paths, output quality, safety contracts. Langfuse is the dashboard you watch. EvalView is the gate that blocks broken deploys.',
      },
      {
        heading: 'Using both together',
        body: 'The two tools complement each other well. Use Langfuse to monitor production behavior and collect real-world traces. Use EvalView to turn those traces into regression tests that prevent future breakage. EvalView can generate test suites from traffic logs, which means Langfuse traces can feed EvalView test generation.',
      },
      {
        heading: 'EvalView regression workflow',
        code: `# Generate tests from your agent\nevalview generate --agent http://localhost:8000\n\n# Snapshot approved behavior\nevalview snapshot tests/generated --approve-generated\n\n# Gate every PR with regression checks\nevalview check --fail-on REGRESSION`,
      },
    ],
  },
  '/vs/braintrust': {
    slug: '/vs/braintrust',
    title: 'EvalView vs Braintrust | Agent Regression Testing vs Broader Evals',
    description: 'Compare EvalView vs Braintrust. Use Braintrust for broader eval workflows and scoring. Use EvalView for regression testing with golden baselines and CI gating.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs Braintrust',
    intro: 'Braintrust is strongest for broader evaluation workflows, experiment tracking, and scoring infrastructure. EvalView is strongest for regression testing with golden baselines and tool-path diffs that block broken agents in CI/CD.',
    sections: [
      {
        heading: 'Choose Braintrust when',
        bullets: [
          'you want a broader evaluation platform for experiments, datasets, and scorers',
          'you care about experiment tracking, data management, and scorer workflows',
          'you already have production traces and want to turn them into evaluation loops',
          'you want a platform that scales across multiple evaluation use cases',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'you need tool-calling agent testing that catches silent behavior changes',
          'you want golden baseline regression detection — did my agent break?',
          'you want to go from zero tests to a draft suite from just an endpoint or log file',
          'your main question is "did my agent break?" not "how good is my agent?"',
          'you want a free, open-source CLI that runs fully offline with Ollama',
        ],
      },
      {
        heading: 'Key difference: scoring vs regression detection',
        body: 'Braintrust scores agent quality — how good is the output? EvalView detects behavior changes — did the agent break? These are different questions. A high score does not mean the agent did not regress. EvalView catches the cases where the score looks fine but the tool path changed, a safety boundary was crossed, or costs spiked.',
      },
      {
        heading: 'Pricing comparison',
        body: 'Braintrust offers a cloud platform with free and paid tiers. EvalView is 100% free and open source under the Apache 2.0 license. Core regression detection requires no API keys. EvalView runs fully offline using Ollama for the LLM-as-judge layer.',
      },
      {
        heading: 'EvalView workflow',
        code: `# Generate tests from a live agent or logs\nevalview generate --agent http://localhost:8000\nevalview generate --from-log traffic.jsonl\n\n# Snapshot and gate in CI\nevalview snapshot tests/generated --approve-generated\nevalview check --fail-on REGRESSION`,
      },
    ],
  },
  '/vs/deepeval': {
    slug: '/vs/deepeval',
    title: 'EvalView vs DeepEval | Agent Behavior Regression vs Metric-First Evals',
    description: 'Compare EvalView vs DeepEval. Use DeepEval for metric-heavy output evaluation. Use EvalView for tool-using agent regression testing and behavior diffs in CI/CD.',
    eyebrow: 'Comparison',
    headline: 'EvalView vs DeepEval',
    intro: 'DeepEval is strongest as a metric-heavy LLM evaluation framework with built-in metrics for hallucination, faithfulness, and relevance. EvalView is strongest at regression testing agent behavior — especially tool use, sequence, and trajectory changes.',
    sections: [
      {
        heading: 'Choose DeepEval when',
        bullets: [
          'you want metric-first evaluation for outputs, RAG pipelines, hallucination, and safety',
          'you prefer a Python test framework feel with pytest integration',
          'your main problem is scoring outputs rather than diffing behavior paths',
          'you want built-in metrics like G-Eval, answer relevancy, and faithfulness',
        ],
      },
      {
        heading: 'Choose EvalView when',
        bullets: [
          'your agent uses tools and multi-step trajectories that need regression testing',
          'you need AI agent testing in CI/CD with PR comments and regression blocking',
          'you want golden baseline testing that diffs tool calls, sequence, cost, and latency',
          'you want to generate test suites from a live agent URL or traffic logs',
          'you need multi-turn conversation testing with per-turn evaluation',
        ],
      },
      {
        heading: 'Key difference: output metrics vs behavior diffs',
        body: 'DeepEval measures "how good is this output?" using metrics like hallucination score, faithfulness, and relevance. EvalView measures "did this agent change?" by diffing tool calls, parameters, sequence, output, cost, and latency against a known-good baseline. Both matter, but they answer fundamentally different questions.',
      },
      {
        heading: 'Four scoring layers in EvalView',
        body: 'EvalView uses four complementary scoring layers. The first two are free and work fully offline:',
        bullets: [
          'Tool calls + sequence — exact tool names, order, and parameters (free, offline)',
          'Code-based checks — regex, JSON schema, contains/not_contains assertions (free, offline)',
          'Semantic similarity — output meaning comparison via embeddings (~$0.00004/test)',
          'LLM-as-judge — output quality scored by GPT, Claude, Gemini, DeepSeek, or Ollama (~$0.01/test)',
        ],
      },
      {
        heading: 'EvalView workflow',
        code: `# Generate tests from your agent\nevalview generate --agent http://localhost:8000\n\n# Snapshot approved behavior as golden baseline\nevalview snapshot tests/generated --approve-generated\n\n# Check for regressions\nevalview check tests/generated --fail-on REGRESSION`,
      },
    ],
  },
  '/ai-agent-testing-ci-cd': {
    slug: '/ai-agent-testing-ci-cd',
    title: 'AI Agent Testing in CI/CD | EvalView',
    description: 'AI agent testing in CI/CD with EvalView. Generate tests, snapshot behavior, detect regressions, and block broken tool-calling agents before production.',
    eyebrow: 'Guide',
    headline: 'AI Agent Testing in CI/CD',
    intro: 'The practical problem with AI agent testing in CI/CD is not just "does the output look okay?" It is "did my agent behavior change in a way that should block this merge?" EvalView is built for that workflow — it integrates with GitHub Actions, posts PR comments with regression alerts, and provides proper exit codes for CI gating.',
    sections: [
      {
        heading: 'What EvalView tests in CI',
        body: 'Every CI run checks six dimensions of agent behavior against the approved golden baseline:',
        bullets: [
          'tool calls — did the agent call the right tools?',
          'tool sequence — did it call them in the right order?',
          'output drift — did the response quality degrade?',
          'cost changes — did token usage or API costs spike?',
          'latency changes — did the agent slow down significantly?',
          'safety contracts — did the agent use forbidden tools?',
        ],
      },
      {
        heading: 'GitHub Actions setup',
        body: 'Add this workflow to your repository. It runs regression checks on every PR and push to main:',
        code: `# .github/workflows/evalview.yml\nname: EvalView Regression Check\non: [pull_request, push]\n\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Check for regressions\n        id: evalview\n        uses: hidai25/eval-view@v0.6.0\n        with:\n          openai-api-key: \${{ secrets.OPENAI_API_KEY }}\n          fail-on: REGRESSION\n\n      - name: Post PR comment\n        if: github.event_name == 'pull_request' && always()\n        env:\n          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}\n        run: |\n          pip install evalview -q\n          evalview ci comment --results \${{ steps.evalview.outputs.results-file }}`,
      },
      {
        heading: 'What PR comments show',
        body: 'When EvalView detects changes, it posts a detailed PR comment with cost spike alerts, latency spike alerts, model change detection, and a collapsible diff of all behavior changes. On clean runs it shows a simple PASSED summary. Comments are deduplicated — EvalView updates its existing comment instead of creating new ones on each push.',
      },
      {
        heading: 'CI exit codes and JSON output',
        body: 'EvalView provides proper exit codes for CI gating. Exit 0 means all tests passed. Exit 1 means regressions detected. Use --json for machine-readable output that other CI steps can consume. The --fail-on flag controls which statuses block the pipeline:',
        code: `# Only fail on score regressions (default)\nevalview check --fail-on REGRESSION\n\n# Also fail on tool changes\nevalview check --fail-on REGRESSION,TOOLS_CHANGED\n\n# Fail on any change (strictest)\nevalview check --strict`,
      },
      {
        heading: 'Pre-push hooks (no CI config needed)',
        body: 'If you want regression blocking without CI setup, EvalView supports Git pre-push hooks. One command installs it:',
        code: `evalview install-hooks    # Pre-push regression blocking`,
      },
      {
        heading: 'Works with any CI system',
        body: 'While EvalView has a dedicated GitHub Action, it works with any CI system that runs Python. GitHub Actions, GitLab CI, CircleCI, Jenkins — any pipeline that can run pip install evalview and evalview check will work.',
        bullets: [
          'GitHub Actions — dedicated action with PR comments and job summaries',
          'GitLab CI — use pip install evalview in your .gitlab-ci.yml',
          'CircleCI — add evalview check as a test step',
          'Any CI — EvalView is CLI-first, so it works anywhere Python runs',
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
    intro: 'Regression testing for AI agents is not just output scoring. It is verifying that tool use, turn sequence, safety boundaries, latency, and cost still behave the way your team approved. The hardest bugs are silent — the agent returns 200 OK but takes a completely different tool path.',
    sections: [
      {
        heading: 'What should be regression-tested',
        body: 'AI agent regression testing covers five critical dimensions that traditional tests miss:',
        bullets: [
          'tool usage and tool order — did the agent call lookup_order before process_refund?',
          'multi-turn clarification flows — did the agent ask for the order number before acting?',
          'refusal and safety behavior — did the agent refuse to delete data without confirmation?',
          'cost and latency drift — did token usage spike after a model swap?',
          'final output shape — did the user-visible response degrade in quality?',
        ],
      },
      {
        heading: 'How golden baseline testing works',
        body: 'EvalView captures a snapshot of known-good agent behavior and automatically detects when future runs deviate. It works without LLM-as-judge or API keys for the first two scoring layers — pure deterministic tool-call and sequence comparison.',
        code: `# 1. Run your tests and save a baseline\nevalview snapshot\n\n# 2. Make changes to your agent (prompt, model, tools)\n\n# 3. Check for regressions\nevalview check`,
      },
      {
        heading: 'Four regression statuses',
        body: 'Every test produces one of four statuses:',
        bullets: [
          'PASSED — behavior matches the golden baseline. Ship with confidence.',
          'TOOLS_CHANGED — the agent called different tools. Review the diff before deploying.',
          'OUTPUT_CHANGED — same tools but different output. Review the diff.',
          'REGRESSION — score dropped significantly. Fix before shipping.',
        ],
      },
      {
        heading: 'Example regression output',
        code: `  ✓ login-flow           PASSED\n  ⚠ refund-request       TOOLS_CHANGED\n      - lookup_order → check_policy → process_refund\n      + lookup_order → check_policy → process_refund → escalate_to_human\n  ✗ billing-dispute      REGRESSION  -30 pts\n      Score: 85 → 55  Output similarity: 35%`,
      },
      {
        heading: 'Configurable strictness',
        body: 'You control how strict the regression gate is. Default mode only fails on score drops. Strict mode fails on any behavior change:',
        code: `# Default: fail only on score regressions\nevalview check --fail-on REGRESSION\n\n# Stricter: also fail on tool changes\nevalview check --fail-on REGRESSION,TOOLS_CHANGED\n\n# Strictest: fail on any change\nevalview check --strict`,
      },
      {
        heading: 'Why this matters',
        body: 'Normal tests catch crashes. Tracing shows what happened after the fact. EvalView catches the harder class: the agent returns 200 but silently takes the wrong tool path, skips a clarification, or degrades output quality after a model update. These silent regressions are the most dangerous because they look fine in logs but produce wrong results for users.',
      },
    ],
  },
  '/mcp-server-testing': {
    slug: '/mcp-server-testing',
    title: 'MCP Server Testing | EvalView',
    description: 'Test MCP servers and MCP-based agents with EvalView. Snapshot tool contracts, detect interface drift, and catch regressions before deployment.',
    eyebrow: 'Guide',
    headline: 'MCP Server Testing',
    intro: 'When your AI agent depends on external MCP servers you do not control, those servers can change their tool definitions at any time — rename parameters, remove tools, add required fields. Your agent tests pass today and fail tomorrow. EvalView solves this with MCP contract testing.',
    sections: [
      {
        heading: 'The problem with external MCP servers',
        body: 'MCP servers introduce a clean tool contract, but that does not remove regression risk. When a server you depend on changes its interface, your agent breaks silently. Your tests still pass because your code did not change — but the server did. EvalView detects this drift automatically.',
      },
      {
        heading: 'MCP contract testing',
        body: 'EvalView captures a snapshot of a server\'s tool definitions and diffs against it on every CI run. If the interface changed, you know immediately — before running your full test suite. This mirrors EvalView\'s golden baseline system: golden traces detect when your agent\'s behavior drifts, MCP contracts detect when an external server\'s interface drifts.',
        code: `# 1. Snapshot a server's tool contract\nevalview mcp snapshot "npx:@modelcontextprotocol/server-github" --name server-github\n\n# 2. Check for interface drift\nevalview mcp check server-github\n\n# 3. Use in CI to abort before testing against broken interfaces\nevalview run tests/ --contracts --fail-on "REGRESSION,CONTRACT_DRIFT"`,
      },
      {
        heading: 'What contract drift looks like',
        code: `CONTRACT_DRIFT - 2 breaking change(s)\n  REMOVED: create_pull_request - tool no longer available\n  CHANGED: list_issues - new required parameter 'owner'`,
      },
      {
        heading: 'Supported transport types',
        body: 'EvalView supports all MCP transport protocols:',
        bullets: [
          'stdio — npx:@modelcontextprotocol/server-filesystem /tmp',
          'HTTP — http://localhost:8080',
          'Command — stdio:python my_server.py',
        ],
      },
      {
        heading: 'Agent behavior testing for MCP',
        body: 'Beyond contract testing, EvalView also tests the agent that uses MCP servers. This covers tool selection, argument correctness, forbidden tool enforcement, and multi-step behavior:',
        bullets: [
          'wrong tool selection — did the agent pick the right MCP tool?',
          'tool argument drift — did the agent pass the correct parameters?',
          'forbidden tool usage — did the agent use a dangerous tool in a sensitive scenario?',
          'clarification turns — did the agent ask for missing info before calling a tool?',
          'behavior changes after server updates — did a server update break your agent flow?',
        ],
      },
      {
        heading: 'CLI reference',
        code: `evalview mcp snapshot <endpoint> --name <server-name>   # Capture contract\nevalview mcp check <name>                                # Check for drift\nevalview mcp list                                        # List contracts\nevalview mcp show <name>                                 # Show contract details\nevalview mcp delete <name>                               # Remove contract`,
      },
    ],
  },
  '/langgraph-testing': {
    slug: '/langgraph-testing',
    title: 'LangGraph Testing in CI/CD | EvalView',
    description: 'Test LangGraph agents in CI/CD with EvalView. Generate draft suites, snapshot behavior, and catch graph, tool, and trajectory regressions before merge.',
    eyebrow: 'Guide',
    headline: 'LangGraph Testing in CI/CD',
    intro: 'LangGraph gives you stateful agent flows with graph-based orchestration, but you still need a reliable way to verify graph behavior after prompt, model, tool, or node changes. EvalView provides that regression loop with a dedicated LangGraph adapter featuring auto-detection, streaming support, and native thread tracking.',
    sections: [
      {
        heading: 'What matters for LangGraph agents',
        body: 'LangGraph agents have unique testing needs beyond simple input/output checks:',
        bullets: [
          'state-driven multi-turn flows — does the graph handle conversation state correctly?',
          'tool-node selection and sequence — does the agent route to the right nodes?',
          'branching behavior and fallbacks — do conditional edges fire correctly?',
          'user-visible output regressions — does the final response degrade?',
          'cost and latency changes by run path — does a specific graph path cost more after changes?',
        ],
      },
      {
        heading: 'Quick start with LangGraph',
        body: 'EvalView auto-detects LangGraph agents. Start your agent server, then connect and test:',
        code: `# Start your LangGraph agent\nuvicorn main:app --reload --port 8000\n\n# Connect EvalView (auto-detects LangGraph)\nevalview connect --endpoint http://localhost:8000/api/chat\n\n# Generate tests from the running agent\nevalview generate\n\n# Snapshot approved behavior\nevalview snapshot tests/generated --approve-generated\n\n# Check for regressions\nevalview check tests/generated`,
      },
      {
        heading: 'CI integration for LangGraph',
        body: 'Add regression checks to your CI pipeline so every PR is validated:',
        code: `# .github/workflows/evalview.yml\n- name: Check for regressions\n  uses: hidai25/eval-view@v0.6.0\n  with:\n    openai-api-key: \${{ secrets.OPENAI_API_KEY }}\n    fail-on: REGRESSION`,
      },
      {
        heading: 'Writing test cases for LangGraph',
        body: 'EvalView test cases are YAML files. For LangGraph agents, multi-turn tests are especially useful because they verify state management across conversation turns:',
        code: `name: refund-needs-order-number\nturns:\n  - query: "I want a refund"\n    expected:\n      output:\n        contains: ["order number"]\n  - query: "Order 4812"\n    expected:\n      tools: ["lookup_order", "check_policy"]\n      forbidden_tools: ["delete_order"]\n      output:\n        contains: ["refund", "processed"]`,
      },
      {
        heading: 'Troubleshooting',
        body: 'Common issues when testing LangGraph agents:',
        bullets: [
          '"Cannot connect to agent" — verify your server is running with curl and check the endpoint path',
          '"Wrong endpoint" — update .evalview/config.yaml with the correct URL',
          '"Tool names don\'t match" — run with --verbose to see actual API responses, then update YAML files',
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
    intro: 'The hardest agent bugs are not in the final text. They are in the hidden trajectory: wrong tool, wrong order, missing clarification, or dangerous tool use in the wrong scenario. EvalView tests the execution path, not just the output.',
    sections: [
      {
        heading: 'What to assert in tool-calling agents',
        body: 'Effective tool-calling agent testing covers five areas:',
        bullets: [
          'tool presence — did the agent call the expected tools?',
          'tool sequence — did it call them in the right order?',
          'forbidden tool usage — did the agent avoid dangerous tools in sensitive scenarios?',
          'clarification before action — did the agent ask for missing info before executing?',
          'output quality — did the final response make sense given the tools called?',
        ],
      },
      {
        heading: 'Tool categories for flexible matching',
        body: 'Different agents use different tool names for the same action. Your test expects read_file, but the agent uses bash cat. EvalView\'s tool categories let you test by intent instead of exact tool name:',
        code: `# Brittle — fails if agent uses a different tool name\nexpected:\n  tools:\n    - read_file\n\n# Flexible — passes for read_file, bash cat, text_editor, etc.\nexpected:\n  categories:\n    - file_read`,
      },
      {
        heading: 'Built-in tool categories',
        body: 'EvalView ships with categories for common operations:',
        bullets: [
          'file_read — matches read_file, bash, text_editor, cat, view, str_replace_editor',
          'file_write — matches write_file, bash, text_editor, edit_file, create_file',
          'file_list — matches list_directory, bash, ls, find, directory_tree',
          'search — matches grep, ripgrep, bash, search_files, code_search',
          'shell — matches bash, shell, terminal, execute, run_command',
          'web — matches web_search, browse, fetch_url, http_request, curl',
          'git — matches git, bash, git_commit, git_push, github',
          'python — matches python, bash, python_repl, execute_python, jupyter',
        ],
      },
      {
        heading: 'Custom categories',
        body: 'Add project-specific categories in your config:',
        code: `# .evalview/config.yaml\ntool_categories:\n  database:\n    - postgres_query\n    - mysql_execute\n    - sql_run\n  my_custom_api:\n    - internal_api_call\n    - legacy_endpoint`,
      },
      {
        heading: 'Multi-turn testing for tool-calling agents',
        body: 'Many tool-calling agents require multi-turn conversations. EvalView evaluates each turn independently — tool usage, forbidden tools, and output content — while giving the LLM judge full conversation context:',
        code: `name: support-escalation\nturns:\n  - query: "My order is wrong"\n    expected:\n      tools: ["lookup_order"]\n      output:\n        contains: ["order number"]\n  - query: "Order 4812"\n    expected:\n      tools: ["lookup_order", "check_policy"]\n      forbidden_tools: ["delete_order", "issue_refund"]\n      output:\n        contains: ["let me check"]`,
      },
      {
        heading: 'Generating tests from a live agent',
        body: 'You do not need to write tests from scratch. EvalView can generate a test suite by probing your running agent or by analyzing traffic logs:',
        code: `# Generate from a running agent\nevalview generate --agent http://localhost:8000\n\n# Generate from traffic logs\nevalview generate --from-log traffic.jsonl\n\n# Capture a real conversation as a test\nevalview capture --agent http://localhost:8000/invoke --multi-turn`,
      },
    ],
  },
};
