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

// ── SLEEK, ULTRA-ELEGANT VECTOR VINTAGE BOTTLES ─────────────────────
function BottleVector({ type, color, isSelected, isHovered }) {
  const liquidOpacity = isSelected ? 0.65 : isHovered ? 0.5 : 0.35;
  const strokeColor = isSelected ? '#C9A227' : isHovered ? 'rgba(201,162,39,0.8)' : 'rgba(201,162,39,0.4)';

  if (type === 'bordeaux') {
    // 1872 Bordeaux Wine Bottle — Classic sleek high-shoulder silhouette
    return (
      <svg viewBox="0 0 60 150" width="46" height="125" className="transition-all duration-300">
        <defs>
          <linearGradient id="bordeauxGlass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="30%" stopColor="rgba(10,8,6,0.8)" />
            <stop offset="70%" stopColor="rgba(20,15,10,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
          </linearGradient>
        </defs>
        {/* Gold Capsule & Cork */}
        <rect x="26.5" y="10" width="7" height="16" rx="1" fill="#C9A227" />
        <rect x="25" y="8" width="10" height="3" rx="1" fill="#FFD700" />
        {/* Bottle Body */}
        <path d="M26 26 L26 46 Q26 58 16 70 L16 138 Q16 142 20 142 L40 142 Q44 142 44 138 L44 70 Q34 58 34 46 L34 26 Z" fill="url(#bordeauxGlass)" stroke={strokeColor} strokeWidth="1.2" />
        {/* Wine Liquid */}
        <path d="M17.5 76 Q30 73 42.5 76 L42.5 138 Q42.5 140.5 40 140.5 L20 140.5 Q17.5 140.5 17.5 138 Z" fill={color} fillOpacity={liquidOpacity} />
        {/* Subtle Label Inset */}
        <rect x="19" y="85" width="22" height="34" rx="1.5" fill="#14100c" stroke="rgba(201,162,39,0.7)" strokeWidth="0.8" />
        <line x1="22" y1="93" x2="38" y2="93" stroke="#C9A227" strokeWidth="0.8" />
        <line x1="23" y1="100" x2="37" y2="100" stroke="#a6a095" strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="22" y1="107" x2="38" y2="107" stroke="#C9A227" strokeWidth="0.6" />
        {/* Glass Edge Glint */}
        <line x1="19" y1="72" x2="19" y2="136" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'cognac') {
    // 1868 Cognac Decanter — Rounded shoulder curved crystal decanter
    return (
      <svg viewBox="0 0 70 150" width="56" height="125" className="transition-all duration-300">
        <defs>
          <linearGradient id="cognacGlass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="35%" stopColor="rgba(12,9,6,0.85)" />
            <stop offset="65%" stopColor="rgba(22,16,10,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
          </linearGradient>
        </defs>
        {/* Diamond Glass Stopper */}
        <polygon points="35,6 43,14 35,22 27,14" fill="#C9A227" stroke="#FFD700" strokeWidth="0.8" />
        <rect x="31.5" y="22" width="7" height="6" fill="#8B6914" />
        {/* Decanter Curves */}
        <path d="M31 28 L31 44 Q20 52 10 74 Q5 92 13 112 Q21 132 35 138 Q49 132 57 112 Q65 92 60 74 Q50 52 39 44 L39 28 Z" fill="url(#cognacGlass)" stroke={strokeColor} strokeWidth="1.2" />
        {/* Amber Cognac Liquid */}
        <path d="M12.5 82 Q35 76 57.5 82 Q63 98 56 114 Q48 130 35 136 Q22 130 14 114 Q7 98 12.5 82 Z" fill={color} fillOpacity={liquidOpacity} />
        {/* Vintage Medallion Emblem */}
        <circle cx="35" cy="96" r="9" fill="#16120c" stroke="#C9A227" strokeWidth="1" />
        <circle cx="35" cy="96" r="6" fill="none" stroke="#C9A227" strokeWidth="0.6" strokeDasharray="1 1" />
        {/* Glass Highlight */}
        <path d="M14 78 Q9 94 17 112" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'scotch') {
    // 1865 Scotch Malt Flask — Heavy beveled solid whisky bottle
    return (
      <svg viewBox="0 0 64 150" width="50" height="125" className="transition-all duration-300">
        <defs>
          <linearGradient id="scotchGlass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="30%" stopColor="rgba(10,8,6,0.85)" />
            <stop offset="70%" stopColor="rgba(24,18,12,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.22)" />
          </linearGradient>
        </defs>
        {/* Wooden & Brass Stopper */}
        <rect x="27" y="10" width="10" height="10" rx="1.5" fill="#5c3a21" stroke="#C9A227" strokeWidth="0.8" />
        <rect x="25" y="18" width="14" height="4" fill="#C9A227" />
        {/* Square Shoulder Flask Body */}
        <path d="M27 22 L27 38 L14 48 L14 136 Q14 140 18 140 L46 140 Q50 140 50 136 L50 48 L37 38 L37 22 Z" fill="url(#scotchGlass)" stroke={strokeColor} strokeWidth="1.2" />
        {/* Malt Liquid */}
        <path d="M15.5 58 L48.5 58 L48.5 136 Q48.5 138.5 46 138.5 L18 138.5 Q15.5 138.5 15.5 136 Z" fill={color} fillOpacity={liquidOpacity} />
        {/* Parchment Label */}
        <rect x="18" y="74" width="28" height="36" rx="1" fill="#18130c" stroke="#C9A227" strokeWidth="0.8" />
        <line x1="21" y1="82" x2="43" y2="82" stroke="#C9A227" strokeWidth="0.9" />
        <line x1="22" y1="90" x2="42" y2="90" stroke="#a6a095" strokeWidth="0.5" />
        <line x1="21" y1="100" x2="43" y2="100" stroke="#C9A227" strokeWidth="0.7" />
        {/* Highlight Reflection */}
        <line x1="16" y1="52" x2="16" y2="134" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    );
  }

  // 1888 Champagne Extra Reserve — Imperial slender flute decanter
  return (
    <svg viewBox="0 0 58 150" width="48" height="125" className="transition-all duration-300">
      <defs>
        <linearGradient id="champagneGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="30%" stopColor="rgba(12,9,6,0.85)" />
          <stop offset="70%" stopColor="rgba(20,16,10,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
        </linearGradient>
      </defs>
      {/* Crown Foil Cap */}
      <path d="M24 8 L34 8 L32 20 L26 20 Z" fill="#C9A227" stroke="#FFD700" strokeWidth="0.8" />
      <polygon points="29,3 33,7 25,7" fill="#FFD700" />
      {/* Slender Flute Body */}
      <path d="M25 20 L25 46 Q16 64 16 98 Q16 138 22 140 L36 140 Q42 138 42 98 Q42 64 33 46 L33 20 Z" fill="url(#champagneGlass)" stroke={strokeColor} strokeWidth="1.2" />
      {/* Golden Champagne Liquid */}
      <path d="M17.5 80 Q29 75 40.5 80 Q40.5 108 35.5 138 L22.5 138 Q17.5 108 17.5 80 Z" fill={color} fillOpacity={liquidOpacity} />
      {/* Imperial Oval Badge */}
      <ellipse cx="29" cy="94" rx="8" ry="12" fill="#18130a" stroke="#C9A227" strokeWidth="0.8" />
      <text x="29" y="97" textAnchor="middle" fill="#C9A227" fontSize="4.5" fontFamily="serif" fontWeight="bold">1888</text>
      {/* Curve Glass Highlight */}
      <path d="M18 64 Q17 92 20 132" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
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
    type: 'bordeaux',
    proof: '96 Proof Reserve',
    engineSpec: 'LSTM + Bayesian Priors',
  },
  {
    id: 'b2',
    name: 'Hennessy Rare Cognac 1868',
    vintage: 'Grande Champagne Reserve',
    notes: 'Spiced vanilla, dried plum, Monte Carlo calibration. Sized for optimal asymmetric edge identification.',
    color: '#f59e0b',
    type: 'cognac',
    proof: '98 Proof Distilled',
    engineSpec: '10k Monte Carlo Paths',
  },
  {
    id: 'b3',
    name: 'Glenglassaugh Highland 1865',
    vintage: 'Pure Scotch Single Malt',
    notes: 'Wild heather, sea salt, Bayesian stochastic priors. Extremely low latency processing with tight risk bounds.',
    color: '#d97706',
    type: 'scotch',
    proof: '94 Proof Highland',
    engineSpec: 'Sub-40ms Arbitrage Engine',
  },
  {
    id: 'b4',
    name: 'Fine Champagne Cognac 1888',
    vintage: 'Extra Imperial Reserve',
    notes: 'Rancio, candied orange, Kelly criterion optimal sizing. Built for high-conviction institutional consensus.',
    color: '#fbbf24',
    type: 'champagne',
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
                    className={`relative z-10 flex h-32 items-end justify-center transition-transform duration-300 ${
                      isSelected ? '-translate-y-2 scale-105' : isHovered ? '-translate-y-1' : ''
                    }`}
                  >
                    <BottleVector
                      type={bottle.type}
                      color={bottle.color}
                      isSelected={isSelected}
                      isHovered={isHovered}
                    />
                  </div>

                  {/* Contact Glass Shadow on Shelf Wood */}
                  <div className="h-1.5 w-12 rounded-full bg-black/90 filter blur-[2px] mt-1 mb-2" />

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
