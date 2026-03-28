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
    <p>If you are comparing EvalView vs LangSmith, the key distinction is simple: LangSmith is strongest for agent observability, debugging, prompt workflows, and the broader LangChain/LangGraph ecosystem. EvalView is strongest for regression testing: generate tests, snapshot agent behavior, diff tool paths, and block regressions in CI/CD.</p>
    <h2>Choose LangSmith when</h2>
    <ul>
      <li>you want trace collection and debugging dashboards for LLM calls</li>
      <li>you are already deep in LangChain or LangGraph and want tight integration</li>
      <li>you want a broader platform for prompt iteration, dataset management, and agent development</li>
      <li>you need production monitoring with trace-level visibility into every LLM call</li>
    </ul>
    <h2>Choose EvalView when</h2>
    <ul>
      <li>you need AI agent regression testing that catches silent behavior changes</li>
      <li>you want golden baseline testing — snapshot known-good behavior and diff against it</li>
      <li>you care about tool-call, sequence, output, cost, and latency diffs in a single report</li>
      <li>you want to generate a draft test suite from just an endpoint URL or traffic logs</li>
      <li>you want a lightweight CI gate that blocks broken agents before merge</li>
    </ul>
    <h2>Best fit together</h2>
    <p>Many teams use both tools. LangSmith handles observability and development traces — showing you what your agent did in production. EvalView handles regression gating — telling you whether your agent broke before it reaches production. They solve different problems in the agent lifecycle.</p>
    <h2>Key difference: observability vs testing</h2>
    <p>LangSmith answers "what happened?" after the fact. EvalView answers "did anything change?" before you ship. Normal tests catch crashes and tracing shows what happened after the fact. EvalView catches the harder class: the agent returns 200 OK but silently takes the wrong tool path, skips a clarification, or degrades output quality after a model update.</p>
    <h2>Feature comparison</h2>
    <ul>
      <li><strong>Golden baseline diffing</strong> — EvalView: Yes (core feature). LangSmith: No.</li>
      <li><strong>Tool-call and sequence regression detection</strong> — EvalView: Yes. LangSmith: No (traces only).</li>
      <li><strong>PR comments with regression alerts</strong> — EvalView: Yes. LangSmith: No.</li>
      <li><strong>Test generation from a live agent</strong> — EvalView: Yes. LangSmith: No.</li>
      <li><strong>Fully offline operation</strong> — EvalView: Yes (with Ollama). LangSmith: No (cloud-only).</li>
      <li><strong>Production trace observability</strong> — EvalView: No. LangSmith: Yes (core feature).</li>
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
    <p>The practical problem with AI agent testing in CI/CD is not just "does the output look okay?" It is "did my agent behavior change in a way that should block this merge?" EvalView is built for that workflow — it integrates with GitHub Actions, posts PR comments with regression alerts, and provides proper exit codes for CI gating.</p>
    <h2>What EvalView tests in CI</h2>
    <p>Every CI run checks six dimensions of agent behavior against the approved golden baseline:</p>
    <ul>
      <li><strong>tool calls</strong> — did the agent call the right tools?</li>
      <li><strong>tool sequence</strong> — did it call them in the right order?</li>
      <li><strong>output drift</strong> — did the response quality degrade?</li>
      <li><strong>cost changes</strong> — did token usage or API costs spike?</li>
      <li><strong>latency changes</strong> — did the agent slow down significantly?</li>
      <li><strong>safety contracts</strong> — did the agent use forbidden tools?</li>
    </ul>
    <h2>GitHub Actions setup</h2>
    <p>Add this workflow to your repository. It runs regression checks on every PR and push to main:</p>
    <pre><code># .github/workflows/evalview.yml
name: EvalView Regression Check
on: [pull_request, push]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for regressions
        uses: hidai25/eval-view@v0.6.0
        with:
          openai-api-key: $\{{ secrets.OPENAI_API_KEY }}
          fail-on: REGRESSION</code></pre>
    <h2>What PR comments show</h2>
    <p>When EvalView detects changes, it posts a detailed PR comment with cost spike alerts, latency spike alerts, model change detection, and a collapsible diff of all behavior changes. On clean runs it shows a simple PASSED summary. Comments are deduplicated — EvalView updates its existing comment instead of creating new ones on each push.</p>
    <h2>CI exit codes</h2>
    <p>EvalView provides proper exit codes for CI gating. Exit 0 means all tests passed. Exit 1 means regressions detected. The --fail-on flag controls which statuses block the pipeline:</p>
    <pre><code># Only fail on score regressions (default)
