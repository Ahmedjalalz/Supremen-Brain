import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginForm({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Simulate authentic authentication verification
    setTimeout(() => {
      setIsLoading(false);

      // Example demo validation (can be any email with 6+ password)
      if (!email.includes('@') || password.length < 6) {
        setErrorMessage('Incorrect email or password');
        setShakeKey((prev) => prev + 1);
        return;
      }

      if (onLoginSuccess) {
        onLoginSuccess(email);
      }
    }, 650);
  };

  return (
    <motion.div
      key={shakeKey}
      animate={errorMessage ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* ── HEADER ── */}
      <div className="mb-6">
        <span className="block font-mono text-[10px] font-bold tracking-[0.25em] text-tarnished-gold uppercase mb-1">
          Welcome Back
        </span>
        <h2 className="font-playfair text-3xl font-black tracking-tight text-[#ede8dc] sm:text-4xl">
          Pull Up a Stool
        </h2>
        <p className="mt-1.5 font-inter text-xs text-smoke sm:text-sm">
          The bar is open. Step back in.
        </p>
      </div>

      {/* ── ERROR MESSAGE ── */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-xl border border-amber-600/30 bg-amber-950/30 px-3.5 py-2.5 text-xs text-[#c5a448] flex items-center justify-between"
        >
          <span>{errorMessage}</span>
          <span className="font-mono text-[10px] text-tarnished-gold/70">Verify key</span>
        </motion.div>
      )}

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block font-inter text-xs font-medium text-[#b8a44e] mb-1.5">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="your@email.com"
              className="w-full rounded-xl border border-[#1a1a2e] bg-[#0a0a12] px-3.5 py-2.5 pl-10 font-inter text-sm text-light placeholder:text-[#666666] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            />
            <Mail size={15} className="absolute left-3.5 top-3 text-[#b8a44e]/70" />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-inter text-xs font-medium text-[#b8a44e]">
              Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate('/forgot-password')}
              className="font-inter text-xs text-smoke hover:text-[#FFD700] transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#1a1a2e] bg-[#0a0a12] px-3.5 py-2.5 pl-10 pr-10 font-inter text-sm text-light placeholder:text-[#666666] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            />
            <Lock size={15} className="absolute left-3.5 top-3 text-[#b8a44e]/70" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-smoke hover:text-[#FFD700] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#1a1a2e] bg-[#0a0a12] text-[#FFD700] focus:ring-0 focus:ring-offset-0 h-4 w-4 accent-[#FFD700]"
            />
            <span className="font-inter text-xs text-smoke">Keep my stool reserved</span>
          </label>
        </div>

        {/* Primary Gold Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] py-3.5 font-inter text-xs font-bold tracking-wider text-[#06060a] uppercase shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all duration-300 hover:bg-[#e6c200] hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(255,215,0,0.4)] active:scale-[0.99] disabled:opacity-70"
          >
            <span>{isLoading ? 'Unlocking Stool...' : 'Pull Up a Stool'}</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </form>

      {/* ── SECONDARY NAVIGATION ── */}
      <div className="mt-8 border-t border-[#1a1a2e] pt-5 text-center space-y-2 font-inter text-xs text-smoke">
        <div>
          <span>Forgot your key? </span>
          <button
            type="button"
            onClick={() => onNavigate('/forgot-password')}
            className="font-medium text-[#b8a44e] hover:text-[#FFD700] transition-colors"
          >
            Recover Password
          </button>
        </div>

        <div>
          <span>New to the bar? </span>
          <button
            type="button"
            onClick={() => onNavigate('/signup')}
            className="font-semibold text-light hover:text-[#FFD700] transition-colors"
          >
            Pull Up a Stool →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
