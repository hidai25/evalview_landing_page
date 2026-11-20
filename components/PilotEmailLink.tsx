import React from 'react';
import { Mail } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function PilotEmailLink({ placement }: { placement: 'hero' | 'roadmap' }) {
  return (
    <a
      href="mailto:hidai@evalview.com?subject=EvalView%20pilot"
      onClick={() => window.gtag?.('event', 'pilot_email_click', { placement })}
      className="mt-3 inline-flex items-center gap-2 rounded py-1 text-sm font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <Mail aria-hidden="true" className="h-4 w-4" />
      hidai@evalview.com
    </a>
  );
}