evalview check --fail-on REGRESSION

# Also fail on tool changes
evalview check --fail-on REGRESSION,TOOLS_CHANGED

# Fail on any change (strictest)
evalview check --strict</code></pre>
    <h2>Pre-push hooks</h2>
    <p>If you want regression blocking without CI setup, EvalView supports Git pre-push hooks:</p>
    <pre><code>evalview install-hooks    # Pre-push regression blocking</code></pre>
    <h2>Works with any CI system</h2>
    <ul>
      <li><strong>GitHub Actions</strong> — dedicated action with PR comments and job summaries</li>
      <li><strong>GitLab CI</strong> — use pip install evalview in your .gitlab-ci.yml</li>
      <li><strong>CircleCI</strong> — add evalview check as a test step</li>
      <li><strong>Any CI</strong> — EvalView is CLI-first, so it works anywhere Python runs</li>
    </ul>
    <p><a href="/ai-agent-regression-testing">AI Agent Regression Testing Guide</a> | <a href="/langgraph-testing">LangGraph Testing Guide</a> | <a href="/">Back to EvalView homepage</a></p>`,

  '/ai-agent-regression-testing': `
    <h1>AI Agent Regression Testing</h1>
    <p>Regression testing for AI agents is not just output scoring. It is verifying that tool use, turn sequence, safety boundaries, latency, and cost still behave the way your team approved. The hardest bugs are silent — the agent returns 200 OK but takes a completely different tool path.</p>
    <h2>What should be regression-tested</h2>
    <p>AI agent regression testing covers five critical dimensions that traditional tests miss:</p>
    <ul>
      <li><strong>tool usage and tool order</strong> — did the agent call lookup_order before process_refund?</li>
      <li><strong>multi-turn clarification flows</strong> — did the agent ask for the order number before acting?</li>
      <li><strong>refusal and safety behavior</strong> — did the agent refuse to delete data without confirmation?</li>
      <li><strong>cost and latency drift</strong> — did token usage spike after a model swap?</li>
      <li><strong>final output shape</strong> — did the user-visible response degrade in quality?</li>
    </ul>
    <h2>How golden baseline testing works</h2>
    <p>EvalView captures a snapshot of known-good agent behavior and automatically detects when future runs deviate. The first two scoring layers work without LLM-as-judge or API keys — pure deterministic tool-call and sequence comparison.</p>
    <pre><code># 1. Save current behavior as baseline
evalview snapshot

# 2. Make changes to your agent (prompt, model, tools)

# 3. Check for regressions
evalview check</code></pre>
    <h2>Four regression statuses</h2>
    <ul>
      <li><strong>PASSED</strong> — behavior matches the golden baseline. Ship with confidence.</li>
      <li><strong>TOOLS_CHANGED</strong> — the agent called different tools. Review the diff before deploying.</li>
      <li><strong>OUTPUT_CHANGED</strong> — same tools but different output. Review the diff.</li>
      <li><strong>REGRESSION</strong> — score dropped significantly. Fix before shipping.</li>
    </ul>
    <h2>Example regression output</h2>
    <pre><code>  ✓ login-flow           PASSED
  ⚠ refund-request       TOOLS_CHANGED
      - lookup_order → check_policy → process_refund
      + lookup_order → check_policy → process_refund → escalate_to_human
  ✗ billing-dispute      REGRESSION  -30 pts
      Score: 85 → 55  Output similarity: 35%</code></pre>
    <h2>Configurable strictness</h2>
    <pre><code># Default: fail only on score regressions
evalview check --fail-on REGRESSION

# Stricter: also fail on tool changes
evalview check --fail-on REGRESSION,TOOLS_CHANGED

