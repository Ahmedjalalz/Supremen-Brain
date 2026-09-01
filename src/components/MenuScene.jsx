import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Cpu,
  Flame,
  ShieldCheck,
  Award,
  Crown,
  Terminal,
  ArrowRight,
  Check,
  Code,
  Sliders,
  Layers,
  Activity,
  X,
} from 'lucide-react';

// ── MENU COCKTAILS DATA ──────────────────────────────────────────────
const MENU_COCKTAILS = [
  {
    id: 'the-oracle',
    name: 'The Oracle',
    subtitle: 'The Full-Power Intelligence Engine',
    tagline: 'The centerpiece / full-power cocktail. The one that sees everything.',
    flavorNotes: 'Deep, Omniscient & Uncompromising',
    proof: '94 Proof',
    latency: '~180ms',
    tier: 'Premium Centerpiece',
    icon: Crown,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    borderGlow: 'hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    modules: [
      'LSTM',
      'CNN',
      'Monte Carlo',
      'XGBoost',
      'Bayesian',
      'Calibration',
      'Kelly',
    ],
    recipe: 'Equal parts temporal deep recurrent networks and Bayesian posterior probability distributions, stirred over 10,000 stochastic paths.',
    endpoint: '/v1/pour/oracle',
    sampleResponse: {
      cocktail: 'The Oracle',
      prediction: 'HIGH_CONVICTION_WIN',
      confidence: 0.944,
      edge: '+11.2%',
      latency_ms: 178,
    },
    popular: true,
  },
  {
    id: 'the-edge',
    name: 'The Edge',
    subtitle: 'Ultra-Low Latency Dislocation Arbitrage',
    tagline: 'Finds the mispricing others miss. The fast, surgical cocktail.',
    flavorNotes: 'Sharp, Surgical & Immediate',
    proof: '91 Proof',
    latency: '~40ms',
    tier: 'Sub-50ms Execution',
    icon: Zap,
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    borderGlow: 'hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    modules: [
      'Probability',
      'Edge Calc',
      'Kelly',
      'Vig Removal',
      'Calibration',
    ],
    recipe: 'Stripped-down microsecond probability differential, de-vigged market lines, and instant Kelly-weighted bankroll allocations.',
    endpoint: '/v1/pour/edge',
    sampleResponse: {
      cocktail: 'The Edge',
      prediction: 'MARKET_INEFFICIENCY_LONG',
      confidence: 0.912,
      edge: '+7.8%',
      latency_ms: 38,
    },
  },
  {
    id: 'the-shaker',
    name: 'The Shaker',
    subtitle: 'Massive Parallel Stochastic Simulator',
    tagline: '10,000 futures in 200 milliseconds. Represents simulation and probability.',
    flavorNotes: 'Effervescent, Volatile & Multi-Branched',
    proof: '89 Proof',
    latency: '~200ms',
    tier: 'GPU Parallel Sim',
    icon: Activity,
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    borderGlow: 'hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    modules: [
      'Monte Carlo',
      'GPU Acceleration',
      'Probability',
      'Confidence Intervals',
      'Tail Risk',
    ],
    recipe: '10,000 independent GPU simulations shaken vigorously to extract fat-tail distributions and 95% confidence bounds.',
    endpoint: '/v1/pour/shaker',
    sampleResponse: {
      cocktail: 'The Shaker',
      prediction: 'SIMULATED_DISTRIBUTION_MEAN',
      confidence: 0.891,
      simulations_run: 10000,
      latency_ms: 194,
    },
  },
  {
    id: 'the-bitter',
    name: 'The Bitter',
    subtitle: 'Contrarian Market Dislocation',
    tagline: 'The contrarian drink. When the crowd is wrong, this finds it.',
    flavorNotes: 'Dark, Astringent & Anti-Consensus',
    proof: '86 Proof',
    latency: '~120ms',
    tier: 'Contrarian Alpha',
    icon: Flame,
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    borderGlow: 'hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]',
    modules: [
      'Contrarian Detector',
      'Sentiment Inverse',
      'Mean Regression',
      'Value Finder',
      'Calibration',
    ],
    recipe: 'Distilled crowd sentiment inverted against historical mean reversion thresholds to capture irrational public bias.',
    endpoint: '/v1/pour/bitter',
    sampleResponse: {
      cocktail: 'The Bitter',
      prediction: 'FADE_PUBLIC_HEAVY_FAVORITE',
      confidence: 0.865,
      public_sentiment: '88%_OVERVALUED',
      latency_ms: 118,
    },
  },
  {
    id: 'the-reserve',
    name: 'The Reserve',
    subtitle: 'Institutional Audit-Grade Intelligence',
    tagline: 'The top shelf. For clients who need the audit trail. Full attribution.',
    flavorNotes: 'Aged, Precise & Fully Documented',
    proof: '94 Proof',
    latency: '~500ms',
    tier: 'Top Shelf Only',
    icon: ShieldCheck,
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    borderGlow: 'hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    modules: [
      '100K Simulations',
      'Factor Decomposition',
      'Confidence Attribution',
      'Audit Trail',
    ],
    recipe: '100,000 institutional-grade path runs with full Shapley-value factor decomposition and step-by-step cryptographic audit logs.',
    endpoint: '/v1/pour/reserve',
    sampleResponse: {
      cocktail: 'The Reserve',
      prediction: 'ENTERPRISE_GRADE_ALLOCATION',
      confidence: 0.948,
      audit_hash: '0x8f4b...c391',
      latency_ms: 492,
    },
    topShelf: true,
  },
  {
    id: 'the-last-word',
    name: 'The Last Word',
    subtitle: 'Meta-Ensemble Supreme Consensus',
    tagline: 'The final / ultimate cocktail. One question. One answer. No hedging.',
    flavorNotes: 'The Ultimate Pour. Definitive & Potent',
    proof: '96 Proof',
    latency: '~800ms',
    tier: 'Highest Conviction',
    icon: Award,
    accentColor: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.5)',
    borderGlow: 'hover:border-teal-500/60 hover:shadow-[0_0_35px_rgba(20,184,166,0.3)]',
    modules: [
      'Meta-Ensemble',
      'Cross-Cocktail Consensus',
      'Confidence Weighting',
      'Conflict Resolution',
    ],
    recipe: 'The ultimate synthesis. Pools and weights output from all 5 other pipelines, resolving internal conflicts into one final unhedged mandate.',
    endpoint: '/v1/pour/last-word',
    sampleResponse: {
      cocktail: 'The Last Word',
      prediction: 'FINAL_SUPREME_CONSENSUS',
      confidence: 0.967,
      proof: 96,
      latency_ms: 785,
    },
    ultimate: true,
  },
];

