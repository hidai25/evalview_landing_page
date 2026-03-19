import React from 'react';
import { Github, ArrowRight, Star } from 'lucide-react';
import { useNavigation } from '../hooks/router';
import { useGitHubReleases } from '../hooks/useGitHubReleases';

interface NavbarProps {
  /** Which nav item to highlight as active */
  activePage?: 'blog' | 'home';
  /** Show full nav links (Features, Pricing, etc.) — used on homepage & blog index */
  showFullNav?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, showFullNav = false }) => {
  const { navigate } = useNavigation();
  const { starCount } = useGitHubReleases();

  const goToSection = (id: string) => {
    navigate('/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

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
          {showFullNav && (
            <>
              <button onClick={() => goToSection('features')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer">Features</button>
              <button onClick={() => goToSection('roadmap')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer">Cloud Roadmap</button>
              <button onClick={() => goToSection('pricing')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer">Pricing</button>
              <button onClick={() => goToSection('changelog')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer">Changelog</button>
            </>
          )}
          {activePage === 'blog' ? (
            <span className="text-sm font-semibold text-cyan-400 hidden sm:block">Blog</span>
          ) : (
            <button
              onClick={() => navigate('/blog')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block bg-transparent border-none cursor-pointer"
            >
              Blog
            </button>
          )}
          <a
            href="https://github.com/hidai25/eval-view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
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

export default Navbar;
