import React from 'react';

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

export default CategoryBadge;
