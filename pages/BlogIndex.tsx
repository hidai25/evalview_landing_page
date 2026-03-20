import React from 'react';
import { ArrowRight, Clock, Tag, Rss, Bell } from 'lucide-react';
import { blogPosts, getFeaturedPost, getNonFeaturedPosts } from '../data/blogPosts';
import { useNavigation } from '../hooks/router';
import { usePageMetadata } from '../hooks/usePageMetadata';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryBadge from '../components/CategoryBadge';
import CtaBanner from '../components/CtaBanner';

const BlogIndex: React.FC = () => {
  const { navigate } = useNavigation();
  const featured = getFeaturedPost();
  const rest = getNonFeaturedPosts();
  const hasPublished = featured !== undefined || rest.length > 0;
  usePageMetadata({
    title: 'EvalView Blog | AI Agent Testing, Reliability, and CI',
    description: 'Engineering deep-dives, reliability guides, and practical CI workflows for teams building and testing AI agents.',
    path: '/blog',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'EvalView Blog',
        description: 'Engineering deep-dives, reliability guides, and practical CI workflows for teams building and testing AI agents.',
        url: 'https://evalview.com/blog',
      },
    ],
  });

  // All upcoming posts (for teaser cards)
  const upcomingPosts = blogPosts.filter((p) => !p.published);

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 text-slate-300">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <Navbar activePage="blog" showFullNav />

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

        {/* Published posts (shown when available) */}
        {hasPublished && (
          <>
            {featured && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Featured</p>
                <button
                  onClick={() => navigate(`/blog/${featured.slug}`)}
                  className="w-full text-left glass-card rounded-2xl p-8 sm:p-10 cursor-pointer transition-all duration-300 group border border-white/6 hover:border-cyan-500/30"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
                    <div className="hidden lg:flex w-48 flex-shrink-0 items-center justify-center rounded-xl h-40 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent border border-white/5 text-6xl select-none">
                      🔍
                    </div>
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
                      <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{featured.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {featured.readTime} min read
                          </span>
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

            {rest.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">All Posts</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {rest.map((post) => (
                    <button
                      key={post.slug}
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="text-left glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 group border border-white/6 hover:border-cyan-500/30 flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/5 flex items-center justify-center text-xl mb-4 select-none">
                        {post.category === 'Observability' ? '📊' : post.category === 'Tutorial' ? '⚡' : '🔧'}
                      </div>
                      <CategoryBadge category={post.category} />
                      <h3 className="text-lg font-bold text-white mt-3 mb-2 group-hover:text-cyan-300 transition-colors leading-snug flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
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
            )}
          </>
        )}

        {/* Coming Soon state */}
        {!hasPublished && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero CTA */}
            <div className="glass-card rounded-2xl p-10 sm:p-14 text-center border border-cyan-500/10 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Posts dropping soon
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                We're writing things worth reading.
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Deep engineering takes on AI agent reliability, observability, and testing — no fluff, no filler.
                Subscribe to the waitlist and we'll let you know when the first post is live.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-6 py-3 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-sm font-semibold cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                Notify me when posts go live
              </button>
            </div>

            {/* Upcoming posts teaser grid */}
            {upcomingPosts.length > 0 && (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">Coming up</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {upcomingPosts.map((post) => (
                    <div
                      key={post.slug}
                      className="relative glass-card rounded-2xl p-6 border border-white/6 flex flex-col opacity-60 select-none"
                    >
                      {/* Lock overlay badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-800 border border-white/10 text-slate-400">
                          Coming soon
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/15 to-blue-500/8 border border-white/5 flex items-center justify-center text-lg mb-4 select-none">
                        {post.category === 'Observability' ? '📊' : post.category === 'Tutorial' ? '⚡' : '🔍'}
                      </div>

                      <CategoryBadge category={post.category} />

                      <h3 className="text-base font-bold text-white mt-3 mb-2 leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 text-xs text-slate-600">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <CtaBanner />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
