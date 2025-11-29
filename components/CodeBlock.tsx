import React from 'react';
import { FileCode } from 'lucide-react';

const CodeBlock: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-[#05050a] border border-white/10 shadow-2xl font-mono text-sm leading-relaxed group hover:border-white/20 transition-colors">
      <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-400">
           <FileCode className="w-4 h-4" />
           <span className="text-xs font-medium">stock_analysis.yaml</span>
        </div>
        <span className="text-xs text-slate-600 font-bold tracking-wider">YAML</span>
      </div>
      <div className="p-5 overflow-x-auto text-[13px] md:text-sm">
        <pre>
<code><span className="text-blue-400">name:</span> <span className="text-emerald-400">"Stock Analysis Test"</span>
<span className="text-blue-400">input:</span>
  <span className="text-cyan-400">query:</span> <span className="text-emerald-400">"Analyze Apple stock performance"</span>

<span className="text-blue-400">expected:</span>
  <span className="text-cyan-400">tools:</span> <span className="text-amber-300">[</span><span className="text-emerald-400">fetch_stock_data</span><span className="text-slate-500">,</span> <span className="text-emerald-400">analyze_metrics</span><span className="text-amber-300">]</span>
  <span className="text-cyan-400">output:</span>
    <span className="text-cyan-400">contains:</span> <span className="text-amber-300">[</span><span className="text-emerald-400">"revenue"</span><span className="text-slate-500">,</span> <span className="text-emerald-400">"earnings"</span><span className="text-amber-300">]</span>

<span className="text-blue-400">thresholds:</span>
  <span className="text-cyan-400">min_score:</span> <span className="text-orange-400">80</span>
  <span className="text-cyan-400">max_cost:</span> <span className="text-orange-400">0.50</span>
  <span className="text-cyan-400">max_latency:</span> <span className="text-orange-400">5000</span></code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;