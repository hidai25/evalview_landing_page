import React, { useState } from 'react';
import { useGitHubReleases } from './hooks/useGitHubReleases';
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
  Wrench
} from 'lucide-react';
import Terminal from './components/Terminal';
import WaitlistForm from './components/WaitlistForm';
import CodeBlock from './components/CodeBlock';

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { releases, latestVersion, loading: releasesLoading } = useGitHubReleases();

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
            <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">🧪</span>
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
            <a href="https://github.com/hidai25/EvalView" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
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
                {releasesLoading ? 'Loading...' : `v${latestVersion || '0.2.4'} Public Beta`}
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
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> 7+ Framework Support</span>
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
                    href="https://github.com/hidai25/EvalView"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  >
                    <Github className="w-5 h-5" />
                    Star on GitHub
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
             <div className="flex items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-700">
                {['LangGraph', 'CrewAI', 'OpenAI', 'Anthropic', 'AutoGen', 'Dify'].map(brand => (
                  <span key={brand} className="text-lg md:text-xl font-bold font-sans tracking-tight text-white cursor-default hover:text-cyan-400 transition-colors">
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
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why EvalView?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Production-ready, open-source testing with comprehensive evaluation.
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
              </div>

              <div className="glass-card p-8 rounded-2xl border-l-4 border-l-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">vs. AgentOps</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Comprehensive testing (not just monitoring)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Local-first architecture</span>
                  </li>
                   <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Regression prevention</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 rounded-2xl border-l-4 border-l-purple-500">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">vs. Others</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>7+ Framework adapters</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Zero-config auto-connect</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Advanced hallucination detection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Grid (Categorized) */}
        <section id="features" className="py-24 scroll-mt-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Complete Testing Suite</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Feature Group 1: Testing & Evaluation */}
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400"><Search className="w-6 h-6" /></div>
                  <h3 className="text-xl font-bold text-white">Testing & Evaluation</h3>
                </div>
                <ul className="grid gap-4">
                  {[
                    "YAML-based test cases",
                    "7 evaluation metrics (tool, sequence, cost, etc)",
                    "LLM-as-judge (Configurable)",
                    "Configurable scoring weights"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 2: Developer Experience */}
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400"><Code2 className="w-6 h-6" /></div>
                  <h3 className="text-xl font-bold text-white">Developer Experience</h3>
                </div>
                <ul className="grid gap-4">
                  {[
                    "Auto-connect to any framework",
                    "Parallel execution (8x faster)",
                    "Watch mode for rapid iteration",
                    "Rich console + HTML reports"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

               {/* Feature Group 3: Regression Tracking */}
               <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400"><Database className="w-6 h-6" /></div>
                  <h3 className="text-xl font-bold text-white">Regression Tracking</h3>
                </div>
                <ul className="grid gap-4">
                  {[
                    "SQLite database tracking",
                    "Baseline comparison",
                    "Automatic regression detection",
                    "Git integration"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Group 4: Security & Production */}
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-400"><Shield className="w-6 h-6" /></div>
                  <h3 className="text-xl font-bold text-white">Security & Production</h3>
                </div>
                <ul className="grid gap-4">
                  {[
                    "SSRF protection",
                    "PII detection",
                    "Retry logic",
                    "Cost tracking with token breakdown"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
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
                Tests that act as documentation
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
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stop Debugging in the Dark</h2>
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

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* OSS */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-emerald-500 flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-2">OSS</h3>
                   <p className="text-3xl font-bold text-emerald-400 mb-4">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></p>
                   <p className="text-sm text-slate-400 mb-6 flex-grow">For individual developers.</p>
                   <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> All CLI features</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> Unlimited local tests</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> SQLite tracking</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500"/> Community support</li>
                   </ul>
                   <button onClick={handleCopy} className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors">
                      Install Now
                   </button>
                </div>

                {/* Cloud Free */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-slate-500 flex flex-col opacity-75">
                   <h3 className="text-xl font-bold text-white mb-2">Cloud Free</h3>
                   <p className="text-3xl font-bold text-white mb-4">$0 <span className="text-sm font-normal text-slate-500">/ mo</span></p>
                   <p className="text-sm text-slate-400 mb-6 flex-grow">Coming Q1 2026.</p>
                   <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-slate-500"/> 1K traces/month</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-slate-500"/> Basic dashboard</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-slate-500"/> 7-day retention</li>
                   </ul>
                   <button disabled className="w-full py-2 rounded-lg bg-transparent border border-white/5 text-slate-500 text-sm font-medium cursor-not-allowed">
                      Waitlist Only
                   </button>
                </div>

                {/* Cloud Pro */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-cyan-500 relative flex flex-col">
                   <div className="absolute top-0 right-0 bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                   <h3 className="text-xl font-bold text-white mb-2">Cloud Pro</h3>
                   <p className="text-3xl font-bold text-white mb-4">$49 <span className="text-sm font-normal text-slate-500">/ mo</span></p>
                   <p className="text-sm text-slate-400 mb-6 flex-grow">For small teams.</p>
                   <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> 10K traces/month</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> 5 users</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-cyan-500"/> Alerting integrations</li>
                   </ul>
                   <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors">
                      Join Waitlist
                   </button>
                </div>

                {/* Cloud Team */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-blue-500 flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-2">Cloud Team</h3>
                   <p className="text-3xl font-bold text-white mb-4">$199 <span className="text-sm font-normal text-slate-500">/ mo</span></p>
                   <p className="text-sm text-slate-400 mb-6 flex-grow">For scaling organizations.</p>
                   <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500"/> 100K traces/month</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500"/> Unlimited users</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500"/> SSO & RBAC</li>
                   </ul>
                   <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors">
                      Join Waitlist
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
                    <p className="text-slate-400">No releases found. Check out our <a href="https://github.com/hidai25/EvalView/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub releases page</a>.</p>
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
            <span className="text-xl">🧪</span>
            <span className="font-bold text-white">EvalView</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <a href="https://github.com/hidai25/EvalView" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <button onClick={() => scrollToSection('changelog')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-sm text-slate-500">Changelog</button>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <div className="text-sm text-slate-600">
            <p>© 2025 EvalView. Apache 2.0 License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;