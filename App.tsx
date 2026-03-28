import React, { useState } from 'react';
import { useGitHubReleases } from './hooks/useGitHubReleases';
import { useNavigation } from './hooks/router';
import { 
  Github, 
  Copy, 
  Check, 
  Zap, 
  Search, 
  ShieldAlert, 
  BarChart3, 
  Clock, 
  GitBranch, 
  FileJson, 
  PlayCircle,
  Layers,
  Activity,
  Code2,
  Lock,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Globe,
  Database,
  Server,
  Shield,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  Users,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Calendar,
  Tag,
  Rocket,
  Bug,
  Wrench,
  FlaskConical,
  GitPullRequest,
  LineChart,
  MessageCircle,
  Repeat,
  Eye,
  Sparkle,
  TestTube2,
  Cpu,
  Star
} from 'lucide-react';
import Terminal from './components/Terminal';
import WaitlistForm from './components/WaitlistForm';
import CodeBlock from './components/CodeBlock';
import { usePageMetadata } from './hooks/usePageMetadata';

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { releases, latestVersion, starCount, loading: releasesLoading } = useGitHubReleases();
  const { navigate } = useNavigation();

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install evalview');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  usePageMetadata({
    title: 'EvalView – pytest for AI Agents | Open Source Agent Testing Framework',
    description: 'EvalView provides regression guardrails for agents. Generate tests, snapshot behavior, and catch silent regressions in CI before they hit production.',
    path: '/',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'EvalView',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        description:
          'Regression guardrails for agents. Generate tests, snapshot behavior, detect regressions, and gate agent changes in CI/CD.',
        url: 'https://evalview.com',
        downloadUrl: 'https://pypi.org/project/evalview/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  });

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 text-slate-300">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" alt="EvalView" className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            <span className="font-bold text-lg tracking-tight text-white">EvalView</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('roadmap')} 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
            >
              Cloud Roadmap
            </button>
             <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('changelog')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
            >
              Changelog
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
            >
              Blog
            </button>
            <a href="https://github.com/hidai25/eval-view" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
              {starCount > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {starCount >= 1000 ? `${(starCount / 1000).toFixed(1)}k` : starCount}
                </span>
              )}
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/10 transition-all backdrop-blur-sm group"
            >
              <span>Join Cloud Waitlist</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Hero Left Content */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {releasesLoading ? 'Loading...' : `v${latestVersion || '0.3.1'} Public Beta`}
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                pytest for <br/>
                <span className="gradient-text">AI agents</span>
              </h1>
              
              <p className="text-lg text-slate-400 mb-6 max-w-xl leading-relaxed">
                The complete open-source testing framework for multi-step agents. 
                Catch hallucinations, regressions, and cost spikes before production.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-300 mb-8">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> 9+ Framework Support</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Comprehensive Evaluation</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> 100% Open Source</span>
              </div>
              
              <div className="w-full flex flex-col gap-8">
                {/* Primary Action: Install (For Devs) */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleCopy}
                    className="group relative flex items-center gap-3 bg-white/5 hover:bg-white/10 text-slate-200 pl-4 pr-5 py-3 rounded-lg border border-white/10 transition-all font-mono text-sm shadow-xl hover:border-cyan-500/30 cursor-pointer"
                  >
                    <span className="text-slate-500">$</span>
                    <span>pip install evalview</span>
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />}
                  </button>
                  
                  <a
                    href="https://github.com/hidai25/eval-view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  >
                    <Star className="w-5 h-5" />
                    Star on GitHub
                    {starCount > 0 && (
                      <span className="ml-1 px-2 py-0.5 rounded-full bg-black/10 text-xs font-bold">
                        {starCount >= 1000 ? `${(starCount / 1000).toFixed(1)}k` : starCount}
                      </span>
                    )}
                  </a>
                </div>

                {/* Secondary Action: Cloud Waitlist (Conversion Focus) */}
                <div className="w-full pt-6 border-t border-white/5">
                  <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    EvalView Cloud is coming soon
                  </h3>
                  <WaitlistForm variant="hero" />
                </div>
              </div>
            </div>
            
            {/* Hero Right Visual */}
            <div className="relative group animate-float">
               {/* Decorative Glow */}
               <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
               <Terminal />
               
               {/* Badge */}
               <div className="absolute -right-4 top-10 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-lg shadow-xl hidden lg:block animate-pulse-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Status</div>
                      <div className="text-sm font-bold text-white">Tests Passed</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Supported Frameworks */}
        <section className="py-10 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 overflow-hidden">
             <p className="text-center text-sm text-slate-500 mb-6 uppercase tracking-widest">Works with your favorite frameworks</p>
             <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12 opacity-60 hover:opacity-100 transition-all duration-700">
                {['LangGraph', 'CrewAI', 'OpenAI', 'Anthropic', 'AutoGen', 'Dify', 'LangServe', 'Ollama', 'Claude Code'].map(brand => (
                  <span key={brand} className="text-base md:text-lg font-bold font-sans tracking-tight text-white cursor-default hover:text-cyan-400 transition-colors">
                    {brand}
                  </span>
                ))}
             </div>
          </div>
        </section>

        {/* Why EvalView? (Positioning) */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why EvalView vs Tracing-Only Tools?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Regression guardrails for agents, not just dashboards after something already changed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-8 rounded-2xl border-l-4 border-l-cyan-500">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">vs. LangSmith</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>100% Open Source (Apache 2.0)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>More built-in evaluators</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Security-first (run locally)</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate('/vs/langsmith')}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Read comparison
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="glass-card p-8 rounded-2xl border-l-4 border-l-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">vs. Langfuse</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Regression gating, not just monitoring</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Generate a suite from a URL or logs</span>
                  </li>
                   <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Golden baselines for tool-calling agents</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate('/vs/langfuse')}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Read comparison
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="glass-card p-8 rounded-2xl border-l-4 border-l-purple-500">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">vs. Braintrust & DeepEval</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Regression testing, not just scoring</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Trajectory and tool-path diffs</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Approval-gated draft suite generation</span>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/vs/braintrust')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Braintrust
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/vs/deepeval')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    DeepEval
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => navigate('/ai-agent-testing-ci-cd')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors bg-transparent border-none cursor-pointer"
              >
                Read the AI agent testing in CI/CD guide
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="py-18 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Search Guides</h2>
                <p className="text-slate-400 max-w-2xl">
                  These are the pages people actually search for when they are trying to test and ship AI agents safely.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: 'AI Agent Regression Testing',
                  path: '/ai-agent-regression-testing',
                  body: 'How to snapshot behavior, diff trajectories, and stop broken agent changes before production.',
                },
                {
                  title: 'MCP Server Testing',
                  path: '/mcp-server-testing',
                  body: 'How to test MCP tools, tool choice, tool arguments, and safety contracts.',
                },
                {
                  title: 'LangGraph Testing',
                  path: '/langgraph-testing',
                  body: 'How to regression-test LangGraph flows in CI/CD after graph and prompt changes.',
                },
                {
                  title: 'Tool-Calling Agent Testing',
                  path: '/tool-calling-agent-testing',
                  body: 'How to verify tool presence, tool order, and safe multi-step agent behavior.',
                },
              ].map((guide) => (
                <button
                  key={guide.path}
                  onClick={() => navigate(guide.path)}
                  className="text-left glass-card p-6 rounded-2xl border border-white/6 hover:border-cyan-500/25 transition-all cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-white mb-3">{guide.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{guide.body}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                    Read guide
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Features Grid (Categorized) */}
        <section id="features" className="py-24 scroll-mt-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Regression Guardrails for Agents</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Feature Group 1: Testing & Evaluation */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400"><Search className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Testing & Evaluation</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "YAML-based test definitions",
                    "Weighted scoring (tool, output, sequence)",
                    "LLM-as-judge with custom prompts",
                    "Sequence matching (exact/subsequence/unordered)",
                    "Output validation (contains, JSON schema)",
                    "Hallucination & safety detection"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 2: Test Generation & Coverage */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400"><FlaskConical className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Test Generation & Coverage</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "Auto-generate 100+ test variations",
                    "Interactive recording mode",
                    "Behavior coverage tracking",
                    "Tasks, tools & paths metrics",
                    "Edge case & boundary testing",
                    "Expand 5 tests → 500 tests"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 3: Statistical & Reliability */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400"><LineChart className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Statistical & Reliability</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "Multiple runs per test (--runs N)",
                    "pass@k & pass^k metrics",
                    "Flaky test detection & handling",
                    "Configurable pass rates",
                    "Mean, std dev, percentiles",
                    "Confidence intervals"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 4: Regression & Baselines */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400"><GitPullRequest className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Regression & Baselines</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "Golden baseline management",
                    "Save, annotate & compare baselines",
                    "Regression status detection",
                    "Configurable strictness levels",
                    "Tool & output change detection",
                    "Block deployments on regression"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 5: CI/CD & Automation */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400"><Repeat className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">CI/CD & Automation</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "GitHub Actions integration",
                    "GitLab CI & CircleCI support",
                    "Configurable failure thresholds",
                    "Automatic retries",
                    "Parallel test execution",
                    "HTML & JSON reports"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 6: Tracing & Observability */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400"><Eye className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Tracing & Observability</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "Full E2E trace capture",
                    "Span types: Agent, LLM, Tool, HTTP",
                    "Token & cost attribution per step",
                    "Latency measurement",
                    "Privacy controls & auto-redaction",
                    "JSONL export format"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 7: Developer Experience */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400"><Code2 className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Developer Experience</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "Auto-connect to any framework",
                    "Interactive chat mode (natural language)",
                    "Watch mode for rapid iteration",
                    "Verbose debugging & diagnostics",
                    "Demo mode (no API key needed)",
                    "Quickstart wizard"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 8: Security & Safety */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400"><Shield className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Security & Safety</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "SSRF protection (blocks private IPs)",
                    "PII detection",
                    "Prompt injection mitigation",
                    "Content moderation checks",
                    "Hallucination detection",
                    "Output sanitization"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 9: Cost & Performance */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400"><CreditCard className="w-5 h-5" /></div>
                  <h3 className="text-lg font-bold text-white">Cost & Performance</h3>
                </div>
                <ul className="grid gap-3">
                  {[
                    "Token usage tracking (in/out/cached)",
                    "Per-step cost attribution",
                    "Built-in model pricing",
                    "max_cost threshold enforcement",
                    "Latency budgets (max_latency)",
                    "Offline eval with Ollama (free)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Code Example: Dev Experience */}
        <section className="py-24 bg-[#020617] border-y border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <CodeBlock />
              {/* Decoration behind code block */}
              <div className="absolute -z-10 -left-10 top-1/2 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                 <Code2 className="w-3 h-3" />
                 Developer Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                YAML Test Cases That Act as Documentation
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Define your test cases in simple YAML. No complex boilerplate. Just inputs, expected outputs, and success criteria that anyone on the team can read.
              </p>
              
              <div className="space-y-4">
                {[
                  "Declarative syntax meant for both engineers and PMs",
                  "Support for fuzzy matching and semantic similarity",
                  "Define explicit thresholds for cost ($) and latency (ms)"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap / Cloud Platform */}
        <section id="roadmap" className="py-24 px-4 scroll-mt-24 relative overflow-hidden">
          {/* Subtle background glow for this section */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
             
             {/* Section Header */}
             <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
                 <Sparkles className="w-3 h-3" />
                 Coming Q1 2026
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Agent Monitoring & CI Integration</h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                 Your agents are failing in production. You find out from users. <br className="hidden md:block"/>
                 With <span className="text-white font-medium">EvalView Cloud</span>, you see failures in real-time and fix them before users notice.
               </p>
             </div>

             {/* Pain Points Grid */}
             <div className="grid lg:grid-cols-3 gap-8 mb-20">
                
                {/* Pain Point 1 */}
                <div className="glass-card p-8 rounded-2xl flex flex-col relative group">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">"You're the Last to Know"</h3>
                  
                  <div className="mb-6 space-y-3">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">The Problem</p>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> User reports "Wrong answer"</div>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> Can't reproduce locally</div>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> Hours wasted debugging</div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">With EvalView Cloud</p>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Real-time production dashboard</div>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Instant Slack/Email alerts</div>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> 1-click local replay</div>
                  </div>
                </div>

                {/* Pain Point 2 */}
                <div className="glass-card p-8 rounded-2xl flex flex-col relative group">
                   <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Cost Spikes</h3>
                  
                  <div className="mb-6 space-y-3">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">The Problem</p>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> Sudden $500/day spikes</div>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> Find out at end of month</div>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> Unknown root cause</div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">With EvalView Cloud</p>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Real-time cost dashboard</div>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Smart Budget Alerts</div>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> AI Optimization tips</div>
                  </div>
                </div>

                {/* Pain Point 3 */}
                <div className="glass-card p-8 rounded-2xl flex flex-col relative group">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Team Fragmentation</h3>
                  
                  <div className="mb-6 space-y-3">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">The Problem</p>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> Weeks building eval infra</div>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> "Works on my machine" hell</div>
                    <div className="flex gap-2 text-sm text-slate-400"><XCircle className="w-4 h-4 text-red-500/50 shrink-0"/> No shared context</div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">With EvalView Cloud</p>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Zero-config infrastructure</div>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Unified Team Dashboard</div>
                    <div className="flex gap-2 text-sm text-white"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/> Collaborative Debugging</div>
                  </div>
                </div>

             </div>

             {/* Waitlist CTA Area */}
             <div className="max-w-3xl mx-auto text-center bg-gradient-to-b from-blue-900/20 to-transparent p-8 md:p-12 rounded-3xl border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Don't wait for users to report bugs.</h3>
                <p className="text-slate-400 mb-8">Join the waitlist to get early access to EvalView Cloud in Q1 2026.</p>
                <WaitlistForm variant="footer" />
             </div>

          </div>
        </section>

        {/* Pricing Preview */}
        <section id="pricing" className="py-24 px-4 scroll-mt-24 bg-white/[0.02]">
           <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing</h2>
               <p className="text-slate-400">Open source forever. Cloud for teams.</p>
             </div>

             <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* OSS */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-emerald-500 flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-2">Open Source</h3>
                   <p className="text-3xl font-bold text-emerald-400 mb-4">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></p>
                   <p className="text-sm text-slate-400 mb-6 flex-grow">Everything you need to test AI agents locally.</p>
                   <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> All CLI features</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> Unlimited local tests</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> 7+ framework adapters</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> SQLite regression tracking</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> Community support</li>
                   </ul>
                   <button onClick={handleCopy} className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
                      Install Now
                   </button>
                </div>

                {/* Cloud */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-cyan-500 relative flex flex-col">
                   <div className="absolute top-0 right-0 bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">COMING Q1 2026</div>
                   <h3 className="text-xl font-bold text-white mb-2">EvalView Cloud</h3>
                   <p className="text-3xl font-bold text-white mb-4">Coming Soon</p>
                   <p className="text-sm text-slate-400 mb-6 flex-grow">Team collaboration & production monitoring.</p>
                   <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> Real-time dashboards</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> Team collaboration</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> Slack/Email alerts</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> Production monitoring</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> Early access pricing for waitlist</li>
                   </ul>
                   <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors">
                      Join Waitlist for Early Pricing
                   </button>
                </div>
             </div>
           </div>
        </section>

        {/* Changelog Section */}
        <section id="changelog" className="py-24 px-4 scroll-mt-24 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
                <Calendar className="w-3 h-3" />
                Release Notes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Changelog</h2>
              <p className="text-slate-400">Stay up to date with the latest improvements and features.</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />

              {/* Loading state */}
              {releasesLoading && (
                <div className="relative pl-8 md:pl-20 pb-12">
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-600 border-4 border-black animate-pulse" />
                  <div className="glass-card rounded-2xl p-6 md:p-8">
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-slate-700 rounded w-32"></div>
                      <div className="h-4 bg-slate-700 rounded w-48"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-700 rounded w-full"></div>
                        <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic releases from GitHub */}
              {!releasesLoading && releases.map((release, index) => {
                const isLatest = index === 0;
                const hasContent = release.features.length > 0 || release.improvements.length > 0 || release.bugFixes.length > 0 || release.other.length > 0;

                return (
                  <div key={release.version} className="relative pl-8 md:pl-20 pb-12">
                    <div className={`absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black ${isLatest ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-blue-500'}`} />
                    <div className="glass-card rounded-2xl p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <a
                          href={release.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold transition-colors ${isLatest ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20'}`}
                        >
                          <Tag className="w-3 h-3" />
                          v{release.version}
                        </a>
                        <span className="text-slate-500 text-sm">{release.date}</span>
                        {isLatest && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">Latest</span>
                        )}
                        {release.isPrerelease && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">Pre-release</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{release.title}</h3>

                      {hasContent ? (
                        <div className="space-y-4">
                          {release.features.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-2">
                                <Rocket className="w-4 h-4" />
                                New Features
                              </div>
                              <ul className="space-y-2 text-sm text-slate-300">
                                {release.features.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-slate-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {release.improvements.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 mb-2">
                                <Wrench className="w-4 h-4" />
                                Improvements
                              </div>
                              <ul className="space-y-2 text-sm text-slate-300">
                                {release.improvements.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-slate-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {release.bugFixes.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 mb-2">
                                <Bug className="w-4 h-4" />
                                Bug Fixes
                              </div>
                              <ul className="space-y-2 text-sm text-slate-300">
                                {release.bugFixes.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-slate-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {release.other.length > 0 && release.features.length === 0 && release.improvements.length === 0 && release.bugFixes.length === 0 && (
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Changes
                              </div>
                              <ul className="space-y-2 text-sm text-slate-300">
                                {release.other.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-slate-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">See the <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">release notes on GitHub</a> for details.</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Empty state */}
              {!releasesLoading && releases.length === 0 && (
                <div className="relative pl-8 md:pl-20 pb-12">
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-600 border-4 border-black" />
                  <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
                    <p className="text-slate-400">No releases found. Check out our <a href="https://github.com/hidai25/eval-view/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub releases page</a>.</p>
                  </div>
                </div>
              )}

              {/* More coming soon indicator */}
              <div className="relative pl-8 md:pl-20">
                <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-700 border-4 border-black" />
                <div className="text-slate-500 text-sm">
                  More updates coming soon...
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <img src="/logo.png" alt="EvalView" className="w-6 h-6" />
            <span className="font-bold text-white">EvalView</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <a href="https://github.com/hidai25/eval-view" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://github.com/hidai25/eval-view#readme" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a>
            <button onClick={() => scrollToSection('changelog')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-sm text-slate-500">Changelog</button>
            <a href="https://x.com/Hidai_barmor" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-sm text-slate-500">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-sm text-slate-500">Terms</button>
          </div>

          <div className="text-sm text-slate-600">
            <p>© 2026 EvalView. Apache 2.0 License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
