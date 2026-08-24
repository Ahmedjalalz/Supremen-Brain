import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Wine, Cpu, Database, Award, ArrowUpRight } from 'lucide-react';

// ── BUBBLE & FIZZ SIMULATOR CANVAS ──────────────────────────────────
function LiveFizzSimulator({ color = '#10b981', density = 32, width = 260, height = 340, isHovered = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const bubbles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 1.3 + 0.6,
      wobbleSpeed: Math.random() * 0.05 + 0.02,
      wobbleAmp: Math.random() * 1.8 + 0.6,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.7 + 0.25,
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);
      const speedMult = isHovered ? 1.9 : 1.1;

      bubbles.forEach((b) => {
        b.y -= b.speedY * speedMult;
        const currentX = b.x + Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp;

        if (b.y < -5) {
          b.y = height + Math.random() * 15;
          b.x = Math.random() * width;
          b.opacity = Math.random() * 0.7 + 0.25;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = b.opacity * (isHovered ? 0.95 : 0.7);
        ctx.shadowColor = color;
        ctx.shadowBlur = isHovered ? 10 : 5;
        ctx.fill();

        // Bubble highlight reflection
        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = b.opacity * 0.85;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
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

// ── VINTAGE BOTTLES ON THE BACK SHELF ────────────────────────────────
const SHELF_BOTTLES = [
  {
    id: 'b1',
    name: 'Château Margaux 1872',
    vintage: 'Bordeaux Premier Cru',
    notes: 'Aged 50 years in toasted French oak. High prediction confidence.',
    color: '#eab308',
    posLeft: '32%',
    posTop: '35%',
  },
  {
    id: 'b2',
    name: 'Hennessy Rare Cognac 1868',
    vintage: 'Grande Champagne',
    notes: 'Spiced vanilla, dried plum, Monte Carlo calibration.',
    color: '#f59e0b',
    posLeft: '37%',
    posTop: '35%',
  },
  {
    id: 'b3',
    name: 'Glenglassaugh Highland 1865',
    vintage: 'Pure Scotch Malt',
    notes: 'Wild heather, sea salt, Bayesian stochastic priors.',
    color: '#d97706',
    posLeft: '61%',
    posTop: '35%',
  },
  {
    id: 'b4',
    name: 'Fine Champagne Cognac 1888',
    vintage: 'Extra Imperial Reserve',
    notes: 'Rancio, candied orange, Kelly criterion optimal sizing.',
    color: '#fbbf24',
    posLeft: '66%',
    posTop: '35%',
  },
];

// ── 3 COCKTAILS ON THE FRONT DESK ────────────────────────────────────
const COCKTAILS = [
  {
    id: 'cocktail-1',
    number: 'Cocktail 01 — Bring Your Data',
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
    number: 'Cocktail 02 — Let the Engine Work',
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
    number: 'Cocktail 03 — Get Your Pour',
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
  const containerRef = useRef(null);
  const [activeBottle, setActiveBottle] = useState(null);
  const [hoveredCocktail, setHoveredCocktail] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spatial zoom: as the user scrolls, the room builds around them and moves closer
  const sceneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 1.08]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.4, 1, 1, 0.4]);

  // Front counter items entrance
  const deskItemsY = useTransform(scrollYProgress, [0.15, 0.45, 1], [80, 0, -20]);
  const deskItemsOpacity = useTransform(scrollYProgress, [0.18, 0.35], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="the-bar-room"
      className="relative min-h-[300vh] w-full bg-[#06060a] text-light selection:bg-gold/30 selection:text-gold"
    >
      {/* STICKY CINEMATIC VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Seamless blend from hero */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-30 h-28 w-full"
          style={{
            background: 'linear-gradient(to bottom, #06060a 0%, rgba(6,6,10,0.85) 50%, transparent 100%)',
          }}
        />

        {/* ════════════════════════════════════════════════════════════
            LAYER 1: STRAIGHT-ON VICTORIAN BAR WITH BACK SHELVES & DESK
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            scale: sceneScale,
            y: sceneY,
            opacity: sceneOpacity,
          }}
        >
          {/* Authentic straight-on Victorian Bar Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-90 contrast-110"
            style={{ backgroundImage: "url('/assets/victorian_bar_empty.jpg')" }}
          />

          {/* Warm Speakeasy Lighting Overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 95% 80% at 50% 40%, rgba(201, 162, 39, 0.08) 0%, rgba(6, 6, 10, 0.5) 60%, #06060a 100%),
                linear-gradient(to bottom, rgba(6,6,10,0.6) 0%, transparent 35%, rgba(6,6,10,0.7) 100%)
              `,
            }}
          />

          {/* ── CLICKABLE GLITTERING BOTTLES ON THE BACK SHELVES ── */}
          {SHELF_BOTTLES.map((bottle) => {
            const isSelected = activeBottle?.id === bottle.id;
            return (
              <div
                key={bottle.id}
                style={{ left: bottle.posLeft, top: bottle.posTop }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  {/* Glittering Golden Halo */}
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.35, 0.75, 0.35],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute -inset-3 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(201, 162, 39, 0.65) 0%, transparent 70%)`,
                      filter: 'blur(6px)',
                    }}
                  />

                  {/* Interactive Hotspot Trigger */}
                  <motion.button
                    onClick={() => setActiveBottle(isSelected ? null : bottle)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? 'border-gold bg-gold/30 shadow-[0_0_20px_rgba(201,162,39,0.8)]'
                        : 'border-gold/50 bg-black/60 shadow-[0_0_12px_rgba(201,162,39,0.4)] hover:border-gold hover:bg-gold/20'
                    }`}
                  >
                    <Sparkles size={14} className="text-gold transition-transform duration-300 group-hover:rotate-45" />
                  </motion.button>

                  {/* Bottle Tasting Plaque (Tooltip Popover) */}
                  <AnimatePresence>
                    {(isSelected || false) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        className="absolute left-1/2 top-11 z-50 w-64 -translate-x-1/2 rounded-xl border border-gold/40 bg-[#0c0914]/95 p-3 text-left shadow-2xl backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between border-b border-gold/20 pb-1.5">
                          <span className="font-playfair text-xs font-bold text-gold">{bottle.name}</span>
                          <span className="font-mono text-[9px] text-tarnished-gold">{bottle.vintage}</span>
                        </div>
                        <p className="mt-1.5 font-inter text-[11px] leading-relaxed text-light/90">
                          {bottle.notes}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            LAYER 2: THE 3 COCKTAILS SITTING DIRECTLY ON THE WOODEN DESK
        ════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-x-0 bottom-4 z-20 flex flex-col justify-end px-4 md:bottom-8 lg:px-8"
          style={{
            y: deskItemsY,
            opacity: deskItemsOpacity,
          }}
        >
          <div className="mx-auto w-full max-w-6xl">
            {/* Header / Context Plaque */}
            <div className="mb-4 text-center md:mb-6">
              <span className="font-inter text-[10px] font-semibold tracking-[0.3em] text-tarnished-gold uppercase sm:text-[11px]">
                How it Works
              </span>
              <h2 className="mt-1 font-playfair text-xl font-black tracking-tight text-[#ede8dc] sm:text-2xl md:text-3xl lg:text-4xl">
                Three Cocktails. <span className="text-gold">One Supreme Pour.</span>
              </h2>
            </div>

            {/* 3 Cocktails Grid sitting directly on the desk */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {COCKTAILS.map((cocktail) => {
                const IconComponent = cocktail.icon;
                const isHovered = hoveredCocktail === cocktail.id;

                return (
                  <motion.div
                    key={cocktail.id}
                    onMouseEnter={() => setHoveredCocktail(cocktail.id)}
                    onMouseLeave={() => setHoveredCocktail(null)}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="group relative flex flex-col items-center"
                  >
                    {/* ── THE FIZZY GLASS DIRECTLY SITTING ON WOOD ── */}
                    <div className="relative flex h-56 w-full items-center justify-center sm:h-64 md:h-72">
                      {/* Ambient colored liquid backlight pool */}
                      <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 60%, ${cocktail.glowColor} 0%, transparent 65%)`,
                          opacity: isHovered ? 1.0 : 0.65,
                        }}
                      />

                      {/* Glass base contact shadow on the wooden desk */}
                      <div
                        className="pointer-events-none absolute bottom-4 h-6 w-32 rounded-full opacity-70 filter blur-md"
                        style={{ background: 'rgba(0,0,0,0.95)' }}
                      />

                      {/* Hyper-realistic Glass Image */}
                      <img
                        src={cocktail.image}
                        alt={cocktail.title}
                        className="relative z-10 h-full w-full object-contain p-2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Live Animated Fizz & Bubble Canvas */}
                      <LiveFizzSimulator
                        color={cocktail.accentColor}
                        density={isHovered ? 40 : 25}
                        isHovered={isHovered}
                        width={260}
                        height={280}
                      />
                    </div>

                    {/* ── LIQUID-FLOWING PARCHMENT TEXT CARD ── */}
                    <motion.div
                      animate={{
                        y: [0, -2.5, 0, 2.5, 0],
                        rotate: [0, 0.15, 0, -0.15, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className={`relative -mt-6 w-full rounded-xl border p-4 backdrop-blur-xl transition-all duration-300 sm:p-5 ${
                        cocktail.prominent
                          ? 'border-gold/40 bg-[#0e0a16]/90 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.15)]'
                          : 'border-gold/20 bg-[#09070e]/90 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                      }`}
                    >
                      {/* Top Proof Tag */}
                      <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                        <div className="flex items-center gap-1.5">
                          <IconComponent size={13} style={{ color: cocktail.accentColor }} />
                          <span className="font-mono text-[10px] font-bold text-light/90">
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
                        <p className="mt-1.5 font-inter text-xs leading-relaxed text-smoke/90">
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
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Atmospheric Vignette Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-25"
          style={{
            background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, rgba(6,6,10,0.65) 100%)',
          }}
        />
      </div>
    </section>
  );
}
