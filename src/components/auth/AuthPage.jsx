import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import BartenderVideoPanel from './BartenderVideoPanel';
import LoginForm from './LoginForm';
import SignUpWizard from './SignUpWizard';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function AuthPage({ currentRoute, onNavigate }) {
  // Sync page title
  useEffect(() => {
    if (currentRoute === '/signup') {
      document.title = 'Supreme Brain · Become a Member';
    } else if (currentRoute === '/forgot-password') {
      document.title = 'Supreme Brain · Recover Access Key';
    } else {
      document.title = 'Supreme Brain · Pull Up a Stool';
    }
  }, [currentRoute]);

  return (
    <div className="relative min-h-screen w-full bg-[#06060a] text-light overflow-x-hidden selection:bg-gold/30 selection:text-gold">
      {/* ── DESKTOP: FULL SCREEN CONTINUOUS BARTENDER VIDEO BACKGROUND ── */}
      <div className="hidden md:block fixed inset-0 z-0 h-full w-full pointer-events-none">
        <BartenderVideoPanel isMobileBanner={false} />
      </div>

      {/* ── MOBILE: TOP CINEMATIC VIDEO BANNER (FOCUSES ON LEFT 50% BARTENDER) ── */}
      <div className="md:hidden relative h-[38vh] sm:h-[44vh] w-full flex-shrink-0 z-0">
        <BartenderVideoPanel isMobileBanner={true} />
      </div>

      {/* ── FOREGROUND CONTENT LAYER (MOVED 5% LOWER) ── */}
      <div className="relative z-10 flex min-h-[62vh] md:min-h-screen w-full flex-col justify-between p-4 sm:p-6 md:p-8 mt-6 sm:mt-8 md:mt-0">
        {/* Top Navbar with Return Link */}
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-2 md:mb-0">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/70 px-4 py-1.5 font-inter text-xs text-smoke hover:text-[#FFD700] hover:border-[#FFD700]/50 hover:bg-black/90 backdrop-blur-md transition-all duration-200"
          >
            <ArrowLeft size={14} />
            <span>Return to the Bar</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-gold/15 bg-black/50 px-3.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-smoke">The Speakeasy is Open</span>
          </div>
        </div>

        {/* ── MAIN CONTENT: 2-COLUMN ON DESKTOP, STACKED BELOW VIDEO ON MOBILE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto items-center my-auto py-2 md:py-6 gap-6 md:gap-8">
          {/* Left Column: Empty on Desktop (Allows bartender video to shine through) */}
          <div className="hidden md:block pointer-events-none" />

          {/* Right Column / Mobile Lower Section: Authentication Card */}
          <div className="flex justify-center md:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full transition-all duration-300 ${
                currentRoute === '/signup' ? 'max-w-[560px]' : 'max-w-[460px]'
              } rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(10,10,18,0.85)] p-5 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(255,215,0,0.08)] backdrop-blur-[14px]`}
            >
              {/* Top Delicate Brass Inlay Line */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

              {/* ── BRANDING AT TOP OF CARD ── */}
              <div className="mb-5 md:mb-6 flex items-center justify-between border-b border-[#1a1a2e] pb-3 md:pb-4">
                <div className="flex items-center gap-2.5">
                  {/* Mini Shaker / Brain Emblem */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FFD700]/30 bg-black/70 shadow-[0_0_12px_rgba(255,215,0,0.2)]">
                    <Sparkles size={16} className="text-[#FFD700]" />
                  </div>

                  <div>
                    <h1 className="font-playfair text-lg font-black tracking-wider text-[#FFD700]">
                      SUPREME BRAIN
                    </h1>
                    <span className="block font-mono text-[9px] text-tarnished-gold tracking-widest uppercase">
                      Speakeasy Intelligence
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-smoke/60">EST. 2026</span>
              </div>

              {/* ── ROUTED AUTHENTICATION PANEL ── */}
              <AnimatePresence mode="wait">
                {currentRoute === '/login' && (
                  <LoginForm
                    key="login"
                    onNavigate={onNavigate}
                    onLoginSuccess={(userEmail) => {
                      setTimeout(() => onNavigate('/'), 800);
                    }}
                  />
                )}

                {currentRoute === '/signup' && (
                  <SignUpWizard
                    key="signup"
                    onNavigate={onNavigate}
                    onSignUpSuccess={(userData) => {
                      // Handled within wizard
                    }}
                  />
                )}

                {currentRoute === '/forgot-password' && (
                  <ForgotPasswordForm
                    key="forgot"
                    onNavigate={onNavigate}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Discreet Bottom Copyright */}
        <div className="w-full text-center font-mono text-[10px] text-smoke/50 py-3 md:py-2">
          © 2026 Supreme Brain · Predictions are Probabilistic
        </div>
      </div>
    </div>
  );
}
