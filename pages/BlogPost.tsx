import React, { useEffect, useState } from 'react';
import {
  Github,
  ArrowRight,
  ArrowLeft,
  Clock,
  Tag,
  Share2,
  Check,
  AlertTriangle,
  Info,
  Lightbulb,
} from 'lucide-react';
import { getBlogPost, blogPosts, InlineBlock } from '../data/blogPosts';
import { useNavigation } from '../hooks/router';
import { usePageMetadata } from '../hooks/usePageMetadata';

/* ─── Inline text renderer ─────────────────────────────────────── */
const renderInline = (text: string): React.ReactNode => {
  const parts = text.split(/(\[(?:[^\]]+)\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              {linkMatch[1]}
            </a>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded-md text-[0.85em] font-mono border border-slate-700"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i} className="text-slate-300 italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};

/* ─── Block renderer ────────────────────────────────────────────── */
const RenderBlock: React.FC<{ block: InlineBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 leading-snug">
          {block.text}
        </h2>
      ) : (
        <h3 className="text-xl font-bold text-white mt-8 mb-3 leading-snug">
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p className="text-slate-300 leading-relaxed text-[1.05rem] mb-5">
          {renderInline(block.text)}
        </p>
      );

    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-cyan-500/50">
          <p className="text-xl font-medium text-slate-200 leading-relaxed italic">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="block mt-2 text-sm text-slate-500 not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case 'list':
      return block.ordered ? (
        <ol className="list-decimal list-outside ml-6 space-y-3 mb-6 text-slate-300 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3 mb-6 text-slate-300 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'code': {
      const langColors: Record<string, string> = {
        yaml: 'text-yellow-400',
        bash: 'text-green-400',
        python: 'text-blue-400',
        typescript: 'text-cyan-400',
      };
      const color = langColors[block.language] ?? 'text-slate-400';
      return (
        <div className="my-6 rounded-xl overflow-hidden border border-white/8 bg-slate-900/70">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/3 border-b border-white/5">
            <span className="text-xs text-slate-400 font-mono">
              {block.filename ?? block.language}
            </span>
            <span className={`text-xs font-semibold font-mono uppercase tracking-wide ${color}`}>
              {block.language}
            </span>
          </div>
          <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
            <code>{block.content}</code>
          </pre>
        </div>
      );
    }

    case 'callout': {
      const variants = {
        info: {
          bg: 'bg-blue-500/8 border-blue-500/20',
          icon: <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />,
          titleCls: 'text-blue-300',
        },
        warning: {
          bg: 'bg-amber-500/8 border-amber-500/20',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />,
          titleCls: 'text-amber-300',
        },
        tip: {
          bg: 'bg-cyan-500/8 border-cyan-500/20',
          icon: <Lightbulb className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />,
          titleCls: 'text-cyan-300',
        },
      };
      const v = variants[block.variant];
      return (
        <div className={`my-6 rounded-xl border p-5 ${v.bg}`}>
          <div className="flex gap-3">
            {v.icon}
            <div>
              <p className={`text-sm font-semibold mb-1.5 ${v.titleCls}`}>{block.title}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{renderInline(block.text)}</p>
            </div>
          </div>
        </div>
      );
    }

    case 'divider':
      return <hr className="my-10 border-white/8" />;

    case 'metric_group':
      return (
        <div className="my-8 grid sm:grid-cols-3 gap-4">
          {block.metrics.map((m, i) => (
            <div key={i} className="glass-card rounded-xl p-5 border border-white/6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{m.value}</div>
              <div className="text-sm font-semibold text-white mb-2">{m.label}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{m.description}</div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

/* ─── Navbar ─────────────────────────────────────────────────────── */
const BlogNavbar: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
        >
          <img src="/logo.png" alt="EvalView" className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <span className="font-bold text-lg tracking-tight text-white">EvalView</span>
        </button>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/blog')}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
          >
            Blog
          </button>
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

/* ─── Progress bar ───────────────────────────────────────────────── */
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-16 left-0 w-full h-0.5 z-40 bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/* ─── Category badge ─────────────────────────────────────────────── */
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

/* ─── Share button ───────────────────────────────────────────────── */
const ShareButton: React.FC<{ title: string }> = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/8 cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
};

/* ─── Main component ─────────────────────────────────────────────── */
const BlogPost: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useNavigation();
  const post = getBlogPost(slug);
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  usePageMetadata({
    title: post ? `${post.title} | EvalView Blog` : 'EvalView Blog | AI Agent Testing and Reliability',
    description: post
      ? post.excerpt
      : 'Engineering deep-dives, reliability guides, and practical CI workflows for teams building and testing AI agents.',
    path: post ? `/blog/${slug}` : '/blog',
    ogType: post ? 'article' : 'website',
    structuredData: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            url: post.canonicalUrl || `https://www.evalview.com/blog/${slug}`,
            author: {
              '@type': 'Person',
              name: 'Hidai Bar-Mor',
            },
            publisher: {
              '@type': 'Organization',
              name: 'EvalView',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.evalview.com/logo.png',
              },
            },
          },
        ]
      : [],
  });

  /* ── Canonical link for syndicated posts ──────────────────────── */
  useEffect(() => {
    const existing = document.querySelector('link[rel="canonical"]');

    if (!post) {
      if (existing) {
        existing.setAttribute('href', 'https://www.evalview.com/blog');
      }
      return;
    }

    if (post.canonicalUrl) {
      if (existing) {
        existing.setAttribute('href', post.canonicalUrl);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = post.canonicalUrl;
        document.head.appendChild(link);
      }
    } else if (existing) {
      existing.setAttribute('href', `https://www.evalview.com/blog/${slug}`);
    }

    return () => {
      const el = document.querySelector('link[rel="canonical"]');
      if (el) el.setAttribute('href', 'https://www.evalview.com');
    };
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-slate-300 font-sans gap-6">
        <div className="text-6xl">🔍</div>
        <h1 className="text-2xl font-bold text-white">Post not found</h1>
        <p className="text-slate-400">That article doesn't exist — it may have moved or been renamed.</p>
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>
      </div>
    );
  }

  if (!post.published) {
    return (
      <div className="min-h-screen font-sans selection:bg-cyan-500/30 text-slate-300">
        <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
        <BlogNavbar />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="text-5xl mb-6">✍️</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Coming soon
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 max-w-xl leading-snug">
            {post.title}
          </h1>
          <p className="text-slate-400 max-w-lg leading-relaxed mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mb-10 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
            </span>
            <span>·</span>
            <span>{post.category}</span>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 text-slate-300">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <BlogNavbar />
      <ReadingProgressBar />

      <main className="relative z-10 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-10 pt-8">
            <button
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-slate-500"
            >
              EvalView
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/blog')}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-slate-500"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <CategoryBadge category={post.category} />
              {post.tags.map((t) => (
                <span key={t} className="text-xs text-slate-500 flex items-center gap-1">
                  <Tag className="w-3 h-3" />{t}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-t border-b border-white/6 mb-7">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/30 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                    EV
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{post.author}</div>
                    <div className="text-slate-500 text-xs">{post.authorRole}</div>
                  </div>
                </div>
                <span className="text-slate-600">·</span>
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min read
                </span>
              </div>
              <ShareButton title={post.title} />
            </div>
          </header>

          {/* Article body */}
          <article>
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </article>

          {/* Tags footer */}
          <div className="mt-12 pt-6 border-t border-white/6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mr-2">Tags</span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/4 border border-white/8 text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> All posts
            </button>
            <ShareButton title={post.title} />
          </div>
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-white/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">More from the blog</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => navigate(`/blog/${p.slug}`)}
                  className="text-left glass-card rounded-2xl p-6 cursor-pointer group border border-white/6 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <CategoryBadge category={p.category} />
                  <h4 className="text-base font-bold text-white mt-3 mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {p.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="glass-card rounded-2xl p-8 text-center border border-cyan-500/10">
            <div className="mb-3"><img src="/logo.png" alt="EvalView" className="w-10 h-10 mx-auto" /></div>
            <h3 className="text-xl font-bold text-white mb-2">
              Start testing your AI agents today
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              Open source, zero config, works with 9+ frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/hidai25/EvalView"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-200 px-4 py-2.5 rounded-lg border border-white/10 transition-all font-mono text-sm hover:border-cyan-500/30"
              >
                pip install evalview
              </a>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-sm font-semibold cursor-pointer"
              >
                Join Cloud Waitlist <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none text-slate-500 hover:text-white transition-colors"
          >
            <img src="/logo.png" alt="EvalView" className="w-6 h-6" />
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

export default BlogPost;
