import React, { useState, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      { text: '$ evalview run', delay: 500 },
      { text: 'Running 14 tests across 3 agents...', delay: 1200 },
      { text: '✓ RAG_Knowledge_Check [0.4s]', delay: 1800, color: 'text-emerald-400' },
      { text: '✓ Tool_Usage_Order [0.8s]', delay: 2100, color: 'text-emerald-400' },
      { text: '', delay: 2200 },
      { text: '✅ Stock Analysis Test - PASSED (score: 92.5)', delay: 2500, color: 'text-emerald-400 font-bold' },
      { text: '   Cost: $0.0234 | Latency: 3.4s', delay: 2500, color: 'text-slate-500' },
      { text: '', delay: 3000 },
      { text: '$ _', delay: 3200, animate: true },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, delay, color }, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => {
          // Simply force update logic for the demo sequence
          return [...prev, text] as any; 
        });
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full mx-auto bg-[#05050a] rounded-xl border border-white/10 shadow-2xl shadow-cyan-900/10 overflow-hidden font-mono text-sm backdrop-blur-sm">
      <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="flex-1 text-center text-xs text-slate-600 font-sans tracking-wide">evalview — zsh</div>
      </div>
      <div className="p-5 h-64 overflow-y-auto flex flex-col gap-1.5 font-medium">
        <div className="opacity-100 transition-opacity duration-500">
           <div className="flex items-center gap-2 text-slate-500 mb-3">
             <span className="text-cyan-400">➜</span>
             <span className="text-slate-300">evalview run</span>
           </div>
           
           <div className="text-slate-400 mb-2">Running 14 tests across 3 agents...</div>
           
           <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-emerald-400/90">
                 <span>✓ RAG_Knowledge_Check</span>
                 <span className="text-slate-600 text-xs">[0.4s]</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400/90">
                 <span>✓ Tool_Usage_Order</span>
                 <span className="text-slate-600 text-xs">[0.8s]</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400/90">
                 <span>✓ Safety_Guardrails</span>
                 <span className="text-slate-600 text-xs">[0.2s]</span>
              </div>
           </div>

           <div className="mt-4 border-t border-white/5 pt-4">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
                <span>✅</span> Stock Analysis Test - PASSED
              </div>
              <div className="text-slate-500 text-xs mt-1.5 pl-6 font-mono">
                Cost: <span className="text-slate-400">$0.0234</span> | Latency: <span className="text-slate-400">3.4s</span>
              </div>
           </div>

           <div className="mt-4 flex items-center gap-2">
             <span className="text-cyan-400">➜</span>
             <span className="animate-pulse text-slate-300">_</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;