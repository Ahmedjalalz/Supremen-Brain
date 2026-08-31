import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Database,
  Upload,
  Webhook,
  Radio,
  Cpu,
  Sparkles,
  Activity,
  CheckCircle2,
  TrendingUp,
  Layers,
  ShieldCheck,
  Code,
  Terminal,
  ArrowRight,
  Flame,
} from 'lucide-react';

// ── STATION 1: DATA BEAKER INGREDIENT CANVAS ─────────────────────────
function BeakerDataCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const width = 280;
    const height = 240;
    canvas.width = width;
    canvas.height = height;

    // Falling data particles
    const particles = Array.from({ length: 24 }, () => ({
      x: 70 + Math.random() * 140,
      y: Math.random() * -120,
      speedY: 1.8 + Math.random() * 2.2,
      size: 1.5 + Math.random() * 2.5,
      char: ['0', '1', 'λ', 'μ', 'σ', 'Δ', '∫', '∇'][Math.floor(Math.random() * 8)],
      isChar: Math.random() > 0.45,
      color: Math.random() > 0.4 ? '#C9A227' : '#10b981',
      opacity: 0.3 + Math.random() * 0.7,
    }));

    let t = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      t += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Draw Glass Beaker Outline
      ctx.save();
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Lip
      ctx.moveTo(70, 70);
      ctx.lineTo(60, 65);
      ctx.lineTo(80, 65);
      // Neck to Body
      ctx.lineTo(100, 100);
      ctx.lineTo(70, 200);
      // Base
      ctx.quadraticCurveTo(70, 215, 85, 215);
      ctx.lineTo(195, 215);
      ctx.quadraticCurveTo(210, 215, 210, 200);
      // Right side
      ctx.lineTo(180, 100);
      ctx.lineTo(200, 65);
      ctx.lineTo(220, 65);
      ctx.stroke();

      // Measurement graduation lines on beaker
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.2)';
      ctx.lineWidth = 1;
      [130, 150, 170, 190].forEach((y, i) => {
        ctx.beginPath();
        ctx.moveTo(110 + i * 5, y);
        ctx.lineTo(125 + i * 5, y);
        ctx.stroke();
      });

      // Liquid in the beaker with waving surface
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.moveTo(85, 215);
      ctx.lineTo(195, 215);
      ctx.lineTo(198, 155);

      // Waving top liquid surface
      for (let x = 198; x >= 82; x -= 4) {
        const waveY = 155 + Math.sin(t * 2 + x * 0.06) * 4;
        ctx.lineTo(x, waveY);
      }
      ctx.closePath();
      ctx.fill();

      // Glowing liquid meniscus edge
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 82; x <= 198; x += 4) {
        const waveY = 155 + Math.sin(t * 2 + x * 0.06) * 4;
        if (x === 82) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
      ctx.restore();

      // Render streaming data elements falling into glass
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y > 175) {
          p.y = -20 - Math.random() * 60;
          p.x = 85 + Math.random() * 110;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.isChar) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none mx-auto h-[220px] w-[260px]" />;
}

// ── STATION 2: ORBITING ENGINE MODULES ──────────────────────────────
const ORBIT_MODULES = [
  { name: 'LSTM', desc: 'Recurrent Memory', angle: 0, color: '#C9A227' },
  { name: 'Monte Carlo', desc: '10k Paths', angle: 60, color: '#f59e0b' },
  { name: 'XGBoost', desc: 'Tree Ensembles', angle: 120, color: '#10b981' },
  { name: 'Bayesian', desc: 'Priors & Posteriors', angle: 180, color: '#3b82f6' },
  { name: 'Kelly', desc: 'Optimal Sizing', angle: 240, color: '#8b5cf6' },
  { name: 'Calibration', desc: 'Brier Reliability', angle: 300, color: '#ec4899' },
];

