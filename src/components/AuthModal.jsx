import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  KeyRound,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Status message
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync mode when initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStatusMessage(null);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // ── LIVE PASSWORD STRENGTH CALCULATION ──────────────────────────────
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
    const passed = Object.values(passwordCriteria).filter(Boolean).length;
    return passed;
  }, [passwordCriteria, password]);

  const strengthMeta = useMemo(() => {
    if (strengthScore === 0) return { label: 'Empty', color: 'bg-smoke/20', text: 'text-smoke/50', width: '0%' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-400', width: '30%' };
    if (strengthScore === 3) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-400', width: '60%' };
    if (strengthScore === 4) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', width: '85%' };
    return { label: 'Supreme Proof', color: 'bg-gradient-to-r from-gold to-amber-300', text: 'text-gold', width: '100%' };
  }, [strengthScore]);

  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'signin') {
        setStatusMessage({
          type: 'success',
          text: `Welcome back to the speakeasy. Stool unlocked for ${email}.`,
        });
        setTimeout(() => onClose(), 1200);
      } else if (mode === 'signup') {
        if (strengthScore < 3) {
          setStatusMessage({
            type: 'error',
            text: 'Please choose a stronger password to secure your secret recipe key.',
          });
          return;
        }
        if (!passwordsMatch) {
          setStatusMessage({
            type: 'error',
            text: 'The passwords do not match.',
          });
          return;
        }
        setStatusMessage({
          type: 'success',
          text: `Stool reserved! Welcome aboard, ${name || 'Patron'}.`,
        });
        setTimeout(() => onClose(), 1200);
      } else if (mode === 'forgot') {
        setStatusMessage({
          type: 'success',
          text: `A secret brass recovery key was dispatched to ${email}.`,
        });
      }
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* ── BACKDROP ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* ── MODAL CARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-[#140e1f]/95 via-[#0c0814]/98 to-[#050408] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(201,162,39,0.15)] backdrop-blur-2xl z-10"
          >
            {/* Top Brass Inlay Line */}
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full border border-gold/15 text-smoke/70 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-colors"
            >
              <X size={16} />
            </button>

            {/* ── HEADER WITH EMBLEM ── */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-b from-gold/20 to-black/80 shadow-[0_0_20px_rgba(201,162,39,0.25)]">
                <KeyRound size={20} className="text-gold" />
              </div>

              <h3 className="font-playfair text-2xl font-black tracking-tight text-[#ede8dc]">
                {mode === 'signin' && 'Pull Up a Stool'}
                {mode === 'signup' && 'Claim Your Stool'}
                {mode === 'forgot' && 'Lost Your Key?'}
              </h3>

              <p className="mt-1 font-inter text-xs text-smoke/80">
                {mode === 'signin' && 'Enter the speakeasy and access your prediction pipeline.'}
                {mode === 'signup' && 'Reserve your private seat and start pouring intelligence.'}
                {mode === 'forgot' && 'Enter your email address and we will dispatch a recovery link.'}
              </p>
            </div>

            {/* ── MODE SWITCH TABS (Sign In / Sign Up) ── */}
            {mode !== 'forgot' && (
              <div className="mb-6 flex rounded-xl border border-gold/20 bg-black/60 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setStatusMessage(null);
                  }}
                  className={`flex-1 rounded-lg py-2 font-inter text-xs font-semibold tracking-wide transition-all ${
                    mode === 'signin'
                      ? 'bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] shadow-[0_0_12px_rgba(201,162,39,0.25)]'
                      : 'text-smoke hover:text-light'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setStatusMessage(null);
                  }}
                  className={`flex-1 rounded-lg py-2 font-inter text-xs font-semibold tracking-wide transition-all ${
                    mode === 'signup'
                      ? 'bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] shadow-[0_0_12px_rgba(201,162,39,0.25)]'
                      : 'text-smoke hover:text-light'
                  }`}
                >
                  Claim a Stool
                </button>
              </div>
            )}

            {/* ── STATUS MESSAGE BANNER ── */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 flex items-center gap-2 rounded-xl p-3 text-xs border ${
                  statusMessage.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
                    : 'border-red-500/30 bg-red-950/40 text-red-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <Check size={16} className="text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </motion.div>
            )}

            {/* ── AUTH FORM ── */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block font-mono text-[10px] font-semibold tracking-wider text-tarnished-gold uppercase mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Sterling"
                      className="w-full rounded-xl border border-gold/15 bg-black/60 px-3.5 py-2.5 pl-10 font-inter text-sm text-light placeholder:text-smoke/40 transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    />
                    <User size={15} className="absolute left-3.5 top-3 text-tarnished-gold/60" />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block font-mono text-[10px] font-semibold tracking-wider text-tarnished-gold uppercase mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@speakeasy.com"
                    className="w-full rounded-xl border border-gold/15 bg-black/60 px-3.5 py-2.5 pl-10 font-inter text-sm text-light placeholder:text-smoke/40 transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                  />
                  <Mail size={15} className="absolute left-3.5 top-3 text-tarnished-gold/60" />
                </div>
              </div>

              {/* Password (Sign In & Sign Up) */}
              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-[10px] font-semibold tracking-wider text-tarnished-gold uppercase">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setStatusMessage(null);
                        }}
                        className="font-inter text-[11px] text-smoke hover:text-gold transition-colors"
                      >
                        Forgot Key?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-gold/15 bg-black/60 px-3.5 py-2.5 pl-10 pr-10 font-inter text-sm text-light placeholder:text-smoke/40 transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    />
                    <Lock size={15} className="absolute left-3.5 top-3 text-tarnished-gold/60" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-smoke/70 hover:text-gold transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block font-mono text-[10px] font-semibold tracking-wider text-tarnished-gold uppercase mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className={`w-full rounded-xl border bg-black/60 px-3.5 py-2.5 pl-10 pr-10 font-inter text-sm text-light placeholder:text-smoke/40 transition-all focus:outline-none focus:ring-1 ${
                        passwordsMatch === false
                          ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                          : passwordsMatch === true
                          ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/30'
                          : 'border-gold/15 focus:border-gold focus:ring-gold/30'
                      }`}
                    />
                    <Lock size={15} className="absolute left-3.5 top-3 text-tarnished-gold/60" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3 text-smoke/70 hover:text-gold transition-colors"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {passwordsMatch === false && (
                    <span className="mt-1 block font-inter text-[10px] text-red-400">
                      Passwords do not match
                    </span>
                  )}
                  {passwordsMatch === true && (
                    <span className="mt-1 block font-inter text-[10px] text-emerald-400">
                      ✓ Passwords match
                    </span>
                  )}
                </div>
              )}

              {/* ── LIVE PASSWORD STRENGTH METER & CHECKLIST (Sign Up only) ── */}
              {mode === 'signup' && password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="rounded-xl border border-gold/15 bg-black/40 p-3 text-xs space-y-2"
                >
                  {/* Strength Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-smoke">Password Strength:</span>
                      <span className={`font-mono font-bold ${strengthMeta.text}`}>
                        {strengthMeta.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/80 overflow-hidden border border-gold/10">
                      <motion.div
                        className={`h-full rounded-full ${strengthMeta.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: strengthMeta.width }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Requirements List */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordCriteria.length ? 'text-emerald-400' : 'text-smoke/60'
                      }`}
                    >
                      <Check size={12} className={passwordCriteria.length ? 'opacity-100' : 'opacity-30'} />
                      <span>8+ characters</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordCriteria.lowercase ? 'text-emerald-400' : 'text-smoke/60'
                      }`}
                    >
                      <Check size={12} className={passwordCriteria.lowercase ? 'opacity-100' : 'opacity-30'} />
                      <span>Lowercase letter</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordCriteria.uppercase ? 'text-emerald-400' : 'text-smoke/60'
                      }`}
                    >
                      <Check size={12} className={passwordCriteria.uppercase ? 'opacity-100' : 'opacity-30'} />
                      <span>Uppercase letter</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordCriteria.number ? 'text-emerald-400' : 'text-smoke/60'
                      }`}
                    >
                      <Check size={12} className={passwordCriteria.number ? 'opacity-100' : 'opacity-30'} />
                      <span>Number (0-9)</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 col-span-2 ${
                        passwordCriteria.special ? 'text-emerald-400' : 'text-smoke/60'
                      }`}
                    >
                      <Check size={12} className={passwordCriteria.special ? 'opacity-100' : 'opacity-30'} />
                      <span>Special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Remember Me Checkbox (Sign In only) */}
              {mode === 'signin' && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gold/30 bg-black/80 text-gold focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-inter text-xs text-smoke/90">Keep my stool reserved</span>
                  </label>
                </div>
              )}

              {/* ── SUBMIT BUTTON ── */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] py-3 font-inter text-xs font-bold tracking-wider text-[#0a0804] uppercase shadow-[0_0_20px_rgba(201,162,39,0.25)] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] active:scale-[0.99] disabled:opacity-70"
                >
                  <span>
                    {isLoading
                      ? 'Authenticating...'
                      : mode === 'signin'
                      ? 'Enter the Speakeasy'
                      : mode === 'signup'
                      ? 'Reserve & Enter'
                      : 'Dispatch Recovery Key'}
                  </span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Forgot Password Back Button */}
              {mode === 'forgot' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setStatusMessage(null);
                    }}
                    className="font-inter text-xs text-smoke hover:text-gold transition-colors"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