# Strictest: fail on any change
evalview check --strict</code></pre>
    <h2>Why this matters</h2>
    <p>Normal tests catch crashes. Tracing shows what happened after the fact. EvalView catches the harder class: the agent returns 200 but silently takes the wrong tool path, skips a clarification, or degrades output quality after a model update. These silent regressions are the most dangerous because they look fine in logs but produce wrong results for users.</p>
    <p><a href="/ai-agent-testing-ci-cd">CI/CD Integration Guide</a> | <a href="/tool-calling-agent-testing">Tool-Calling Agent Testing</a> | <a href="/">Back to EvalView homepage</a></p>`,

  '/mcp-server-testing': `
    <h1>MCP Server Testing</h1>
    <p>When your AI agent depends on external MCP servers you do not control, those servers can change their tool definitions at any time — rename parameters, remove tools, add required fields. Your agent tests pass today and fail tomorrow. EvalView solves this with MCP contract testing.</p>
    <h2>The problem with external MCP servers</h2>
    <p>MCP servers introduce a clean tool contract, but that does not remove regression risk. When a server you depend on changes its interface, your agent breaks silently. Your tests still pass because your code did not change — but the server did.</p>
    <h2>MCP contract testing</h2>
    <p>EvalView captures a snapshot of a server's tool definitions and diffs against it on every CI run. If the interface changed, you know immediately — before running your full test suite.</p>
    <pre><code># 1. Snapshot a server's tool contract
evalview mcp snapshot "npx:@modelcontextprotocol/server-github" --name server-github

# 2. Check for interface drift
evalview mcp check server-github

# 3. Use in CI to abort before testing against broken interfaces
evalview run tests/ --contracts --fail-on "REGRESSION,CONTRACT_DRIFT"</code></pre>
    <h2>What contract drift looks like</h2>
    <pre><code>CONTRACT_DRIFT - 2 breaking change(s)
  REMOVED: create_pull_request - tool no longer available
  CHANGED: list_issues - new required parameter 'owner'</code></pre>
    <h2>Supported transport types</h2>
    <ul>
      <li><strong>stdio</strong> — npx:@modelcontextprotocol/server-filesystem /tmp</li>
      <li><strong>HTTP</strong> — http://localhost:8080</li>
      <li><strong>Command</strong> — stdio:python my_server.py</li>
    </ul>
    <h2>Agent behavior testing for MCP</h2>
    <p>Beyond contract testing, EvalView also tests the agent that uses MCP servers:</p>
    <ul>
      <li><strong>wrong tool selection</strong> — did the agent pick the right MCP tool?</li>
      <li><strong>tool argument drift</strong> — did the agent pass the correct parameters?</li>
      <li><strong>forbidden tool usage</strong> — did the agent use a dangerous tool in a sensitive scenario?</li>
      <li><strong>clarification turns</strong> — did the agent ask for missing info before calling a tool?</li>
      <li><strong>behavior changes after server updates</strong> — did a server update break your agent flow?</li>
    </ul>
    <h2>CLI reference</h2>
    <pre><code>evalview mcp snapshot &lt;endpoint&gt; --name &lt;name&gt;   # Capture contract
evalview mcp check &lt;name&gt;                         # Check for drift
evalview mcp list                                  # List contracts
evalview mcp show &lt;name&gt;                          # Show details
evalview mcp delete &lt;name&gt;                        # Remove contract</code></pre>
    <p><a href="/ai-agent-testing-ci-cd">CI/CD Integration Guide</a> | <a href="/tool-calling-agent-testing">Tool-Calling Agent Testing</a> | <a href="/">Back to EvalView homepage</a></p>`,

  '/langgraph-testing': `
    <h1>LangGraph Testing in CI/CD</h1>
    <p>LangGraph gives you stateful agent flows with graph-based orchestration, but you still need a reliable way to verify graph behavior after prompt, model, tool, or node changes. EvalView provides that regression loop with a dedicated LangGraph adapter featuring auto-detection, streaming support, and native thread tracking.</p>
    <h2>What matters for LangGraph agents</h2>
    <p>LangGraph agents have unique testing needs beyond simple input/output checks:</p>
    <ul>
      <li><strong>state-driven multi-turn flows</strong> — does the graph handle conversation state correctly?</li>
      <li><strong>tool-node selection and sequence</strong> — does the agent route to the right nodes?</li>
      <li><strong>branching behavior and fallbacks</strong> — do conditional edges fire correctly?</li>
      <li><strong>user-visible output regressions</strong> — does the final response degrade?</li>
      <li><strong>cost and latency changes by run path</strong> — does a specific graph path cost more after changes?</li>
    </ul>
    <h2>Quick start with LangGraph</h2>
    <p>EvalView auto-detects LangGraph agents. Start your agent server, then connect and test:</p>
    <pre><code># Start your LangGraph agent
