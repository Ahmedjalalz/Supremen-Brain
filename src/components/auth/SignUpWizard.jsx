import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Check,
  ArrowRight,
  ArrowLeft,
  Copy,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  KeyRound,
  RotateCw,
} from 'lucide-react';

// ── MINIMAL BAR COASTER & PEN ILLUSTRATION (STEP 1) ─────────────────
function CoasterPenVisual() {
  return (
    <div className="flex items-center justify-center my-2">
      <svg viewBox="0 0 120 70" width="90" height="52" className="overflow-visible">
        <defs>
          <linearGradient id="coasterGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#251c10" />
            <stop offset="100%" stopColor="#0d0a06" />
          </linearGradient>
        </defs>
        {/* Leather / Cork Coaster Base */}
        <rect x="25" y="16" width="70" height="42" rx="10" fill="url(#coasterGrad)" stroke="#b8a44e" strokeWidth="1" />
        <rect x="29" y="20" width="62" height="34" rx="7" fill="none" stroke="#b8a44e" strokeWidth="0.6" strokeDasharray="2 2" />
        
        {/* Golden Embossed Brain Crest */}
        <circle cx="60" cy="37" r="9" fill="#140f08" stroke="#FFD700" strokeWidth="0.8" />
        <path d="M57 37 Q60 32 63 37 Q60 42 57 37" fill="none" stroke="#FFD700" strokeWidth="0.8" />

        {/* Vintage Fountain Pen laying diagonally */}
        <g transform="rotate(-28 75 35)">
          <path d="M70 12 L74 12 L73 50 L71 50 Z" fill="#b8a44e" />
          <polygon points="72,50 74,58 70,58" fill="#FFD700" stroke="#b8a44e" strokeWidth="0.5" />
          <circle cx="72" cy="20" r="1.5" fill="#FFD700" />
        </g>
      </svg>
    </div>
  );
}

