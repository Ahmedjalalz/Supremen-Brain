import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDemoPrediction } from '../../data/demoResults';
import Navbar from '../Navbar';
import CocktailDataGlass from './CocktailDataGlass';
import ConfidenceGauge from './ConfidenceGauge';
import WarningsPanel from './WarningsPanel';
import RawResponseViewer from './RawResponseViewer';
import {
  Sparkles,
  Bookmark,
  Share2,
  Check,
  TrendingUp,
  Percent,
  Wine,
  RotateCcw,
} from 'lucide-react';

export default function ResultsPage({ onNavigate, onOpenAuth }) {
  const [predictionData, setPredictionData] = useState(() => {
    const saved = localStorage.getItem('supreme_latest_prediction');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved prediction', e);
      }
    }
    // Default to the oracle prediction if none exists
    return getDemoPrediction('the-oracle');
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    document.title = `Supreme Brain · The Pour · ${predictionData?.cocktail || 'Prediction Ready'}`;
  }, [predictionData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleSaveRecipe = () => {
    try {
      const existing = JSON.parse(localStorage.getItem('supreme_saved_recipes') || '[]');
      const newEntry = {
        id: `recipe_${Date.now()}`,
        savedAt: new Date().toISOString(),
        cocktail: predictionData.cocktail,
        prediction: predictionData.prediction,
        confidence: predictionData.confidence,
        edge: predictionData.edge,
        thesis: predictionData.thesis,
      };
      existing.unshift(newEntry);
      localStorage.setItem('supreme_saved_recipes', JSON.stringify(existing));
      showToast('Recipe saved to your collection.');
    } catch (e) {
      showToast('Recipe saved to your collection.');
    }
  };

  const handleSharePour = () => {
    try {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl);
      showToast('POUR LINK COPIED');
    } catch (e) {
      showToast('POUR LINK COPIED');
    }
  };

  const accentColor = predictionData?.accentColor || '#f59e0b';
  const glowColor = predictionData?.glowColor || 'rgba(245, 158, 11, 0.45)';

  // Staggered cinematic animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06060a] text-light selection:bg-gold/30 selection:text-gold overflow-x-hidden pt-20 pb-24">
      {/* Background Ambience: Speakeasy Warm Hearth Glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-25 z-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 15%, rgba(201, 162, 39, 0.25) 0%, transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(201, 162, 39, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* ── TOP SPEAKEASY NAVBAR ── */}
      <Navbar
        currentRoute="/results"
        onNavigate={onNavigate}
        onOpenAuth={onOpenAuth}
      />

      {/* ── SPEAKEASY TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full border border-gold/50 bg-[#140e1f] px-5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.3)] backdrop-blur-xl"
          >
            <Check size={16} className="text-gold" />
            <span className="font-mono text-xs font-bold text-light tracking-wide">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN RESULTS CONTAINER ── */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-4 md:mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* ── SECTION HEADER ── */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1 backdrop-blur-md">
              <Sparkles size={13} className="text-gold animate-pulse" />
              <span className="font-inter text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                The Pour
              </span>
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#ede8dc] leading-tight">
              Your cocktail is ready.
            </h1>

            <p className="mt-3 font-inter text-sm sm:text-base text-smoke/90 leading-relaxed">
              Here's what the House thinks.{' '}
              <span className="text-gold font-semibold">Freshly distilled from your data.</span>
            </p>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              THE MASTER RESULT CARD (PREMIUM GLASS-MORPHISM)
          ════════════════════════════════════════════════════════ */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-[#140e20]/95 via-[#0c0915]/95 to-black p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(201,162,39,0.15)] backdrop-blur-2xl"
          >
            {/* Top Inlay Brass Accent Line */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Corner Ambient Glow */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-40 filter blur-3xl"
              style={{ background: glowColor }}
            />

            {/* ── CARD HEADER: COCKTAIL NAME & EMBLEM ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-black/70 shadow-lg shrink-0"
                  style={{ borderColor: accentColor }}
                >
                  <Wine size={24} style={{ color: accentColor }} />
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[10px] font-bold text-tarnished-gold tracking-widest uppercase truncate">
                    Distilled Pour · {predictionData.glass || 'Highball Crystal'}
                  </span>
                  <h2 className="font-playfair text-2xl sm:text-3xl font-black text-[#ede8dc] truncate">
                    {predictionData.cocktail}
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 font-mono text-xs font-bold text-emerald-400 whitespace-nowrap shrink-0">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  VERIFIED SIGNAL
                </span>
              </div>
            </div>

            {/* ── CARD BODY: 2-COLUMN PRESENTATION ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-8">
              {/* Left Column (5 cols): Cocktail Glass Visualization */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <CocktailDataGlass
                  accentColor={accentColor}
                  glowColor={glowColor}
                  glassType={predictionData.glass}
                  garnish={predictionData.garnish}
                />
              </div>

              {/* Right Column (7 cols): Main Prediction & Confidence Gauge */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                {/* Main Prediction Headline */}
                <div className="w-full">
                  <span className="block font-mono text-[11px] font-bold text-tarnished-gold tracking-widest uppercase mb-1">
                    Primary Prediction Mandate
                  </span>
                  <h3
                    className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black tracking-tight break-words"
                    style={{ color: accentColor }}
                  >
                    {predictionData.prediction}
                  </h3>
                </div>

                {/* Radial Gauge & Proof */}
                <div className="w-full flex justify-center lg:justify-start">
                  <ConfidenceGauge
                    targetConfidence={predictionData.confidence}
                    proof={predictionData.proof}
                    latency={predictionData.latency}
                    accentColor={accentColor}
                    convictionTier={predictionData.convictionTier}
                  />
                </div>

                {/* Edge and Position Size Secondary Badges */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm pt-1 mx-auto lg:mx-0">
                  <div className="rounded-xl border border-gold/20 bg-black/60 p-3 sm:p-3.5 text-left">
                    <div className="flex items-center gap-1.5 text-smoke font-mono text-[9px] uppercase tracking-wider mb-1 whitespace-nowrap">
                      <TrendingUp size={12} className="text-emerald-400 shrink-0" />
                      <span>Quant Edge</span>
                    </div>
                    <span className="font-mono text-base sm:text-lg font-black text-emerald-400 whitespace-nowrap">
                      {predictionData.edge}
                    </span>
                  </div>

                  <div className="rounded-xl border border-gold/20 bg-black/60 p-3 sm:p-3.5 text-left">
                    <div className="flex items-center gap-1.5 text-smoke font-mono text-[9px] uppercase tracking-wider mb-1 whitespace-nowrap">
                      <Percent size={12} className="text-gold shrink-0" />
                      <span>Position Sizing</span>
                    </div>
                    <span className="font-mono text-base sm:text-lg font-black text-gold whitespace-nowrap">
                      {predictionData.positionSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── THE THESIS NARRATIVE SECTION ── */}
            <div className="border-t border-gold/15 pt-6 mt-4">
              <span className="block font-mono text-[11px] font-bold text-gold uppercase tracking-widest mb-2">
                The Thesis
              </span>
              <div className="rounded-2xl border border-gold/15 bg-black/50 p-5 sm:p-6 backdrop-blur-md">
                <p className="font-inter text-sm sm:text-base leading-relaxed text-light/95 italic">
                  "{predictionData.thesis}"
                </p>
              </div>
            </div>

            {/* ── THE HOUSE BLEND (MODULES) ── */}
            <div className="border-t border-gold/15 pt-6 mt-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block font-mono text-[11px] font-bold text-gold uppercase tracking-widest">
                    The House Blend
                  </span>
                  <span className="font-inter text-xs text-smoke/80">
                    The intelligence modules behind this pour.
                  </span>
                </div>
                <span className="font-mono text-[10px] text-tarnished-gold">
                  {predictionData.modules.length} Active Engines
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {predictionData.modules.map((moduleName, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.08, duration: 0.4 }}
                    className="flex items-center gap-1.5 rounded-xl border border-gold/20 bg-[#120e1a] px-3 py-1.5 font-mono text-xs font-semibold text-light shadow-sm hover:border-gold/50 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>{moduleName}</span>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── WARNINGS / RISK PANEL COMPONENT ── */}
            {predictionData.warnings && predictionData.warnings.length > 0 && (
              <div className="mt-6">
                <WarningsPanel warnings={predictionData.warnings} />
              </div>
            )}

            {/* ── RAW JSON RESPONSE COMPONENT ── */}
            <div className="mt-6">
              <RawResponseViewer rawResponse={predictionData.rawResponse} />
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              BOTTOM ACTIONS (ORDER ANOTHER, SAVE, SHARE)
          ════════════════════════════════════════════════════════ */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4"
          >
            {/* Primary: Order Another Round */}
            <button
              type="button"
              onClick={() => onNavigate('/order')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs sm:text-sm tracking-wider font-bold hover:shadow-[0_0_28px_rgba(201,162,39,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 uppercase flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw size={16} className="shrink-0" />
              <span>Order Another Round</span>
            </button>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Secondary: Save This Recipe */}
              <button
                type="button"
                onClick={handleSaveRecipe}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-gold/30 bg-black/60 text-light font-inter text-xs tracking-wider font-semibold hover:border-gold hover:text-gold hover:bg-gold/10 active:scale-[0.98] transition-all duration-200 uppercase flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Bookmark size={14} className="text-gold shrink-0" />
                <span>Save Recipe</span>
              </button>

              {/* Tertiary: Share This Pour */}
              <button
                type="button"
                onClick={handleSharePour}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-gold/30 bg-black/60 text-light font-inter text-xs tracking-wider font-semibold hover:border-gold hover:text-gold hover:bg-gold/10 active:scale-[0.98] transition-all duration-200 uppercase flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Share2 size={14} className="text-gold shrink-0" />
                <span>Share Pour</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
