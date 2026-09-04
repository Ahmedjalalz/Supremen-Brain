import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  RotateCcw,
  Wine,
  Sparkles,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { DUMMY_USER } from '../data/dashboard';
import SupremeBrainLogo from './SupremeBrainLogo';

export default function Navbar({
  currentRoute,
  onNavigate,
  onReplayIntro,
  onOpenAuth,
  user,
  onOpenSettings,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const avatarDropdownRef = useRef(null);

  const currentUser = user || DUMMY_USER;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target)
      ) {
        setIsAvatarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = currentRoute === '/' || !currentRoute;
  const isOrder = currentRoute === '/order';
  const isResults = currentRoute === '/results';
  const isDashboard = currentRoute === '/dashboard';

  const handleNav = (target) => {
    setIsMobileMenuOpen(false);
    setIsAvatarDropdownOpen(false);
    if (target.startsWith('#')) {
      if (!isHome) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(target);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-40 ${
        isScrolled || !isHome
          ? 'bg-[#08080e]/95 backdrop-blur-xl border-b border-gold/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${
            isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
          }`}
        >
          {/* ── Column 1: Left Brand Crest & Title (Aligns to left edge) ── */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
            >
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-gold/30 bg-black/60 shadow-[0_0_10px_rgba(201,162,39,0.2)] transition-transform group-hover:scale-105 shrink-0">
                <SupremeBrainLogo className="w-4 h-4 text-gold sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="font-playfair text-base sm:text-lg md:text-xl font-black text-gold tracking-wider group-hover:text-[#FFF] transition-colors leading-none whitespace-nowrap">
                SUPREME BRAIN
              </span>
            </button>
          </div>

          {/* ── Column 2: Center Navigation Links (Exact 50% dead-center symmetry) ── */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 2xl:gap-8 shrink-0 select-none">
            <button
              onClick={() => handleNav('#how-it-works')}
              className="font-inter text-xs xl:text-[13px] text-smoke/80 hover:text-gold transition-colors duration-200 relative group tracking-wide cursor-pointer py-1 whitespace-nowrap"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold/60 transition-all duration-300 group-hover:w-full" />
            </button>

            <span className="text-gold/25 text-[8px] select-none">·</span>

            <button
              onClick={() => handleNav('#the-menu')}
              className="font-inter text-xs xl:text-[13px] text-smoke/80 hover:text-gold transition-colors duration-200 relative group tracking-wide cursor-pointer py-1 whitespace-nowrap"
            >
              The Menu
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold/60 transition-all duration-300 group-hover:w-full" />
            </button>

            <span className="text-gold/25 text-[8px] select-none">·</span>

            <button
              onClick={() => handleNav('/order')}
              className={`font-inter text-xs xl:text-[13px] transition-colors duration-200 relative group tracking-wide cursor-pointer py-1 whitespace-nowrap ${
                isOrder ? 'text-gold font-semibold' : 'text-smoke/80 hover:text-gold'
              }`}
            >
              <span>The Making</span>
              {isOrder ? (
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gold shadow-[0_0_8px_#C9A227]" />
              ) : (
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold/60 transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            <span className="text-gold/25 text-[8px] select-none">·</span>

            <button
              onClick={() => handleNav('/results')}
              className={`font-inter text-xs xl:text-[13px] transition-colors duration-200 relative group tracking-wide cursor-pointer py-1 whitespace-nowrap ${
                isResults ? 'text-gold font-semibold' : 'text-smoke/80 hover:text-gold'
              }`}
            >
              <span>The Pour</span>
              {isResults ? (
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              ) : (
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold/60 transition-all duration-300 group-hover:w-full" />
              )}
            </button>

            <span className="text-gold/25 text-[8px] select-none">·</span>

            <button
              onClick={() => handleNav('/dashboard')}
              className={`font-inter text-xs xl:text-[13px] transition-colors duration-200 relative group tracking-wide cursor-pointer py-1 whitespace-nowrap ${
                isDashboard ? 'text-gold font-semibold' : 'text-smoke/80 hover:text-gold'
              }`}
            >
              <span>The Back Room</span>
              {isDashboard ? (
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gold shadow-[0_0_8px_#C9A227]" />
              ) : (
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold/60 transition-all duration-300 group-hover:w-full" />
              )}
            </button>
          </nav>

          {/* ── Column 3: Right Actions (Aligns to right edge) ── */}
          <div className="flex items-center justify-end gap-2 sm:gap-2.5 shrink-0">
            {/* Replay intro (only on home page on xl+ screens) */}
            {isHome && onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Entrance"
                className="h-9 w-9 rounded-full border border-gold/[0.12] hover:border-gold/30 text-tarnished-gold/70 hover:text-gold transition-all duration-200 active:scale-95 hidden xl:flex items-center justify-center cursor-pointer shrink-0"
              >
                <RotateCcw size={13} />
              </button>
            )}

            {/* Contextual CTA Button (hidden on /dashboard) */}
            {!isDashboard && (
              <>
                {isOrder ? (
                  <button
                    onClick={() => handleNav('/results')}
                    className="hidden sm:inline-flex h-9 px-3.5 rounded-full bg-black/70 border border-gold/30 text-gold font-inter text-[11px] tracking-wider font-semibold hover:border-gold hover:bg-gold/10 active:scale-[0.98] transition-all uppercase items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Wine size={12} className="text-gold shrink-0" />
                    <span>Latest Pour</span>
                  </button>
                ) : isResults ? (
                  <button
                    onClick={() => handleNav('/order')}
                    className="hidden sm:inline-flex h-9 px-4 rounded-full bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-[11px] tracking-wider font-semibold hover:shadow-[0_0_16px_rgba(201,162,39,0.3)] active:scale-[0.98] transition-all uppercase items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Order Another</span>
                    <ArrowRight size={12} className="shrink-0" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav('/order')}
                    className="hidden sm:inline-flex h-9 px-4 rounded-full bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-[11px] tracking-wider font-semibold hover:shadow-[0_0_16px_rgba(201,162,39,0.3)] active:scale-[0.98] transition-all uppercase items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Order a Pour</span>
                    <ArrowRight size={12} className="shrink-0" />
                  </button>
                )}
              </>
            )}

            {/* ── User Avatar Dropdown (Desktop & Tablet) ── */}
            <div className="relative hidden sm:block" ref={avatarDropdownRef}>
              <button
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                aria-label="User Account Menu"
                className="h-9 pl-1 pr-2.5 rounded-full border border-gold/30 bg-black/60 hover:border-gold hover:shadow-[0_0_15px_rgba(201,162,39,0.2)] transition-all cursor-pointer inline-flex items-center gap-2 select-none"
              >
                {/* Circular Avatar Badge */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-950/80 border border-gold/60 flex items-center justify-center font-playfair text-[10px] font-bold text-gold shadow-[0_0_6px_rgba(201,162,39,0.3)]">
                  {currentUser?.initials || 'AJ'}
                </div>
                <span className="font-inter text-xs text-light/90 font-medium hidden xl:inline">
                  {currentUser?.name?.split(' ')[0] || 'Patron'}
                </span>
                <ChevronDown
                  size={12}
                  className={`text-gold/70 transition-transform duration-200 ${
                    isAvatarDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Floating Dropdown Menu */}
              <AnimatePresence>
                {isAvatarDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gold/30 bg-[#0c0c16]/98 backdrop-blur-2xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(201,162,39,0.12)] z-50"
                  >
                    {/* User info banner */}
                    <div className="px-3 py-2.5 border-b border-gold/10 mb-1">
                      <div className="font-playfair text-sm font-bold text-light">
                        {currentUser?.name || 'Ahmed Jalal'}
                      </div>
                      <div className="font-mono text-[10px] text-smoke/70 truncate">
                        {currentUser?.email || 'ahmed@supremebrain.ai'}
                      </div>
                      <div className="font-mono text-[9px] text-gold uppercase mt-1">
                        {currentUser?.seat || 'The Enthusiast'}
                      </div>
                    </div>

                    {/* Dropdown Action Items */}
                    <div className="space-y-0.5">
                      <button
                        onClick={() => handleNav('/dashboard')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-inter text-light hover:text-gold hover:bg-gold/10 transition-colors text-left cursor-pointer"
                      >
                        <Wine size={14} className="text-gold shrink-0" />
                        <span className="font-semibold">MY BAR</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsAvatarDropdownOpen(false);
                          if (onOpenSettings) onOpenSettings();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-inter text-smoke hover:text-gold hover:bg-gold/10 transition-colors text-left cursor-pointer"
                      >
                        <Settings size={14} className="text-smoke/70 shrink-0" />
                        <span>SETTINGS</span>
                      </button>

                      <div className="my-1 border-t border-gold/10" />

                      <button
                        onClick={() => handleNav('/login')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-inter text-smoke/80 hover:text-red-400 hover:bg-red-950/20 transition-colors text-left cursor-pointer"
                      >
                        <LogOut size={14} className="text-smoke/70 shrink-0" />
                        <span>LOG OUT</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Mobile Hamburger Toggle (< lg) ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-lg border border-gold/20 flex items-center justify-center text-gold/80 hover:text-gold hover:bg-gold/10 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ──────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Smoked Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-[290px] sm:w-[320px] max-w-[85vw] bg-[#08080e]/98 backdrop-blur-2xl border-l border-gold/[0.12] p-6 flex flex-col justify-between shadow-2xl h-screen overflow-y-auto custom-scrollbar z-10"
            >
              <div className="flex flex-col gap-5 mt-4">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gold/[0.1]">
                  <div className="flex items-center gap-2.5">
                    <SupremeBrainLogo className="w-5 h-5 text-gold" />
                    <span className="font-playfair text-base font-black text-gold tracking-wider">
                      THE SPEAKEASY
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-md text-gold/70 hover:text-gold transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* User Status Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/15 bg-black/40">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-950/80 border border-gold/50 flex items-center justify-center font-playfair text-xs font-bold text-gold shrink-0">
                    {currentUser?.initials || 'AJ'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-playfair text-sm font-bold text-light truncate">
                      {currentUser?.name || 'Ahmed Jalal'}
                    </div>
                    <div className="font-mono text-[10px] text-gold truncate">
                      {currentUser?.seat || 'The Enthusiast'}
                    </div>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => handleNav('/')}
                    className="text-left font-inter text-sm text-light/90 hover:text-gold transition-colors py-1.5 cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNav('#how-it-works')}
                    className="text-left font-inter text-sm text-smoke hover:text-gold transition-colors py-1.5 cursor-pointer"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => handleNav('#the-menu')}
                    className="text-left font-inter text-sm text-smoke hover:text-gold transition-colors py-1.5 cursor-pointer"
                  >
                    The Cocktail Menu
                  </button>
                  <button
                    onClick={() => handleNav('/order')}
                    className="flex items-center justify-between text-left font-inter text-sm text-gold font-semibold py-1.5 border-y border-gold/10 cursor-pointer"
                  >
                    <span>The Making</span>
                    <span className="rounded bg-gold/20 px-2 py-0.5 font-mono text-[10px] text-gold border border-gold/30">
                      ORDER
                    </span>
                  </button>
                  <button
                    onClick={() => handleNav('/results')}
                    className="flex items-center justify-between text-left font-inter text-sm text-emerald-400 font-semibold py-1.5 cursor-pointer"
                  >
                    <span>The Pour</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/30">
                      RESULTS
                    </span>
                  </button>
                  <button
                    onClick={() => handleNav('/dashboard')}
                    className="flex items-center justify-between text-left font-inter text-sm text-amber-300 font-semibold py-1.5 border-t border-gold/10 cursor-pointer"
                  >
                    <span>The Back Room</span>
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-400 border border-amber-500/30">
                      MY BAR
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Actions in Drawer */}
              <div className="flex flex-col gap-2.5 my-6 pt-4 border-t border-gold/10">
                <button
                  onClick={() => handleNav('/order')}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs tracking-wider font-semibold text-center hover:shadow-[0_0_16px_rgba(201,162,39,0.3)] transition-all uppercase cursor-pointer"
                >
                  Order a Pour
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenSettings) onOpenSettings();
                  }}
                  className="w-full py-2.5 rounded-full border border-gold/20 bg-black/40 text-smoke hover:text-gold font-inter text-xs text-center transition-colors cursor-pointer"
                >
                  Settings
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNav('/login');
                  }}
                  className="w-full py-2 rounded-full border border-gold/15 bg-black/60 text-smoke/70 hover:text-red-400 font-inter text-xs text-center transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
