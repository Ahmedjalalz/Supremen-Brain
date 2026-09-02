import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPasswordForm({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full">
      {!isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── HEADER ── */}
          <div className="mb-6">
            <span className="block font-mono text-[10px] font-bold tracking-[0.25em] text-tarnished-gold uppercase mb-1">
              Account Recovery
            </span>
            <h2 className="font-playfair text-3xl font-black tracking-tight text-[#ede8dc] sm:text-4xl">
              Forgot Your Key?
            </h2>
            <p className="mt-1.5 font-inter text-xs text-smoke sm:text-sm">
              Even the best regulars forget where they left the key.
            </p>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-inter text-xs font-medium text-[#b8a44e] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-[#1a1a2e] bg-[#0a0a12] px-3.5 py-2.5 pl-10 font-inter text-sm text-light placeholder:text-[#666666] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                />
                <Mail size={15} className="absolute left-3.5 top-3 text-[#b8a44e]/70" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] py-3.5 font-inter text-xs font-bold tracking-wider text-[#06060a] uppercase shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all duration-300 hover:bg-[#e6c200] hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(255,215,0,0.4)] active:scale-[0.99] disabled:opacity-70"
              >
                <span>{isSubmitting ? 'Dispatching...' : 'Send Reset Link'}</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>

          {/* ── BACK TO LOGIN ── */}
          <div className="mt-8 border-t border-[#1a1a2e] pt-5 text-center font-inter text-xs text-smoke">
            <span>Remembered your key? </span>
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="font-semibold text-light hover:text-[#FFD700] transition-colors"
            >
              Back to Login →
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="text-center py-4 space-y-4"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <CheckCircle2 size={28} />
          </div>

          <div>
            <h3 className="font-playfair text-2xl font-bold text-[#ede8dc]">
              Check Your Mail
            </h3>
            <p className="mt-2 font-inter text-xs sm:text-sm text-smoke leading-relaxed max-w-sm mx-auto">
              We've sent a secret reset link to <strong className="text-light">{email}</strong>. Follow the instructions to reclaim your stool.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-8 py-3 font-inter text-xs font-bold tracking-wider text-[#06060a] uppercase shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all hover:bg-[#e6c200] hover:scale-[1.02]"
            >
              <span>Back to the Bar</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
