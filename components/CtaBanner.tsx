import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../hooks/router';

interface CtaBannerProps {
  heading?: string;
  description?: string;
}

const CtaBanner: React.FC<CtaBannerProps> = ({
  heading = 'Test your AI agents like you test your code',
  description = 'EvalView is open-source and takes under 15 minutes to set up. Catch hallucinations, regressions, and cost spikes before production.',
}) => {
  const { navigate } = useNavigation();

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-cyan-500/10">
      <div className="mb-4"><img src="/logo.png" alt="EvalView" className="w-12 h-12 mx-auto" /></div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        {heading}
      </h2>
      <p className="text-slate-400 mb-8 max-w-xl mx-auto">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://github.com/hidai25/eval-view"
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
  );
};

export default CtaBanner;
