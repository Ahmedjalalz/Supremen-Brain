import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Database, Award, Wine, ShieldCheck } from 'lucide-react';

// ── HIGH PERFORMANCE BUBBLE & FIZZ CANVAS ───────────────────────────
function LiveFizzSimulator({ color = '#10b981', density = 20, width = 260, height = 280, isHovered = false }) {
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

    const bubbles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.0 + 0.7,
      speedY: Math.random() * 1.0 + 0.5,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleAmp: Math.random() * 1.4 + 0.4,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      time += 1;
      ctx.clearRect(0, 0, width, height);
      const speedMult = isHovered ? 1.5 : 1.0;

      bubbles.forEach((b) => {
        b.y -= b.speedY * speedMult;
        const currentX = b.x + Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp;

        if (b.y < -5) {
          b.y = height + Math.random() * 15;
          b.x = Math.random() * width;
          b.opacity = Math.random() * 0.6 + 0.2;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = b.opacity * (isHovered ? 0.9 : 0.65);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = b.opacity * 0.8;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [color, density, width, height, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full mix-blend-screen"
    />
  );
}

// ── VINTAGE BOTTLES DATA ─────────────────────────────────────────────
const SHELF_BOTTLES = [
  {
    id: 'b1',
    name: 'Château Margaux 1872',
    vintage: 'Bordeaux Premier Cru',
    notes: 'Aged 50 years in toasted French oak. High prediction confidence with zero leakage and robust variance calibration.',
    color: '#eab308',
    image: '/assets/bottle_margaux.png',
    proof: '96 Proof Reserve',
    engineSpec: 'LSTM + Bayesian Priors',
  },
  {
    id: 'b2',
    name: 'Hennessy Rare Cognac 1868',
    vintage: 'Grande Champagne Reserve',
    notes: 'Spiced vanilla, dried plum, Monte Carlo calibration. Sized for optimal asymmetric edge identification.',
    color: '#f59e0b',
    image: '/assets/bottle_hennessy.png',
    proof: '98 Proof Distilled',
    engineSpec: '10k Monte Carlo Paths',
  },
  {
    id: 'b3',
    name: 'Glenglassaugh Highland 1865',
    vintage: 'Pure Scotch Single Malt',
    notes: 'Wild heather, sea salt, Bayesian stochastic priors. Extremely low latency processing with tight risk bounds.',
    color: '#d97706',
    image: '/assets/bottle_glenglassaugh.png',
    proof: '94 Proof Highland',
    engineSpec: 'Sub-40ms Arbitrage Engine',
  },
  {
    id: 'b4',
    name: 'Fine Champagne Cognac 1888',
    vintage: 'Extra Imperial Reserve',
    notes: 'Rancio, candied orange, Kelly criterion optimal sizing. Built for high-conviction institutional consensus.',
    color: '#fbbf24',
    image: '/assets/bottle_champagne.png',
    proof: '100 Proof Imperial',
    engineSpec: 'Meta-Ensemble Consensus',
  },
];

// ── 3 COCKTAILS ON THE FRONT DESK ────────────────────────────────────
const COCKTAILS = [
  {
    id: 'cocktail-1',
    number: 'Bring Your Data',
    title: 'Your Ingredients',
    description:
      'Connect your data through an API, upload a file, send a webhook, or stream it directly into the system.',
    image: '/assets/cocktail_green.png',
    colorName: 'Absinthe Emerald',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    tags: ['REST API', 'FILE UPLOAD', 'WEBHOOK', 'STREAMING'],
    proof: '88 Proof Raw Signal',
    icon: Database,
  },
  {
    id: 'cocktail-2',
    number: 'Let the Engine Work',
    title: 'The Bartender Goes to Work',
    description:
      '40+ intelligence modules analyze your data through deep learning, Monte Carlo simulation, Bayesian models, and more — working together to build the prediction.',
    image: '/assets/cocktail_amber.png',
    colorName: 'Smoked Amber Gold',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    tags: ['LSTM', 'MONTE CARLO', 'XGBOOST', 'BAYESIAN', 'KELLY'],
    proof: '100 Proof Pure Engine',
    icon: Cpu,
    prominent: true,
  },
  {
    id: 'cocktail-3',
    number: 'Get Your Pour',
    title: 'Collect Your Cocktail',
    description:
      'Receive a prediction with its confidence, edge, proof, and reasoning — ready to act on through a single API.',
    image: '/assets/cocktail_blue.png',
    colorName: 'Blueberry Sapphire',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    tags: ['PREDICTION', 'CONFIDENCE', 'EDGE', 'PROOF'],
    proof: '94 Proof Crystal Pour',
    icon: Award,
  },
];

export default function VictorianBarScene() {
  const [activeBottle, setActiveBottle] = useState(SHELF_BOTTLES[0]);
  const [hoveredBottle, setHoveredBottle] = useState(null);
  const [hoveredCocktail, setHoveredCocktail] = useState(null);

  return (
    <section
      id="the-bar-room"
      className="relative min-h-screen w-full bg-[#06060a] text-light py-20 px-4 sm:px-6 lg:px-8 selection:bg-gold/30 selection:text-gold overflow-hidden"
    >
      {/* Background: Victorian Bar Architecture with seamless atmospheric feathering */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-90 contrast-110 opacity-70"
          style={{
            backgroundImage: "url('/assets/victorian_bar_empty.jpg')",
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 95% 80% at 50% 40%, rgba(201, 162, 39, 0.08) 0%, rgba(6, 6, 10, 0.6) 60%, #06060a 100%),
              linear-gradient(to bottom, #06060a 0%, rgba(6,6,10,0.9) 10%, transparent 30%, rgba(6,6,10,0.95) 90%, #06060a 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── HEADER ── */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1 backdrop-blur-md">
            <Sparkles size={13} className="text-gold animate-pulse" />
            <span className="font-inter text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
              Our Process
            </span>
          </div>

          <h2 className="font-playfair text-2xl font-black tracking-tight text-[#ede8dc] sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto leading-tight">
            Bring us your ingredients.{' '}
            <span className="text-gold">Watch the bartender work.</span>{' '}
            Take your pour.
          </h2>
        </div>

        {/* ════════════════════════════════════════════════════════════
            PHYSICAL VICTORIAN BACK SHELF WITH STANDING BOTTLES & THICK EDGE
        ════════════════════════════════════════════════════════════ */}
        <div className="mb-16 relative mx-auto max-w-4xl">
          {/* Subtle Ambient Back-Wall Glow */}
          <div
            className="pointer-events-none absolute inset-x-12 -top-10 h-44 opacity-25 filter blur-3xl"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(201, 162, 39, 0.5) 0%, transparent 70%)',
            }}
          />

          {/* ── BOTTLES STANDING ON THE SHELF ── */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 px-4 items-end pb-1">
            {SHELF_BOTTLES.map((bottle) => {
              const isSelected = activeBottle?.id === bottle.id;
              const isHovered = hoveredBottle === bottle.id;

              return (
                <button
                  key={bottle.id}
                  onClick={() => setActiveBottle(bottle)}
                  onMouseEnter={() => setHoveredBottle(bottle.id)}
                  onMouseLeave={() => setHoveredBottle(null)}
                  className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 select-none py-2"
                >
                  {/* Organic Soft Golden Bloom (Seamless, no hard cuts) */}
                  {isSelected && (
                    <div
                      className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-44 rounded-full bg-gradient-to-t from-gold/30 via-gold/15 to-transparent filter blur-xl transition-all duration-500"
                    />
                  )}

                  {/* Bottle Illustration with smooth elevation */}
                  <div
                    className={`relative z-10 flex h-40 sm:h-48 items-end justify-center transition-all duration-300 ${
                      isSelected
                        ? '-translate-y-2.5 scale-105 filter drop-shadow-[0_0_20px_rgba(201,162,39,0.55)]'
                        : isHovered
                        ? '-translate-y-1.5 scale-[1.02] filter drop-shadow-[0_0_12px_rgba(201,162,39,0.35)]'
                        : 'filter brightness-95 contrast-105'
                    }`}
                  >
                    <img
                      src={bottle.image}
                      alt={bottle.name}
                      className="h-full w-auto max-w-[125px] object-contain select-none pointer-events-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.95)]"
                    />
                  </div>

                  {/* Contact Glass Shadow on Shelf Wood */}
                  <div className="h-2 w-20 rounded-full bg-black/95 filter blur-[3px] mt-1 mb-2" />

                  {/* Bottle Title on Shelf Deck */}
                  <div className="text-center w-full px-1">
                    <span
                      className={`block font-playfair text-xs font-bold transition-colors duration-200 truncate ${
                        isSelected ? 'text-gold' : 'text-[#ede8dc] group-hover:text-gold'
                      }`}
                    >
                      {bottle.name}
                    </span>
                    <span className="block font-mono text-[9px] text-tarnished-gold tracking-wide truncate">
                      {bottle.vintage}
                    </span>

                    {/* Active Golden Underline Indicator */}
                    <div
                      className={`h-[1.5px] mx-auto mt-1.5 transition-all duration-300 rounded-full ${
                        isSelected ? 'w-12 bg-gold shadow-[0_0_8px_#C9A227]' : 'w-0 bg-transparent'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* ════════════════════════════════════════════════════════
              THE THICK FRONT FACE / SOLID MAHOGANY BEVELED SHELF
              (Where the selected tasting description appears)
          ════════════════════════════════════════════════════════ */}
          <div className="relative mt-2">
            {/* Top Polished Shelf Ledge Board with Brass Trim */}
            <div className="h-3 w-full rounded-t bg-gradient-to-r from-[#181109] via-[#3d2b16] to-[#181109] border-t border-gold/50 shadow-[0_-3px_15px_rgba(201,162,39,0.25)]" />

            {/* Thick Wooden Beam Front Face */}
            <div className="relative w-full rounded-b-xl border-x border-b border-gold/30 bg-gradient-to-b from-[#1c140c] via-[#100c07] to-[#080604] p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
              {/* Brass Corner Inlays */}
              <div className="absolute top-2.5 left-3 h-1.5 w-1.5 rounded-full bg-gold/40" />
              <div className="absolute top-2.5 right-3 h-1.5 w-1.5 rounded-full bg-gold/40" />
              <div className="absolute bottom-2.5 left-3 h-1.5 w-1.5 rounded-full bg-gold/40" />
              <div className="absolute bottom-2.5 right-3 h-1.5 w-1.5 rounded-full bg-gold/40" />

              <AnimatePresence mode="wait">
                {activeBottle && (
                  <motion.div
                    key={activeBottle.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="px-2 sm:px-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-gold/15 pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: activeBottle.color, boxShadow: `0 0 8px ${activeBottle.color}` }}
                        />
                        <span className="font-playfair text-sm sm:text-base font-bold text-gold">
                          {activeBottle.name}
                        </span>
                        <span className="text-smoke text-xs">·</span>
                        <span className="font-mono text-[10px] text-tarnished-gold">
                          {activeBottle.vintage}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 font-mono text-[9px] font-bold text-gold">
                          {activeBottle.proof}
                        </span>
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-400">
                          {activeBottle.engineSpec}
                        </span>
                      </div>
                    </div>

                    <p className="font-inter text-xs sm:text-sm text-smoke leading-relaxed">
                      <strong className="text-light font-medium">Tasting & Engine Notes: </strong>
                      {activeBottle.notes}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── 3 COCKTAILS SITTING DIRECTLY ON THE DESK ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {COCKTAILS.map((cocktail) => {
            const IconComponent = cocktail.icon;
            const isHovered = hoveredCocktail === cocktail.id;

            return (
              <div
                key={cocktail.id}
                onMouseEnter={() => setHoveredCocktail(cocktail.id)}
                onMouseLeave={() => setHoveredCocktail(null)}
                className="group relative flex flex-col items-center"
              >
                {/* ── THE FIZZY GLASS ON WOOD ── */}
                <div className="relative flex h-60 w-full items-center justify-center sm:h-64 md:h-72">
                  {/* Ambient colored liquid glow */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 60%, ${cocktail.glowColor} 0%, transparent 65%)`,
                      opacity: isHovered ? 1.0 : 0.6,
                    }}
                  />

                  {/* Glass base contact shadow */}
                  <div
                    className="pointer-events-none absolute bottom-4 h-5 w-28 rounded-full opacity-70 filter blur-md"
                    style={{ background: 'rgba(0,0,0,0.95)' }}
                  />

                  {/* Hyper-realistic Glass Image */}
                  <img
                    src={cocktail.image}
                    alt={cocktail.title}
                    className="relative z-10 h-full w-full object-contain p-2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Live Animated Fizz & Bubble Canvas */}
                  <LiveFizzSimulator
                    color={cocktail.accentColor}
                    density={isHovered ? 28 : 16}
                    isHovered={isHovered}
                    width={260}
                    height={280}
                  />
                </div>

                {/* ── LIQUID-FLOWING PARCHMENT TEXT CARD ── */}
                <div
                  className={`relative -mt-6 w-full rounded-xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                    cocktail.prominent
                      ? 'border-gold/40 bg-[#0e0a16]/95 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.15)]'
                      : 'border-gold/20 bg-[#09070e]/95 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {/* Top Proof Tag */}
                  <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                    <div className="flex items-center gap-1.5">
                      <IconComponent size={13} style={{ color: cocktail.accentColor }} />
                      <span className="font-mono text-[10px] font-bold text-light">
                        {cocktail.number}
                      </span>
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase"
                      style={{
                        color: cocktail.accentColor,
                        backgroundColor: `${cocktail.accentColor}20`,
                        border: `1px solid ${cocktail.accentColor}40`,
                      }}
                    >
                      {cocktail.proof}
                    </span>
                  </div>

                  {/* Headline / Title */}
                  <div className="mt-2.5">
                    <h3 className="font-playfair text-base font-bold text-[#ede8dc] transition-colors group-hover:text-gold sm:text-lg">
                      {cocktail.title}
                    </h3>
                    <p className="mt-1.5 font-inter text-xs leading-relaxed text-smoke">
                      {cocktail.description}
                    </p>
                  </div>

                  {/* Small Module / Output Labels */}
                  <div className="mt-3.5 flex flex-wrap gap-1 border-t border-gold/10 pt-2.5">
                    {cocktail.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-gold/15 bg-black/50 px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-wide text-light/80 transition-colors group-hover:border-gold/30 group-hover:text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