uvicorn main:app --reload --port 8000

# Connect EvalView (auto-detects LangGraph)
evalview connect --endpoint http://localhost:8000/api/chat

# Generate tests from the running agent
evalview generate

# Snapshot approved behavior
evalview snapshot tests/generated --approve-generated

# Check for regressions
evalview check tests/generated</code></pre>
    <h2>CI integration for LangGraph</h2>
    <p>Add regression checks to your CI pipeline so every PR is validated:</p>
    <pre><code>- name: Check for regressions
  uses: hidai25/eval-view@v0.6.0
  with:
    openai-api-key: $\{{ secrets.OPENAI_API_KEY }}
    fail-on: REGRESSION</code></pre>
    <h2>Multi-turn test cases for LangGraph</h2>
    <p>Multi-turn tests are especially useful for LangGraph because they verify state management across conversation turns:</p>
    <pre><code>name: refund-needs-order-number
turns:
  - query: "I want a refund"
    expected:
      output:
        contains: ["order number"]
  - query: "Order 4812"
    expected:
      tools: ["lookup_order", "check_policy"]
      forbidden_tools: ["delete_order"]
      output:
        contains: ["refund", "processed"]</code></pre>
    <h2>Troubleshooting</h2>
    <ul>
      <li><strong>"Cannot connect to agent"</strong> — verify your server is running with curl and check the endpoint path</li>
      <li><strong>"Wrong endpoint"</strong> — update .evalview/config.yaml with the correct URL</li>
      <li><strong>"Tool names don't match"</strong> — run with --verbose to see actual API responses, then update YAML files</li>
    </ul>
    <p><a href="/ai-agent-testing-ci-cd">CI/CD Integration Guide</a> | <a href="/ai-agent-regression-testing">Regression Testing Guide</a> | <a href="/">Back to EvalView homepage</a></p>`,

  '/tool-calling-agent-testing': `
    <h1>Tool-Calling Agent Testing</h1>
    <p>The hardest agent bugs are not in the final text. They are in the hidden trajectory: wrong tool, wrong order, missing clarification, or dangerous tool use in the wrong scenario. EvalView tests the execution path, not just the output.</p>
    <h2>What to assert in tool-calling agents</h2>
    <ul>
      <li><strong>tool presence</strong> — did the agent call the expected tools?</li>
      <li><strong>tool sequence</strong> — did it call them in the right order?</li>
      <li><strong>forbidden tool usage</strong> — did the agent avoid dangerous tools in sensitive scenarios?</li>
      <li><strong>clarification before action</strong> — did the agent ask for missing info before executing?</li>
      <li><strong>output quality</strong> — did the final response make sense given the tools called?</li>
    </ul>
    <h2>Tool categories for flexible matching</h2>
    <p>Different agents use different tool names for the same action. EvalView's tool categories let you test by intent instead of exact tool name:</p>
    <pre><code># Brittle — fails if agent uses a different tool name
expected:
  tools:
    - read_file

# Flexible — passes for read_file, bash cat, text_editor, etc.
expected:
  categories:
    - file_read</code></pre>
    <h2>Built-in tool categories</h2>
    <ul>
      <li><strong>file_read</strong> — matches read_file, bash, text_editor, cat, view</li>
      <li><strong>file_write</strong> — matches write_file, bash, text_editor, edit_file</li>
      <li><strong>file_list</strong> — matches list_directory, bash, ls, find</li>
      <li><strong>search</strong> — matches grep, ripgrep, bash, search_files</li>
      <li><strong>shell</strong> — matches bash, shell, terminal, execute</li>
      <li><strong>web</strong> — matches web_search, browse, fetch_url, curl</li>
      <li><strong>git</strong> — matches git, bash, git_commit, git_push</li>
      <li><strong>python</strong> — matches python, bash, python_repl, execute_python</li>
    </ul>
    <h2>Custom categories</h2>
    <pre><code># .evalview/config.yaml
