import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigation } from '../hooks/router';
import { seoPages } from '../data/seoPages';
import { usePageMetadata } from '../hooks/usePageMetadata';
import Navbar from '../components/Navbar';

interface SeoPageProps {
  path: string;
}

const SeoPage: React.FC<SeoPageProps> = ({ path }) => {
  const { navigate } = useNavigation();
  const page = seoPages[path];
  const relatedPages = Object.values(seoPages).filter((entry) => entry.slug !== path).slice(0, 3);

  if (!page) {
    navigate('/');
    return null;
  }

  usePageMetadata({
    title: page.title,
    description: page.description,
    path: page.slug,
  });

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-50 text-slate-300">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <Navbar />

      <main className="relative z-10 pt-24 pb-24">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </button>

          <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
              {page.eyebrow}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              {page.headline}
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              {page.intro}
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
          {page.sections.map((section) => (
            <article key={section.heading} className="glass-card rounded-2xl p-7 md:p-8 border border-white/6">
              <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
              {section.body && <p className="text-slate-400 leading-relaxed mb-4">{section.body}</p>}
              {section.bullets && (
                <ul className="space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.code && (
                <pre className="mt-4 rounded-xl border border-white/8 bg-slate-950/70 p-5 overflow-x-auto text-sm font-mono text-slate-200 leading-relaxed">
                  <code>{section.code}</code>
                </pre>
              )}
            </article>
          ))}
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="glass-card rounded-2xl p-8 border border-white/6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">Related guides</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Keep users and crawlers moving through the core comparison and intent pages.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPages.map((entry) => (
                <button
                  key={entry.slug}
                  onClick={() => navigate(entry.slug)}
                  className="text-left rounded-xl border border-white/8 bg-slate-950/50 hover:bg-slate-900/70 p-5 transition-colors cursor-pointer"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400 mb-2">
                    {entry.eyebrow}
                  </div>
                  <div className="text-base font-semibold text-white mb-2">{entry.headline}</div>
                  <div className="text-sm leading-relaxed text-slate-400">{entry.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-cyan-500/20 bg-cyan-500/5">
            <h2 className="text-2xl font-bold text-white mb-3">Try the workflow</h2>
            <p className="text-slate-400 mb-5 leading-relaxed">
              Generate your first draft suite, review it, and turn it into a regression gate.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/hidai25/eval-view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-5 py-3 rounded-lg font-semibold transition-all"
              >
                View on GitHub
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-lg font-semibold border border-white/10 transition-all cursor-pointer"
              >
                Back to EvalView.com
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SeoPage;