export default function MenuScene() {
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredCocktails = MENU_COCKTAILS.filter((c) => {
    if (activeFilter === 'PREMIUM') return c.popular || c.topShelf || c.ultimate;
    if (activeFilter === 'SPEED') return parseInt(c.latency.replace(/\D/g, '')) < 150;
    if (activeFilter === 'STOCHASTIC') return c.modules.includes('Monte Carlo') || c.modules.includes('100K Simulations');
    return true;
  });

  return (
    <section
      id="the-menu"
      className="relative w-full bg-[#06060a] py-24 px-4 sm:px-6 lg:px-8 text-light overflow-hidden"
    >
      {/* Background Ambience: Speakeasy Wood & Warm Lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 20%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,162,39,0.2) 40px, rgba(201,162,39,0.2) 41px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── SECTION HEADER ── */}
        <div className="mb-14 text-center md:mb-20">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1 backdrop-blur-md">
            <Sparkles size={13} className="text-gold animate-pulse" />
            <span className="font-inter text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
              The Cocktail Menu
            </span>
          </div>

          <h2 className="font-playfair text-3xl font-black tracking-tight text-[#ede8dc] sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            The Menu
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-inter text-base md:text-lg text-smoke/90 leading-relaxed">
            Six cocktails. Each one a different intelligence pipeline.{' '}
            <span className="text-gold font-semibold">Pick your poison.</span>
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'ALL', label: 'All Cocktails' },
              { id: 'PREMIUM', label: 'Top Shelf & Meta' },
              { id: 'SPEED', label: 'Sub-150ms Speed' },
              { id: 'STOCHASTIC', label: 'Monte Carlo Engines' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-full px-4 py-1.5 font-inter text-xs font-medium tracking-wider transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'border border-gold bg-gold/20 text-gold shadow-[0_0_15px_rgba(201,162,39,0.3)]'
                    : 'border border-gold/15 bg-black/40 text-smoke/80 hover:border-gold/30 hover:text-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── SIX COCKTAIL CARDS GRID ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCocktails.map((cocktail) => {
            const IconComponent = cocktail.icon;

            return (
              <motion.div
                key={cocktail.id}
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => setSelectedCocktail(cocktail)}
                className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-[#140e1f]/85 via-[#0b0812]/90 to-black p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 ${cocktail.borderGlow}`}
              >
                {/* Signature Neon Ambient Liquid Glow in Top Corner */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full opacity-30 transition-opacity duration-500 group-hover:opacity-60 filter blur-2xl"
                  style={{ background: cocktail.glowColor }}
                />

                {/* Top Bar / Category Tag */}
                <div>
                  <div className="flex items-center justify-between border-b border-gold/15 pb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg border bg-black/60"
                        style={{ borderColor: `${cocktail.accentColor}50` }}
                      >
                        <IconComponent size={16} style={{ color: cocktail.accentColor }} />
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] font-bold tracking-wider text-tarnished-gold uppercase">
                          {cocktail.tier}
                        </span>
                        <h3 className="font-playfair text-lg font-bold text-[#ede8dc] group-hover:text-gold transition-colors">
                          {cocktail.name}
                        </h3>
                      </div>
                    </div>

                    {cocktail.popular && (
                      <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-400">
                        SIGNATURE
                      </span>
                    )}
                    {cocktail.topShelf && (
                      <span className="rounded-full border border-purple-500/40 bg-purple-500/15 px-2 py-0.5 font-mono text-[9px] font-bold text-purple-400">
                        TOP SHELF
                      </span>
                    )}
                    {cocktail.ultimate && (
                      <span className="rounded-full border border-teal-500/40 bg-teal-500/15 px-2 py-0.5 font-mono text-[9px] font-bold text-teal-300">
                        ULTIMATE
                      </span>
                    )}
                  </div>

                  {/* Tagline & Flavor Notes */}
                  <p className="mt-3.5 font-inter text-xs leading-relaxed text-light/90 font-medium">
                    {cocktail.tagline}
                  </p>
                  <p className="mt-1.5 font-inter text-[11px] italic text-smoke/80">
                    "{cocktail.flavorNotes}"
                  </p>

                  {/* Module Ingredients Pills */}
                  <div className="mt-4">
                    <span className="block font-mono text-[9px] font-semibold text-tarnished-gold uppercase tracking-wider mb-2">
                      Pipeline Modules
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cocktail.modules.map((mod, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-gold/15 bg-black/60 px-2 py-0.5 font-mono text-[9px] font-semibold text-light/80 transition-colors group-hover:border-gold/30 group-hover:text-gold"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Proof, Latency & CTA */}
                <div className="mt-6 border-t border-gold/15 pt-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="block font-mono text-[8px] text-smoke uppercase">Proof</span>
                        <span className="font-mono text-xs font-bold text-gold">{cocktail.proof}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-smoke uppercase">Latency</span>
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {cocktail.latency}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-gold group-hover:translate-x-1 transition-transform">
                      Inspect <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── COCKTAIL DETAIL MODAL / DRAWER ── */}
        <AnimatePresence>
          {selectedCocktail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCocktail(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/40 bg-gradient-to-b from-[#1a1226] via-[#0d0915] to-[#060408] p-6 shadow-2xl sm:p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCocktail(null)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-black/60 text-smoke hover:text-gold hover:border-gold transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border bg-black/60 shadow-lg"
                    style={{ borderColor: selectedCocktail.accentColor }}
                  >
                    {React.createElement(selectedCocktail.icon, {
                      size: 24,
                      style: { color: selectedCocktail.accentColor },
                    })}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-tarnished-gold uppercase">
                      {selectedCocktail.tier}
                    </span>
                    <h3 className="font-playfair text-2xl font-bold text-[#ede8dc]">
                      {selectedCocktail.name}
                    </h3>
                  </div>
                </div>

                {/* Description & Recipe */}
                <p className="mt-4 font-inter text-sm text-light/90 leading-relaxed">
                  {selectedCocktail.tagline}
                </p>

                <div className="mt-4 rounded-xl border border-gold/15 bg-black/50 p-3.5">
                  <span className="block font-mono text-[9px] font-bold text-gold uppercase tracking-wider mb-1">
                    Bartender's Recipe & Mixing Method
                  </span>
                  <p className="font-inter text-xs text-smoke/95 leading-relaxed">
                    {selectedCocktail.recipe}
                  </p>
                </div>

                {/* Proof, Latency & Endpoint */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-y border-gold/15 py-3 text-center">
                  <div>
                    <span className="block font-mono text-[9px] text-smoke uppercase">Proof Rating</span>
                    <span className="font-mono text-sm font-bold text-gold">{selectedCocktail.proof}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-smoke uppercase">Response Latency</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">{selectedCocktail.latency}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-smoke uppercase">REST Endpoint</span>
                    <span className="font-mono text-xs font-semibold text-light">{selectedCocktail.endpoint}</span>
                  </div>
                </div>

                {/* Live Sample JSON Response */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] text-smoke flex items-center gap-1">
                      <Code size={12} /> Sample JSON Pour Output
                    </span>
                    <span className="font-mono text-[9px] text-emerald-400">HTTP 200 OK</span>
                  </div>
                  <pre className="overflow-x-auto rounded-lg border border-gold/15 bg-black/80 p-3 font-mono text-[10px] text-emerald-400">
                    {JSON.stringify(selectedCocktail.sampleResponse, null, 2)}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedCocktail(null)}
                    className="rounded-full border border-gold/20 bg-black/50 px-4 py-2 font-inter text-xs font-medium text-smoke hover:text-gold transition-colors"
                  >
                    Close Menu
                  </button>
                  <a
                    href="#pull-up-a-stool"
                    onClick={() => setSelectedCocktail(null)}
                    className="rounded-full bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] px-5 py-2 font-inter text-xs font-semibold uppercase tracking-wider text-[#0a0804] shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:scale-105 transition-transform flex items-center gap-1.5"
                  >
                    <span>Order This Pour</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