function OrbitalEngine() {
  const [hoveredModule, setHoveredModule] = useState(null);

  return (
    <div className="relative mx-auto flex h-[260px] w-full max-w-[320px] items-center justify-center">
      {/* Outer Orbital Ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-[230px] w-[230px] rounded-full border border-gold/20 border-dashed"
      />

      {/* Outer Orbital Ring 2 (Tilted Ellipse) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-[180px] w-[270px] rounded-full border border-gold/15"
        style={{ transform: 'rotate(25deg)' }}
      />

      {/* Central Glowing Brain + Cocktail Shaker Emblem */}
      <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/60 bg-gradient-to-br from-[#1d1627] via-[#0f0c18] to-black shadow-[0_0_35px_rgba(201,162,39,0.5)]">
        {/* Pulsing Energy Waves */}
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 rounded-full border border-gold/60"
        />

        {/* Shaker & Brain Silhouette SVG */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 40 48" width={34} height={40} fill="none" className="text-gold">
            {/* Shaker Cap */}
            <path
              d="M14 6 L26 6 L24 12 L16 12 Z"
              fill="rgba(201, 162, 39, 0.9)"
              stroke="#C9A227"
              strokeWidth="1.2"
            />
            {/* Shaker Body */}
            <path
              d="M12 14 L28 14 L25 42 Q20 45 15 42 Z"
              fill="rgba(201, 162, 39, 0.25)"
              stroke="#C9A227"
              strokeWidth="1.5"
            />
            {/* Brain node mesh inside shaker */}
            <circle cx="20" cy="24" r="2.5" fill="#10b981" />
            <circle cx="16" cy="30" r="2" fill="#C9A227" />
            <circle cx="24" cy="31" r="2" fill="#3b82f6" />
            <line x1="20" y1="24" x2="16" y2="30" stroke="rgba(201,162,39,0.6)" strokeWidth="1" />
            <line x1="20" y1="24" x2="24" y2="31" stroke="rgba(201,162,39,0.6)" strokeWidth="1" />
            <line x1="16" y1="30" x2="24" y2="31" stroke="rgba(201,162,39,0.6)" strokeWidth="1" />
          </svg>
          <span className="mt-1 font-mono text-[8px] font-bold tracking-widest text-gold uppercase">
            MIXING
          </span>
        </div>
      </div>

      {/* Orbiting Modules */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 h-full w-full"
      >
        {ORBIT_MODULES.map((mod, idx) => {
          const rad = (mod.angle * Math.PI) / 180;
          const radius = 115;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={mod.name}
              style={{
                left: `calc(50% + ${x}px - 44px)`,
                top: `calc(50% + ${y}px - 16px)`,
              }}
              className="absolute z-30"
            >
              {/* Counter-rotate so text remains upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                onMouseEnter={() => setHoveredModule(mod)}
                onMouseLeave={() => setHoveredModule(null)}
                className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-gold/30 bg-black/85 px-2.5 py-1 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold/20"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: mod.color, boxShadow: `0 0 6px ${mod.color}` }}
                />
                <span className="font-mono text-[10px] font-semibold text-light group-hover:text-gold">
                  {mod.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Module description tooltip popover if hovered */}
      <AnimatePresence>
        {hoveredModule && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -bottom-8 left-1/2 z-40 -translate-x-1/2 rounded border border-gold/30 bg-black/90 px-3 py-1 text-center font-mono text-[10px] text-gold shadow-xl backdrop-blur-md"
          >
            {hoveredModule.name}: {hoveredModule.desc}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── STATION 3: FINISHED PREDICTION COCKTAIL CARD ─────────────────────
function PredictionTicketCard() {
  const [confidenceType, setConfidenceType] = useState('LOCK');
  const [showJson, setShowJson] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* Gold Ambient Glow behind Ticket */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-2xl opacity-40 filter blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(201, 162, 39, 0.45) 0%, transparent 70%)' }}
      />

      {/* The Intelligence Cocktail Card / Speakeasy Receipt */}
      <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-[#161122]/95 via-[#0e0a16]/95 to-[#08060d] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        {/* Top Brass Inlay Header */}
        <div className="flex items-center justify-between border-b border-gold/20 pb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-gold" />
            <span className="font-playfair text-xs font-bold tracking-wider text-gold uppercase">
              Supreme Pour #402
            </span>
          </div>
          <span className="rounded bg-gold/15 px-2 py-0.5 font-mono text-[9px] font-bold text-gold">
            READY TO SERVE
          </span>
        </div>

        {/* Prediction Target */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-wider text-smoke uppercase">
              Market Prediction
            </span>
            <span className="font-mono text-[10px] text-emerald-400">● 94.2% Convergence</span>
          </div>
          <p className="mt-1 font-playfair text-base font-bold text-[#ede8dc] sm:text-lg">
            OVER 2.5 TOTAL GOALS
          </p>
          <p className="font-mono text-[11px] text-smoke/90">Arsenal vs. Chelsea (Premier League)</p>
        </div>

        {/* Proof & Confidence Tier Badge Selector */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-gold/15 py-3">
          <div>
            <span className="block font-mono text-[9px] text-smoke uppercase">Proof</span>
            <span className="font-mono text-xs font-bold text-gold">94 Proof</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] text-smoke uppercase">Confidence</span>
            <span className="inline-block rounded bg-gold/20 px-1.5 py-0.5 font-mono text-[10px] font-black text-gold">
              LOCK
            </span>
          </div>
          <div>
            <span className="block font-mono text-[9px] text-smoke uppercase">Edge</span>
            <span className="font-mono text-xs font-bold text-emerald-400">+8.4%</span>
          </div>
        </div>

        {/* Edge Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between font-mono text-[9px] text-smoke">
            <span>Advantage Over Bookmaker</span>
            <span className="text-gold font-bold">+8.4% Alpha</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/60 border border-gold/20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '84%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#9a7e2e] via-gold to-emerald-400"
            />
          </div>
        </div>

        {/* Short Analytical Thesis */}
        <div className="mt-3.5 rounded-lg border border-gold/10 bg-black/40 p-2.5">
          <p className="font-inter text-[11px] leading-relaxed text-light/85 italic">
            "Monte Carlo path distribution demonstrates 71.4% frequency of ≥3 goals versus market implied 63.0%. Kelly fraction recommends 4.2% allocation."
          </p>
        </div>

        {/* JSON / API Response Toggle Preview */}
        <div className="mt-3 flex items-center justify-between pt-1">
          <button
            onClick={() => setShowJson(!showJson)}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-gold/80 hover:text-gold transition-colors"
          >
            <Code size={12} />
            <span>{showJson ? 'Hide Raw API JSON' : 'Inspect JSON Response'}</span>
          </button>
          <span className="font-mono text-[9px] text-smoke">Latency: 14ms</span>
        </div>

        {/* Expandable JSON Code */}
        {showJson && (
          <motion.pre
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-x-auto rounded bg-black/80 p-2 font-mono text-[9px] text-emerald-400 border border-emerald-500/20"
          >
{`{
  "market": "OVER_2.5_GOALS",
  "confidence": "LOCK",
  "proof": 94.2,
  "edge": 0.084,
  "kelly_fraction": 0.042
}`}
          </motion.pre>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN EXPORT: SCENE 4 — HOW IT WORKS
// ════════════════════════════════════════════════════════════════════
export default function HowItWorksScene() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Sequential Entrance Parallax for the 3 Stations
  const station1Opacity = useTransform(scrollYProgress, [0.1, 0.28], [0.2, 1]);
  const station1Y = useTransform(scrollYProgress, [0.1, 0.28], [40, 0]);

  const station2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0.2, 1]);
  const station2Y = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);

  const station3Opacity = useTransform(scrollYProgress, [0.42, 0.62], [0.2, 1]);
  const station3Y = useTransform(scrollYProgress, [0.42, 0.62], [60, 0]);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative w-full bg-[#06060a] py-24 px-4 sm:px-6 lg:px-8 text-light overflow-hidden"
    >
      {/* Background Ambience: Subtle Walnut Texture & Golden Light Pools */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 30%, rgba(201, 162, 39, 0.18) 0%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(201,162,39,0.3) 50px, rgba(201,162,39,0.3) 51px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── SECTION HEADER ── */}
        <div className="mb-16 text-center md:mb-24">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1 backdrop-blur-md">
            <Sparkles size={13} className="text-gold animate-pulse" />
            <span className="font-inter text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
              How It Works
            </span>
          </div>

          <h2 className="font-playfair text-3xl font-black tracking-tight text-[#ede8dc] sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            How It Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-inter text-base md:text-lg text-smoke/90 leading-relaxed">
            Bring us your ingredients.{' '}
            <span className="text-gold font-semibold">Watch the bartender work.</span>{' '}
            Take your pour.
          </p>
        </div>

        {/* ── THREE SEQUENTIAL VISUAL STATIONS WITH CONDUIT PIPELINES ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 relative">
          {/* ════════════════════════════════════════════════════════
              STATION 1 (SCENE 4A) — YOUR INGREDIENTS
          ════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: station1Opacity, y: station1Y }}
            className="flex flex-col justify-between rounded-2xl border border-gold/20 bg-gradient-to-b from-[#110d1a]/80 via-[#0a0710]/90 to-black p-6 shadow-2xl backdrop-blur-xl relative"
          >
            {/* Top Station Indicator */}
            <div className="flex items-center justify-between border-b border-gold/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 font-mono text-xs font-bold text-gold">
                  1
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-light">
                  STAGE 01
                </span>
              </div>
              <span className="font-inter text-[10px] tracking-widest text-tarnished-gold uppercase font-bold">
                Raw Data → Glass
              </span>
            </div>

            {/* Visual Glass / Laboratory Beaker with Streaming Data */}
            <div className="relative my-4 flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-gold/10">
              <BeakerDataCanvas />
            </div>

            {/* Headline & Copy */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#ede8dc] text-center">
                Bring your data
              </h3>
              <p className="mt-2 font-inter text-xs md:text-sm text-smoke/90 text-center leading-relaxed">
                You bring the ingredients. Pipe your historical variables, real-time sports odds, financial ticks, or telemetry directly into the system.
              </p>

              {/* Input Sources Badges */}
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gold/15 pt-4">
                <div className="flex items-center gap-2 rounded-lg border border-gold/15 bg-black/50 p-2 text-left">
                  <Terminal size={14} className="text-gold" />
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-light">REST API</span>
                    <span className="block font-inter text-[9px] text-smoke">JSON endpoints</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-gold/15 bg-black/50 p-2 text-left">
                  <Upload size={14} className="text-emerald-400" />
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-light">File Upload</span>
                    <span className="block font-inter text-[9px] text-smoke">CSV, Parquet, SQL</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-gold/15 bg-black/50 p-2 text-left">
                  <Webhook size={14} className="text-blue-400" />
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-light">Webhook</span>
                    <span className="block font-inter text-[9px] text-smoke">Event dispatch</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-gold/15 bg-black/50 p-2 text-left">
                  <Radio size={14} className="text-purple-400" />
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-light">Streaming</span>
                    <span className="block font-inter text-[9px] text-smoke">WebSocket feeds</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              STATION 2 (SCENE 4B) — THE MAKING (THE BARTENDER)
          ════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: station2Opacity, y: station2Y }}
            className="flex flex-col justify-between rounded-2xl border border-gold/40 bg-gradient-to-b from-[#191226]/90 via-[#0e0a17]/95 to-black p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(201,162,39,0.15)] backdrop-blur-xl relative"
          >
            {/* Top Station Indicator */}
            <div className="flex items-center justify-between border-b border-gold/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold font-mono text-xs font-bold text-black">
                  2
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-light">
                  STAGE 02
                </span>
              </div>
              <span className="font-inter text-[10px] tracking-widest text-gold uppercase font-bold">
                Distillation Engine
              </span>
            </div>

            {/* Visual Orbital ML Shaker Engine */}
            <div className="relative my-4 flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-gold/20 py-2">
              <OrbitalEngine />
            </div>

            {/* Headline & Copy */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-gold text-center">
                The bartender goes to work
              </h3>
              <p className="mt-2 font-inter text-xs md:text-sm text-smoke/90 text-center leading-relaxed">
                40+ intelligence modules analyze your data through deep learning, Monte Carlo simulation, Bayesian models, and Kelly calibration — working together to mix the prediction.
              </p>

              {/* Module Feature Tags */}
              <div className="mt-5 flex flex-wrap justify-center gap-1.5 border-t border-gold/15 pt-4">
                {['LSTM', 'MONTE CARLO', 'XGBOOST', 'BAYESIAN', 'KELLY', 'CALIBRATION'].map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 font-mono text-[9px] font-bold text-gold"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              STATION 3 (SCENE 4C) — THE POUR (FINISHED PRODUCT)
          ════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: station3Opacity, y: station3Y }}
            className="flex flex-col justify-between rounded-2xl border border-gold/20 bg-gradient-to-b from-[#110d1a]/80 via-[#0a0710]/90 to-black p-6 shadow-2xl backdrop-blur-xl relative"
          >
            {/* Top Station Indicator */}
            <div className="flex items-center justify-between border-b border-gold/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 font-mono text-xs font-bold text-gold">
                  3
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-light">
                  STAGE 03
                </span>
              </div>
              <span className="font-inter text-[10px] tracking-widest text-emerald-400 uppercase font-bold">
                Intelligence Poured
              </span>
            </div>

            {/* Finished Prediction Cocktail Card */}
            <div className="relative my-4 flex items-center justify-center">
              <PredictionTicketCard />
            </div>

            {/* Headline & Copy */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#ede8dc] text-center">
                Collect your cocktail
              </h3>
              <p className="mt-2 font-inter text-xs md:text-sm text-smoke/90 text-center leading-relaxed">
                Receive a prediction with its confidence tier (LOCK / STRONG / LEAN), proof rating (94 Proof), quantifiable market edge, and deep thesis reasoning.
              </p>

              {/* Quality Indicators */}
              <div className="mt-5 flex items-center justify-between border-t border-gold/15 pt-4 text-center">
                <div>
                  <span className="block font-mono text-[9px] text-smoke uppercase">Confidence</span>
                  <span className="font-mono text-xs font-bold text-gold">LOCK TIER</span>
                </div>
                <div className="h-6 w-[1px] bg-gold/20" />
                <div>
                  <span className="block font-mono text-[9px] text-smoke uppercase">Purity</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">94 PROOF</span>
                </div>
                <div className="h-6 w-[1px] bg-gold/20" />
                <div>
                  <span className="block font-mono text-[9px] text-smoke uppercase">Advantage</span>
                  <span className="font-mono text-xs font-bold text-blue-400">+8.4% EDGE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
