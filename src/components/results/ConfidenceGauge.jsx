import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function ConfidenceGauge({
  targetConfidence = 94,
  proof = 94,
  latency = 180,
  accentColor = '#f59e0b',
  convictionTier = 'HIGH CONVICTION',
}) {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  // Smooth counter animation from 0 -> target in 1.0 second
  useEffect(() => {
    let startTimestamp = null;
    const duration = 1000; // 1s
    const startVal = 0;
    const targetVal = targetConfidence;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedConfidence(Math.round(startVal + (targetVal - startVal) * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [targetConfidence]);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (targetConfidence / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* ── RADIAL CONFIDENCE GAUGE ── */}
      <div className="relative flex h-48 w-48 items-center justify-center overflow-visible">
        {/* Smooth Radial Glow Aura - Naturally fades to 0 opacity inside limits with no bounding cutoffs */}
        <div
          className="pointer-events-none absolute h-40 w-40 rounded-full opacity-35 filter blur-md"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, ${accentColor}35 45%, transparent 72%)`,
          }}
        />

        <svg
          className="h-full w-full -rotate-90 transform overflow-visible"
          viewBox="0 0 190 190"
          style={{ overflow: 'visible' }}
        >
          {/* Background Track */}
          <circle
            cx="95"
            cy="95"
            r={radius}
            stroke="rgba(201, 162, 39, 0.15)"
            strokeWidth="10"
            fill="transparent"
          />

          {/* Animated Gauge Ring with Natural Glow */}
          <motion.circle
            cx="95"
            cy="95"
            r={radius}
            stroke={accentColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 5px ${accentColor})`,
            }}
          />
        </svg>

        {/* Center Digital Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-playfair text-4xl sm:text-5xl font-black text-[#ede8dc] tracking-tight">
            {animatedConfidence}%
          </span>
          <span className="font-mono text-[9px] font-bold tracking-widest text-tarnished-gold uppercase mt-0.5">
            Confidence
          </span>
        </div>
      </div>

      {/* Conviction Badge */}
      <div className="mt-2">
        <span
          className="rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider shadow-sm"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
            border: `1px solid ${accentColor}50`,
          }}
        >
          {convictionTier}
        </span>
      </div>

      {/* Proof & Latency Metrics Bar */}
      <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-[280px]">
        {/* Proof Rating */}
        <div className="flex items-center gap-2 rounded-xl border border-gold/15 bg-black/60 p-2.5 text-left backdrop-blur-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-gold/30 bg-gold/10">
            <ShieldCheck size={14} className="text-gold" />
          </div>
          <div>
            <span className="block font-mono text-[8px] text-smoke uppercase tracking-wider">
              Purity
            </span>
            <span className="font-mono text-xs font-bold text-gold">
              {proof} PROOF
            </span>
          </div>
        </div>

        {/* Latency */}
        <div className="flex items-center gap-2 rounded-xl border border-gold/15 bg-black/60 p-2.5 text-left backdrop-blur-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/40">
            <Clock size={14} className="text-emerald-400" />
          </div>
          <div>
            <span className="block font-mono text-[8px] text-smoke uppercase tracking-wider">
              Inference
            </span>
            <span className="font-mono text-xs font-bold text-emerald-400">
              {latency}ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