tool_categories:
  database:
    - postgres_query
    - mysql_execute
    - sql_run
  my_custom_api:
    - internal_api_call
    - legacy_endpoint</code></pre>
    <h2>Multi-turn testing</h2>
    <p>Many tool-calling agents require multi-turn conversations. EvalView evaluates each turn independently while giving the LLM judge full conversation context:</p>
    <pre><code>name: support-escalation
turns:
  - query: "My order is wrong"
    expected:
      tools: ["lookup_order"]
      output:
        contains: ["order number"]
  - query: "Order 4812"
    expected:
      tools: ["lookup_order", "check_policy"]
      forbidden_tools: ["delete_order", "issue_refund"]</code></pre>
    <h2>Generating tests from a live agent</h2>
    <pre><code># Generate from a running agent
evalview generate --agent http://localhost:8000

# Generate from traffic logs
evalview generate --from-log traffic.jsonl

# Capture a real conversation as a test
evalview capture --agent http://localhost:8000/invoke --multi-turn</code></pre>
    <p><a href="/ai-agent-regression-testing">Regression Testing Guide</a> | <a href="/mcp-server-testing">MCP Server Testing</a> | <a href="/">Back to EvalView homepage</a></p>`,

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
    <h2>Disclaimer of warranties</h2>
    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
    <h2>Limitation of liability</h2>
    <p>To the fullest extent permitted by law, EvalView and its maintainers are not liable for any indirect, incidental, special, or consequential damages arising from your use of the software or website. This includes but is not limited to damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.</p>
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
        softwareVersion: '0.6.0',
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
    ],
    founder: {
      '@type': 'Person',
      name: 'Hidai Bar-Mor',
      url: 'https://x.com/Hidai_barmor',
      sameAs: ['https://github.com/hidai25', 'https://x.com/Hidai_barmor'],
    },
    foundingDate: '2025',
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

function buildBreadcrumb(route) {
  const parts = route.path.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
  ];

  if (parts[0] === 'vs') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${SITE_URL}/vs` });
    items.push({ '@type': 'ListItem', position: 3, name: route.title.split(' | ')[0] });
  } else if (parts[0] === 'blog') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` });
    if (parts.length > 1) {
      items.push({ '@type': 'ListItem', position: 3, name: route.title.split(' | ')[0] });
    }
  } else if (['privacy', 'terms'].includes(parts[0])) {
    items.push({ '@type': 'ListItem', position: 2, name: route.title.split(' | ')[0] });
  } else {
    items.push({ '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/blog` });
    items.push({ '@type': 'ListItem', position: 3, name: route.title.split(' | ')[0] });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function buildArticleSchema(route) {
  // Add Article schema to guide pages (comparison pages and guides)
  const guidePaths = [
    '/ai-agent-testing-ci-cd',
    '/ai-agent-regression-testing',
    '/mcp-server-testing',
    '/langgraph-testing',
    '/tool-calling-agent-testing',
  ];
  const comparisonPaths = ['/vs/langsmith', '/vs/langfuse', '/vs/braintrust', '/vs/deepeval'];

  if (!guidePaths.includes(route.path) && !comparisonPaths.includes(route.path)) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: route.title.split(' | ')[0],
    description: route.description,
    url: `${SITE_URL}${route.path}`,
    image: OG_IMAGE,
    datePublished: '2026-03-01',
    dateModified: '2026-03-28',
    author: {
      '@type': 'Person',
      name: 'Hidai Bar-Mor',
      url: 'https://x.com/Hidai_barmor',
      sameAs: ['https://github.com/hidai25', 'https://x.com/Hidai_barmor'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'EvalView',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
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

  const schemas = [webpage, ...(route.structuredData || [])];

  // Add BreadcrumbList for subpages
  const breadcrumb = buildBreadcrumb(route);
  if (breadcrumb) schemas.push(breadcrumb);

  // Add Article schema for guide/comparison pages
  const article = buildArticleSchema(route);
  if (article) schemas.push(article);

  schemas.push(...globalSchemas);

  return schemas
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
