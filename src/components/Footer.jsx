import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import SupremeBrainLogo from './SupremeBrainLogo';

// X / Twitter SVG Component
function XIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// LinkedIn SVG Component
function LinkedInIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// GitHub SVG Component
function GitHubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Footer({ onOpenAuth, onNavigate }) {
  return (
    <footer className="relative w-full bg-[#040307] text-light overflow-hidden border-t border-gold/15">
      {/* Background Ambience: Subtle Warm Hearth Reflection */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, rgba(201, 162, 39, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* ── FOUR COLUMN GROUPS ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12 pb-14 border-b border-gold/10">
          {/* GROUP 1: BRAND & MISSION */}
          <div className="space-y-4">
            <a href="#" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/30 bg-black/60 shadow-[0_0_10px_rgba(201,162,39,0.2)] transition-transform group-hover:scale-105 shrink-0">
                <SupremeBrainLogo className="w-5 h-5 text-gold" />
              </div>
              <span className="font-playfair text-xl md:text-2xl font-black text-gold tracking-wider group-hover:text-white transition-colors">
                SUPREME BRAIN
              </span>
            </a>
            <p className="font-inter text-xs text-smoke/90 leading-relaxed max-w-xs">
              Every prediction, mixed to order. Forty intelligence modules distilling raw data into high-proof foresight.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/15 bg-black/60 text-smoke/80 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/15 bg-black/60 text-smoke/80 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/15 bg-black/60 text-smoke/80 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GROUP 2: THE BAR */}
          <div>
            <h4 className="font-playfair text-sm font-bold tracking-wider text-[#ede8dc] uppercase mb-4">
              The Bar
            </h4>
            <ul className="space-y-2.5 font-inter text-xs text-smoke/80">
              <li>
                <a href="#how-it-works" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#the-menu" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  The Menu
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('/order') : null}
                  className="hover:text-gold transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                >
                  The Making (Order a Pour)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('/results') : null}
                  className="hover:text-gold transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                >
                  The Pour (Results View)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('signin')}
                  className="hover:text-gold transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                >
                  Pull Up a Stool (Sign In)
                </button>
              </li>
            </ul>
          </div>

          {/* GROUP 3: COMPANY */}
          <div>
            <h4 className="font-playfair text-sm font-bold tracking-wider text-[#ede8dc] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 font-inter text-xs text-smoke/80">
              <li>
                <a href="#pull-up-a-stool" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  About
                </a>
              </li>
              <li>
                <a href="#pull-up-a-stool" className="hover:text-gold transition-colors inline-flex items-center gap-1.5">
                  <span>Status</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                    99.99%
                  </span>
                </a>
              </li>
              <li>
                <a href="#pull-up-a-stool" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* GROUP 4: LEGAL */}
          <div>
            <h4 className="font-playfair text-sm font-bold tracking-wider text-[#ede8dc] uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 font-inter text-xs text-smoke/80">
              <li>
                <a href="#pull-up-a-stool" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#pull-up-a-stool" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#pull-up-a-stool" className="hover:text-gold transition-colors inline-flex items-center gap-1">
                  Security & SOC2
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── CLOSING THE DOOR / FOOTER BOTTOM BAR ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Copyright */}
          <div className="font-inter text-xs text-smoke/60">
            © 2026 <span className="text-light/80 font-medium">Supreme Brain</span>. All rights reserved.
          </div>

          {/* Probabilistic Disclaimer */}
          <div className="max-w-md font-inter text-[11px] text-smoke/50 leading-relaxed md:text-right">
            Predictions are probabilistic model outputs derived from stochastic simulation and ensemble models; they do not constitute financial, investment, or guaranteed outcome advice.
          </div>
        </div>
      </div>
    </footer>
  );
}
