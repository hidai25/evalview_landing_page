import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwrFI9xuI5Ai4MgOvrOiZmhkRbhgR-_RtMk6t6Aj-gwc6UYD_AjiQVXuiywdmG39mQ/exec'; 

interface WaitlistFormProps {
  variant?: 'hero' | 'footer';
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ variant = 'hero' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // Use form data format - works reliably with Google Apps Script
      const formData = new FormData();
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());
      formData.append('source', 'evalview-landing-page');

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 animate-fade-in ${variant === 'hero' ? 'max-w-md' : 'mx-auto max-w-md'}`}>
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium text-emerald-100">You're on the list! We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${variant === 'hero' ? 'max-w-md' : 'max-w-lg mx-auto'}`}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-30 blur transition duration-1000 group-hover:opacity-70 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-[#020617] rounded-lg p-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for access..."
            required
            disabled={status === 'loading'}
            className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 px-4 py-3 outline-none text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-black hover:bg-slate-200 font-semibold py-2 px-4 md:px-6 rounded-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
      
      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 text-red-400 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
      
      {/* Optional Hint text underneath */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 pl-1">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        <span>Early access to Cloud features</span>
      </div>
    </div>
  );
};

export default WaitlistForm;