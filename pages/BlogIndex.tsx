import React from 'react';
import { Github, ArrowRight, Clock, Tag, Rss } from 'lucide-react';
import { blogPosts, getFeaturedPost, getNonFeaturedPosts } from '../data/blogPosts';
import { useNavigation } from '../hooks/router';

const BlogNavbar: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
        >
          <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">🧪</span>
          <span className="font-bold text-lg tracking-tight text-white">EvalView</span>
        </button>
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-cyan-400 hidden sm:block">Blog</span>
          <a
            href="/#features"
            onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Features
          </a>
          <a
            href="https://github.com/hidai25/EvalView"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            onClick={() => navigate('/')}
            className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/10 transition-all backdrop-blur-sm group cursor-pointer"
          >
            <span>Join Cloud Waitlist</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const colors: Record<string, string> = {
    Engineering: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    Observability: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    Tutorial: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  const cls = colors[category] ?? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {category}
    </span>
  );
};

const BlogIndex: React.FC = () => {
  const { navigate } = useNavigation();
  const featured = getFeaturedPost();
  const rest = getNonFeaturedPosts();

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 text-slate-300">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <BlogNavbar />

      <main className="relative z-10 pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Rss className="w-3 h-3" />
              EvalView Blog
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
            Thinking About<br />
            <span className="gradient-text">AI Agent Quality</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Engineering deep-dives, metrics playbooks, and practical guides for teams building reliable AI agents in production.
          </p>
        </section>

        {/* Featured Post */}
        {featured && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Featured</p>
            <button
              onClick={() => navigate(`/blog/${featured.slug}`)}
              className="w-full text-left glass-card rounded-2xl p-8 sm:p-10 cursor-pointer transition-all duration-300 group border border-white/6 hover:border-cyan-500/30"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
                {/* Left: visual accent */}
                <div className="hidden lg:flex w-48 flex-shrink-0 items-center justify-center rounded-xl h-40 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent border border-white/5 text-6xl select-none">
                  🔍
                </div>
                {/* Right: content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <CategoryBadge category={featured.category} />
                    {featured.tags.map((t) => (
                      <span key={t} className="text-xs text-slate-500 flex items-center gap-1">
                        <Tag className="w-3 h-3" />{t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{featured.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.readTime} min read
                      </span>
                      <span>{featured.author}</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-cyan-400 group-hover:gap-2.5 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">All Posts</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <button
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="text-left glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 group border border-white/6 hover:border-cyan-500/30 flex flex-col"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/5 flex items-center justify-center text-xl mb-4 select-none">
                  {post.category === 'Observability' ? '📊' : post.category === 'Tutorial' ? '⚡' : '🔧'}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <CategoryBadge category={post.category} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-cyan-500/10">
            <div className="text-4xl mb-4">🧪</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Test your AI agents like you test your code
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              EvalView is open-source and takes under 15 minutes to set up. Catch hallucinations, regressions,
              and cost spikes before production.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/hidai25/EvalView"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-200 px-5 py-3 rounded-lg border border-white/10 transition-all font-mono text-sm hover:border-cyan-500/30 cursor-pointer"
              >
                pip install evalview
              </a>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-5 py-3 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-sm font-semibold cursor-pointer"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none text-slate-500 hover:text-white transition-colors"
          >
            <span className="text-xl">🧪</span>
            <span className="font-semibold text-white">EvalView</span>
          </button>
          <p>© 2026 EvalView. Open source under Apache 2.0.</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/hidai25/EvalView" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-slate-500">Blog</button>
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-slate-500">Home</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogIndex;