// ── MINIATURE BAR STOOL ICONS (STEP 2) ──────────────────────────────
function StoolIcon({ tier, accentColor }) {
  if (tier === 'regular') {
    // Classic Wooden Counter Stool
    return (
      <svg viewBox="0 0 40 44" width="28" height="30" className="transition-transform group-hover:scale-110">
        {/* Round Padded Seat Cushion */}
        <ellipse cx="20" cy="10" rx="12" ry="4.5" fill="#1c140c" stroke={accentColor} strokeWidth="1.2" />
        <ellipse cx="20" cy="13" rx="12" ry="4" fill="#100b06" stroke={accentColor} strokeWidth="0.8" />
        {/* 4 Straight Flared Brass Legs */}
        <line x1="12" y1="13" x2="8" y2="38" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28" y1="13" x2="32" y2="38" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="17" y1="14" x2="16" y2="38" stroke={accentColor} strokeWidth="0.9" strokeLinecap="round" />
        <line x1="23" y1="14" x2="24" y2="38" stroke={accentColor} strokeWidth="0.9" strokeLinecap="round" />
        {/* Circular Footrest Ring */}
        <ellipse cx="20" cy="26" rx="9" ry="2.5" fill="none" stroke={accentColor} strokeWidth="1" />
      </svg>
    );
  }

  if (tier === 'enthusiast') {
    // Swivel Brass Speakeasy Stool
    return (
      <svg viewBox="0 0 40 44" width="28" height="30" className="transition-transform group-hover:scale-110">
        {/* Tufted Leather Cushion */}
        <ellipse cx="20" cy="9" rx="13" ry="5" fill="#18131c" stroke={accentColor} strokeWidth="1.2" />
        <line x1="13" y1="9" x2="27" y2="9" stroke={accentColor} strokeWidth="0.6" strokeDasharray="1 1" />
        {/* Central Pedestal with Swivel Collar */}
        <rect x="18.5" y="14" width="3" height="12" fill={accentColor} />
        {/* Footrest Ring */}
        <ellipse cx="20" cy="24" rx="8" ry="2.5" fill="none" stroke={accentColor} strokeWidth="1.2" />
        {/* Flared Quad Base */}
        <line x1="18.5" y1="26" x2="9" y2="38" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="21.5" y1="26" x2="31" y2="38" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="20" cy="38" r="1.5" fill={accentColor} />
      </svg>
    );
  }

  if (tier === 'connoisseur') {
    // High-Back Victorian Velvet Stool with Curved Brass Backrest
    return (
      <svg viewBox="0 0 40 44" width="28" height="30" className="transition-transform group-hover:scale-110">
        {/* Curved High Backrest */}
        <path d="M11 6 Q20 2 29 6 L28 14 Q20 11 12 14 Z" fill="#241a0d" stroke={accentColor} strokeWidth="1.2" />
        {/* Plump Velvet Cushion */}
        <ellipse cx="20" cy="16" rx="12" ry="4.5" fill="#1a1208" stroke={accentColor} strokeWidth="1.2" />
        {/* Ornate Turned Legs */}
        <line x1="12" y1="18" x2="8" y2="40" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28" y1="18" x2="32" y2="40" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="17" y1="19" x2="16" y2="40" stroke={accentColor} strokeWidth="0.9" strokeLinecap="round" />
        <line x1="23" y1="19" x2="24" y2="40" stroke={accentColor} strokeWidth="0.9" strokeLinecap="round" />
        {/* Dual Footrest Brass Rings */}
        <ellipse cx="20" cy="29" rx="8.5" ry="2" fill="none" stroke={accentColor} strokeWidth="1" />
      </svg>
    );
  }

  // The Owner — Imperial Velvet Armchair Stool
  return (
    <svg viewBox="0 0 40 44" width="28" height="30" className="transition-transform group-hover:scale-110">
      {/* Tufted Wingback & Armrests */}
      <path d="M9 4 Q20 1 31 4 L30 16 L27 16 L27 10 L13 10 L13 16 L10 16 Z" fill="#201c18" stroke={accentColor} strokeWidth="1.2" />
      {/* Imperial Thick Seat Cushion */}
      <rect x="11" y="14" width="18" height="6" rx="2" fill="#14120f" stroke={accentColor} strokeWidth="1.2" />
      {/* Heavy Heavy Brass Column Pedestal */}
      <line x1="12" y1="20" x2="8" y2="40" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="28" y1="20" x2="32" y2="40" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="20" cy="30" rx="9" ry="2.5" fill="none" stroke={accentColor} strokeWidth="1.2" />
      <polygon points="20,38 12,41 28,41" fill={accentColor} opacity="0.6" />
    </svg>
  );
}

// ── 4 SUBSCRIPTION TIERS SPECIFICATION ──────────────────────────────
const SUBSCRIPTION_TIERS = [
  {
    id: 'regular',
    name: 'The Regular',
    price: '$49',
    period: '/mo',
    accentColor: '#cd7f32', // Bronze
    accentName: 'Bronze Tier',
    description: 'A reliable seat at the counter. Standard predictions & daily market odds.',
    features: ['Standard Rest APIs', '10 Daily Predictions', '99.5% Uptime SLA', 'Community Support'],
  },
  {
    id: 'enthusiast',
    name: 'The Enthusiast',
    price: '$149',
    period: '/mo',
    accentColor: '#c0c0c0', // Silver
    accentName: 'Silver Tier',
    description: 'For patrons who take their pours seriously. 40+ ML models & real-time streaming.',
    features: ['40+ ML Module Ensemble', 'Real-Time WebSocket Streams', 'Sub-100ms Latency', 'Kelly Criterion Calibration'],
  },
  {
    id: 'connoisseur',
    name: 'The Connoisseur',
    price: '$399',
    period: '/mo',
    accentColor: '#FFD700', // Gold
    accentName: 'Gold Tier · Popular',
    popular: true,
    description: 'Top-shelf distillation. Sub-40ms latency, full REST & Webhook access.',
    features: ['10k Monte Carlo Paths', 'Sub-40ms Ultra Low Latency', 'Custom Telemetry Webhooks', 'Dedicated Bartender Priority'],
  },
  {
    id: 'owner',
    name: 'The Owner',
    price: '$999',
    period: '/mo',
    accentColor: '#e5e4e2', // Platinum
    accentName: 'Platinum Reserve',
    description: 'Private booth & unlimited pour volume. Dedicated models & custom telemetry.',
    features: ['Unlimited Pour Volume', 'Dedicated GPU Node', 'Custom Predictive Weights', '24/7 Private Concierge'],
  },
];

