import React from 'react';
import { motion } from 'framer-motion';
import { Wine, ShieldCheck, Crown, Flame, Download, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import PouringRhythmChart from '../PouringRhythmChart';
import { generateLedgerCSV } from '../../../data/dashboard';

export default function UsageTab({ usage, history, onShowToast }) {
  const handleDownloadLedger = () => {
    try {
      const csv = generateLedgerCSV(history);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'supreme-brain-ledger.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onShowToast) {
        onShowToast({
          title: 'Ledger Exported',
          message: 'Downloaded supreme-brain-ledger.csv to your device.',
        });
      }
    } catch (err) {
      console.error('Failed to export CSV', err);
    }
  };

  const metricCards = [
    {
      title: 'Pours This Month',
      value: usage.poursThisMonth.toLocaleString(),
      subtext: '+14% vs last cycle',
      icon: Wine,
      accent: '#f59e0b',
      borderGlow: 'hover:border-amber-500/40',
    },
    {
      title: 'Average Confidence',
      value: `${usage.averageConfidenceProof} Proof`,
      subtext: 'High-conviction distillation',
      icon: ShieldCheck,
      accent: '#10b981',
      borderGlow: 'hover:border-emerald-500/40',
    },
    {
      title: 'Most Used Cocktail',
      value: usage.mostUsedCocktail,
      subtext: '542 orders · Full pipeline',
      icon: Crown,
      accent: '#FFD700',
      borderGlow: 'hover:border-gold/40',
    },
    {
      title: 'Pours Remaining',
      value: usage.poursRemaining.toLocaleString(),
      subtext: `Cap: ${usage.totalPoursAllowance.toLocaleString()} monthly`,
      icon: Flame,
      accent: '#06b6d4',
      borderGlow: 'hover:border-cyan-500/40',
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
            YOUR TAB
          </span>
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-black text-light tracking-tight">
          What you've poured this month.
        </h1>
        <p className="font-inter text-sm sm:text-base text-smoke/80 mt-1.5 max-w-2xl leading-relaxed">
          A look behind the bar at your activity, appetite, and remaining pours.
        </p>
      </div>

      {/* ── 4 METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`group relative rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] ${card.borderGlow}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-smoke/75 uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: `${card.accent}15`,
                    borderColor: `${card.accent}35`,
                    color: card.accent,
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div className="font-playfair text-2xl sm:text-3xl font-bold text-light tracking-tight group-hover:text-gold transition-colors">
                {card.value}
              </div>

              <div className="font-inter text-xs text-smoke/70 mt-1.5 flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-gold/50" />
                <span>{card.subtext}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── USAGE CHART: POURING RHYTHM ── */}
      <div className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gold/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-gold" />
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-light">
                Your Pouring Rhythm
              </h3>
            </div>
            <p className="font-inter text-xs sm:text-sm text-smoke/80 mt-0.5">
              Prediction volume over time across the speakeasy ledger.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gold/10 border border-gold/25 px-3 py-1 font-mono text-[11px] text-gold">
              30-Day Window
            </span>
          </div>
        </div>

        <PouringRhythmChart data={usage.dailyPours} />
      </div>

      {/* ── THE HOUSE BLEND BREAKDOWN ── */}
      <div className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gold/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-gold" />
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-light">
                The House Blend
              </h3>
            </div>
            <p className="font-inter text-xs sm:text-sm text-smoke/80 mt-0.5">
              Which ingredients have been working behind the bar.
            </p>
          </div>

          <div className="font-mono text-xs text-smoke/70">
            5 ML Distillation Engines
          </div>
        </div>

        {/* Stacked Multi-Bar Visual */}
        <div className="space-y-4">
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-black/60 p-0.5 border border-gold/15">
            {usage.houseBlend.map((item) => (
              <div
                key={item.name}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all hover:opacity-90 cursor-help"
                title={`${item.name}: ${item.percentage}% (${item.desc})`}
              />
            ))}
          </div>

          {/* Module Pill Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {usage.houseBlend.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-gold/10 bg-[#06060a]/60 p-3.5 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-inter text-xs font-semibold text-light">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-gold">
                    {item.percentage}%
                  </span>
                </div>
                <div className="font-inter text-[11px] text-smoke/70 leading-tight">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar Action: Download Ledger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-5 border-t border-gold/[0.08]">
          <div className="font-mono text-xs text-smoke/60">
            Ledger recorded in local client memory · Formatted as RFC 4180 CSV
          </div>

          <button
            onClick={handleDownloadLedger}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gold/30 bg-black/40 text-gold hover:text-[#FFF] hover:border-gold hover:bg-gold/10 font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(201,162,39,0.08)] active:scale-[0.98]"
          >
            <Download size={15} />
            <span>DOWNLOAD LEDGER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
