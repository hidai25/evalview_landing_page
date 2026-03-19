import React from 'react';
import { useNavigation } from '../hooks/router';

const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="relative z-10 border-t border-white/5 py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none text-slate-500 hover:text-white transition-colors"
        >
          <img src="/logo.png" alt="EvalView" className="w-6 h-6" />
          <span className="font-semibold text-white">EvalView</span>
        </button>
        <p>&copy; 2026 EvalView. Open source under Apache 2.0.</p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/hidai25/eval-view" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-slate-500">Blog</button>
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-slate-500">Home</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