// ── SHAKER POUR ANIMATION (STEP 3) ──────────────────────────────────
function ShakerPourAnimation({ onComplete }) {
  const [phase, setPhase] = useState('shaking'); // 'shaking' | 'pouring' | 'revealed'

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('pouring'), 1100);
    const timer2 = setTimeout(() => {
      setPhase('revealed');
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="relative mx-auto flex h-24 w-full items-center justify-center overflow-hidden my-2">
      <AnimatePresence mode="wait">
        {phase === 'shaking' && (
          <motion.div
            key="shaker"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [-12, 12, -15, 15, -8, 8, 0],
              y: [-3, 3, -4, 4, 0],
            }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* Victorian Boston Shaker SVG */}
            <svg viewBox="0 0 40 60" width="40" height="52">
              <defs>
                <linearGradient id="shakerGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b8a44e" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#8c772c" />
                </linearGradient>
              </defs>
              <polygon points="12,10 28,10 26,22 14,22" fill="#d4af37" stroke="#FFD700" strokeWidth="0.8" />
              <path d="M13 22 L27 22 L24 54 Q20 56 16 54 Z" fill="url(#shakerGold)" stroke="#b8a44e" strokeWidth="1" />
              <ellipse cx="20" cy="22" rx="7" ry="1.5" fill="#594611" />
            </svg>
            <span className="font-mono text-[9px] font-bold text-[#FFD700] uppercase tracking-widest mt-1">
              Mixing Intelligence...
            </span>
          </motion.div>
        )}

        {phase === 'pouring' && (
          <motion.div
            key="pouring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Stream of golden pour into coupe glass */}
            <svg viewBox="0 0 60 70" width="55" height="60">
              {/* Gold Stream */}
              <motion.line
                x1="30"
                y1="0"
                x2="30"
                y2="40"
                stroke="#FFD700"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
              {/* Coupe Glass */}
              <path d="M15 40 Q30 52 45 40 Z" fill="#251a08" stroke="#FFD700" strokeWidth="1.2" />
              <line x1="30" y1="46" x2="30" y2="60" stroke="#FFD700" strokeWidth="1.2" />
              <line x1="22" y1="60" x2="38" y2="60" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-1">
              Pouring Your Key...
            </span>
          </motion.div>
        )}

        {phase === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-full border border-gold/40 bg-black/60 px-3 py-1 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
          >
            <Sparkles size={13} className="text-[#FFD700]" />
            <span className="font-mono text-[10px] font-bold text-[#FFD700] tracking-wider uppercase">
              Key Distilled & Sealed
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SignUpWizard({ onNavigate, onSignUpSuccess }) {
  const [step, setStep] = useState(1); // 1 | 2 | 3

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Selected Tier
  const [selectedTier, setSelectedTier] = useState(SUBSCRIPTION_TIERS[2]); // Default Connoisseur

  // API Key & Reveal State
  const [apiKey, setApiKey] = useState('');
  const [isKeyRevealed, setIsKeyRevealed] = useState(false);
  const [revealCountdown, setRevealCountdown] = useState(10);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  // Generate random API key on mount or name change
  useEffect(() => {
    const randomHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setApiKey(`sb_live_${randomHex}`);
  }, []);

  // 10-Second Auto-Mask Countdown
  useEffect(() => {
    let interval;
    if (isKeyRevealed) {
      setRevealCountdown(10);
      interval = setInterval(() => {
        setRevealCountdown((prev) => {
          if (prev <= 1) {
            setIsKeyRevealed(false);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isKeyRevealed]);

  // ── PASSWORD STRENGTH CALCULATION ──────────────────────────────────
  const passwordCriteria = useMemo(() => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    if (!password) return 0;
    return Object.values(passwordCriteria).filter(Boolean).length;
  }, [passwordCriteria, password]);

  const strengthLabel = useMemo(() => {
    if (strengthScore === 0) return { label: 'Empty', color: 'bg-smoke/20', text: 'text-smoke/50', width: '0%' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-400', width: '30%' };
    if (strengthScore === 3) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-400', width: '60%' };
    if (strengthScore === 4) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', width: '85%' };
    return { label: 'Supreme Proof', color: 'bg-gradient-to-r from-[#FFD700] to-amber-300', text: 'text-[#FFD700]', width: '100%' };
  }, [strengthScore]);

  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const isStep1Valid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      email.includes('@') &&
      password.length >= 8 &&
      strengthScore >= 2 &&
      passwordsMatch === true
    );
  }, [name, email, password, strengthScore, passwordsMatch]);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAccountCreated(true);
      if (onSignUpSuccess) {
        onSignUpSuccess({ name, email, tier: selectedTier, apiKey });
      }
    }, 800);
  };

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="mb-5">
        <span className="block font-mono text-[10px] font-bold tracking-[0.25em] text-tarnished-gold uppercase mb-1">
          Pull Up a Stool
        </span>
        <h2 className="font-playfair text-3xl font-black tracking-tight text-[#ede8dc] sm:text-4xl">
          Become a Member
        </h2>
        <p className="mt-1 font-inter text-xs text-smoke sm:text-sm">
          Tell the bartender your name.
        </p>

        {/* ── PROGRESS INDICATOR (01 — 02 — 03) ── */}
        <div className="mt-4 flex items-center gap-3 border-y border-[#1a1a2e] py-2.5 font-mono text-xs font-bold">
          <div className="flex items-center gap-2">
            <span
              className={`transition-colors duration-300 ${
                step === 1 ? 'text-[#FFD700]' : step > 1 ? 'text-[#b8a44e]' : 'text-[#666666]'
              }`}
            >
              01 Details
            </span>
          </div>
          <span className="text-[#333344]">—</span>
          <div className="flex items-center gap-2">
            <span
              className={`transition-colors duration-300 ${
                step === 2 ? 'text-[#FFD700]' : step > 2 ? 'text-[#b8a44e]' : 'text-[#666666]'
              }`}
            >
              02 Stool
            </span>
          </div>
          <span className="text-[#333344]">—</span>
          <div className="flex items-center gap-2">
            <span
              className={`transition-colors duration-300 ${
                step === 3 ? 'text-[#FFD700]' : 'text-[#666666]'
              }`}
            >
              03 Confirm & Pour
            </span>
          </div>
        </div>
      </div>

      {/* ── STEP CONTENT WITH SMOOTH ANIMATED TRANSITIONS ── */}
      <AnimatePresence mode="wait">
        {/* ════════════════════════════════════════════════════════════
            STEP 1: YOUR DETAILS
        ════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35 }}
            className="space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-playfair text-lg font-bold text-[#ede8dc]">Your Details</h3>
                <p className="font-inter text-xs text-smoke">Tell the bartender your name.</p>
              </div>
              <CoasterPenVisual />
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-inter text-xs font-medium text-[#b8a44e] mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full rounded-xl border border-[#1a1a2e] bg-[#0a0a12] px-3.5 py-2.5 pl-10 font-inter text-sm text-light placeholder:text-[#666666] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                />
                <User size={15} className="absolute left-3.5 top-3 text-[#b8a44e]/70" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-inter text-xs font-medium text-[#b8a44e] mb-1">
                Email
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

            {/* Password */}
            <div>
              <label className="block font-inter text-xs font-medium text-[#b8a44e] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#1a1a2e] bg-[#0a0a12] px-3.5 py-2.5 pl-10 pr-10 font-inter text-sm text-light placeholder:text-[#666666] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                />
                <Lock size={15} className="absolute left-3.5 top-3 text-[#b8a44e]/70" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-smoke hover:text-[#FFD700] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-inter text-xs font-medium text-[#b8a44e] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-[#0a0a12] px-3.5 py-2.5 pl-10 pr-10 font-inter text-sm text-light placeholder:text-[#666666] transition-all focus:outline-none focus:ring-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] ${
                    passwordsMatch === false
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                      : passwordsMatch === true
                      ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/30'
                      : 'border-[#1a1a2e] focus:border-[#FFD700] focus:ring-[#FFD700]/30'
                  }`}
                />
                <Lock size={15} className="absolute left-3.5 top-3 text-[#b8a44e]/70" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-smoke hover:text-[#FFD700] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordsMatch === false && (
                <span className="mt-1 block font-inter text-[10px] text-red-400">
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Live Password Strength Meter */}
            {password.length > 0 && (
              <div className="rounded-xl border border-[#1a1a2e] bg-[#07070d] p-2.5 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-smoke">Strength:</span>
                  <span className={`font-mono font-bold ${strengthLabel.text}`}>
                    {strengthLabel.label}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthLabel.color}`}
                    style={{ width: strengthLabel.width }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1 pt-1 text-[9px] font-mono text-smoke">
                  <span className={passwordCriteria.length ? 'text-emerald-400' : ''}>
                    {passwordCriteria.length ? '✓' : '•'} 8+ characters
                  </span>
                  <span className={passwordCriteria.lowercase ? 'text-emerald-400' : ''}>
                    {passwordCriteria.lowercase ? '✓' : '•'} Lowercase
                  </span>
                  <span className={passwordCriteria.uppercase ? 'text-emerald-400' : ''}>
                    {passwordCriteria.uppercase ? '✓' : '•'} Uppercase
                  </span>
                  <span className={passwordCriteria.number ? 'text-emerald-400' : ''}>
                    {passwordCriteria.number ? '✓' : '•'} Number (0-9)
                  </span>
                </div>
              </div>
            )}

            {/* Step 1 Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!isStep1Valid}
                onClick={() => setStep(2)}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] py-3.5 font-inter text-xs font-bold tracking-wider text-[#06060a] uppercase shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all duration-300 hover:bg-[#e6c200] hover:scale-[1.02] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span>Continue to Your Stool</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 2: CHOOSE YOUR STOOL (4 TIERS)
        ════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35 }}
            className="space-y-3"
          >
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#ede8dc]">Choose Your Stool</h3>
              <p className="font-inter text-xs text-smoke">Every member gets a seat. Choose yours.</p>
            </div>

            {/* 4 Tier Cards in Clean Spacious Grid (No Scrollbar) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SUBSCRIPTION_TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`group relative flex flex-col justify-between rounded-xl border p-3.5 sm:p-4 text-left transition-all duration-250 cursor-pointer ${
                      isSelected
                        ? 'border-[#FFD700] bg-gradient-to-b from-[#20182c] via-[#120d1c] to-[#0a0710] shadow-[0_0_20px_rgba(255,215,0,0.25)] ring-1 ring-[#FFD700]/60 -translate-y-0.5'
                        : 'border-[#1a1a2e] bg-[#0a0a12]/85 hover:border-gold/35 hover:-translate-y-1 hover:bg-[#120e1a]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <StoolIcon tier={tier.id} accentColor={tier.accentColor} />
                          <span className="font-mono text-[9px] font-bold text-tarnished-gold uppercase tracking-wider">
                            {tier.accentName}
                          </span>
                        </div>
                        {isSelected ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD700] text-black shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-[#1a1a2e] group-hover:border-gold/40" />
                        )}
                      </div>

                      <h4 className="font-playfair text-base font-bold text-light group-hover:text-[#FFD700] transition-colors">
                        {tier.name}
                      </h4>
                      <p className="font-inter text-[11px] text-smoke leading-relaxed mt-1">
                        {tier.description}
                      </p>
                    </div>

                    <div className="mt-3.5 border-t border-[#1a1a2e] pt-2 flex items-baseline justify-between">
                      <div>
                        <span className="font-playfair text-lg font-black text-[#FFD700]">
                          {tier.price}
                        </span>
                        <span className="font-inter text-xs text-smoke">{tier.period}</span>
                      </div>
                      <span className="font-mono text-[10px] text-tarnished-gold group-hover:text-light transition-colors">
                        {isSelected ? 'Selected' : 'Select Seat →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step 2 Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 rounded-full border border-[#1a1a2e] bg-black/60 px-4 py-3 font-inter text-xs text-smoke hover:text-light transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="group flex-1 flex items-center justify-center gap-2 rounded-full bg-[#FFD700] py-3 font-inter text-xs font-bold tracking-wider text-[#06060a] uppercase shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all hover:bg-[#e6c200] hover:scale-[1.01]"
              >
                <span>Continue to Your Pour</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 3: CONFIRM & REVEAL (MEMBERSHIP CARD & API KEY)
        ════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35 }}
            className="space-y-3"
          >
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#ede8dc]">Confirm Your Pour</h3>
              <p className="font-inter text-xs text-smoke">One last look before we pour.</p>
            </div>

            {/* Shaker Pour Animation */}
            <ShakerPourAnimation />

            {/* ── SMOKED GLASS MEMBERSHIP CARD PREVIEW ── */}
            <div className="relative rounded-2xl border border-[#FFD700]/30 bg-gradient-to-b from-[#1a1426]/90 via-[#0e0a16]/95 to-[#06040a] p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,215,0,0.12)]">
              {/* Gold Inlay Trim */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

              <div className="flex items-center justify-between border-b border-[#1a1a2e] pb-2.5 mb-3">
                <div>
                  <span className="font-playfair text-xs font-black tracking-wider text-[#FFD700]">
                    SUPREME BRAIN
                  </span>
                  <span className="block font-mono text-[9px] text-tarnished-gold">
                    Official Member Card
                  </span>
                </div>
                <span className="rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#FFD700]">
                  {selectedTier.name}
                </span>
              </div>

              {/* Member Name */}
              <div className="mb-3">
                <span className="block font-mono text-[9px] text-smoke uppercase">Patron</span>
                <span className="font-playfair text-base font-bold text-light">
                  {name || 'Marcus Sterling'}
                </span>
              </div>

              {/* Secret API Key Box with 10-Second Reveal Toggle */}
              <div className="rounded-xl border border-[#1a1a2e] bg-[#07070d] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1 font-mono text-[10px] text-smoke">
                    <KeyRound size={12} className="text-[#FFD700]" /> Secret Bar Access Key
                  </span>
                  {isKeyRevealed && (
                    <span className="font-mono text-[9px] text-amber-400 animate-pulse">
                      Masking in {revealCountdown}s
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-xs text-emerald-400 font-semibold truncate tracking-wider">
                    {isKeyRevealed ? apiKey : '••••••••••••••••••••••••'}
                  </code>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsKeyRevealed(!isKeyRevealed)}
                      className="rounded-lg border border-[#FFD700]/30 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-bold text-[#FFD700] hover:bg-[#FFD700]/20 transition-colors"
                    >
                      {isKeyRevealed ? 'Mask' : 'Reveal'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="flex items-center gap-1 rounded-lg border border-[#1a1a2e] bg-black/60 px-2 py-1 font-mono text-[10px] text-smoke hover:text-light transition-colors"
                      title="Copy Key"
                    >
                      {copied ? <CheckCheck size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <p className="mt-2 font-inter text-[10px] text-smoke/80 leading-tight">
                  Keep this key secret. It’s your access to the bar.
                </p>
              </div>
            </div>

            {/* Step 3 Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-full border border-[#1a1a2e] bg-black/60 px-4 py-3 font-inter text-xs text-smoke hover:text-light transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="button"
                disabled={isSubmitting || isAccountCreated}
                onClick={handleFinalSubmit}
                className="group flex-1 flex items-center justify-center gap-2 rounded-full bg-[#FFD700] py-3.5 font-inter text-xs font-bold tracking-wider text-[#06060a] uppercase shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all hover:bg-[#e6c200] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              >
                <Sparkles size={14} />
                <span>{isSubmitting ? 'Distilling Membership...' : 'Pull Up a Stool'}</span>
              </button>
            </div>

            {/* Confetti & Success Banner */}
            {isAccountCreated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3 text-center text-xs text-emerald-300"
              >
                <span className="block font-playfair font-bold text-sm text-[#FFD700] mb-1">
                  🎉 You are now an official member of Supreme Brain.
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="mt-2 inline-flex items-center gap-1 font-inter text-xs font-semibold text-emerald-400 underline hover:text-[#FFD700]"
                >
                  Enter the Speakeasy Room →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECONDARY NAVIGATION ── */}
      <div className="mt-6 border-t border-[#1a1a2e] pt-4 text-center font-inter text-xs text-smoke">
        <span>Already a member? </span>
        <button
          type="button"
          onClick={() => onNavigate('/login')}
          className="font-semibold text-light hover:text-[#FFD700] transition-colors"
        >
          Log In →
        </button>
      </div>
    </div>
  );
}
