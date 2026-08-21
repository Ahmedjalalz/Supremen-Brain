import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ════════════════════════════════════════════════════════════════════
// SCENE 3 — THE BAR: PARALLAX REVEAL
//
// A SPATIAL ENVIRONMENT — not a website section.
// The user is standing inside a luxury cocktail bar at midnight.
// Three-layer parallax creates genuine depth.
//
// Priority: if all text is hidden, this must still look like a bar.
// ════════════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────────────
// SVG BOTTLE SILHOUETTES — 8 distinct shapes, viewBox 0 0 100 200
// ────────────────────────────────────────────────────────────────────

const BOTTLE_PATHS = [
  // 0 — Tall slim (gin/vodka) — defined shoulder, narrow body
  'M32,200 L30,75 Q30,58 38,52 L40,25 L39,17 Q39,5 50,5 Q61,5 61,17 L60,25 L62,52 Q70,58 70,75 L68,200 Z',
  // 1 — Wide rounded (whiskey) — bulbous body
  'M24,200 Q18,140 26,85 Q34,58 42,52 L44,24 Q44,10 50,10 Q56,10 56,24 L58,52 Q66,58 74,85 Q82,140 76,200 Z',
  // 2 — Classic tapered (wine) — sloping shoulders
  'M34,200 L32,92 Q32,68 40,58 L42,25 L42,14 Q42,5 50,5 Q58,5 58,14 L58,25 L60,58 Q68,68 68,92 L66,200 Z',
  // 3 — Square body (cognac) — straight sides, angular
  'M30,200 L30,70 Q30,58 38,52 L42,24 Q42,10 50,10 Q58,10 58,24 L62,52 Q70,58 70,70 L70,200 Z',
  // 4 — Short stout (amaro) — very wide, low
  'M20,200 Q15,150 22,100 Q30,68 42,60 L44,30 Q44,16 50,16 Q56,16 56,30 L58,60 Q70,68 78,100 Q85,150 80,200 Z',
  // 5 — Elegant tall (champagne) — long flowing taper
  'M36,200 L34,130 Q30,88 36,60 L41,28 Q41,8 50,5 Q59,8 59,28 L64,60 Q70,88 66,130 L64,200 Z',
  // 6 — Decanter — wide base, narrow top
  'M22,200 Q16,155 20,110 Q28,75 38,65 L40,32 L40,20 Q40,10 50,10 Q60,10 60,20 L60,32 L62,65 Q72,75 80,110 Q84,155 78,200 Z',
  // 7 — Flask — flat, wide body
  'M26,200 L24,90 Q24,65 35,55 L38,30 Q38,15 50,12 Q62,15 62,30 L65,55 Q76,65 76,90 L74,200 Z',
];

// Fill colors — muted, dark, organic. Gold-dominant.
const BOTTLE_FILLS = [
  { fill: 'rgba(201,162,39,0.18)', glow: 'rgba(201,162,39,0.22)', lit: true },
  { fill: 'rgba(160,130,50,0.14)', glow: 'rgba(160,130,50,0.16)', lit: true },
  { fill: 'rgba(130,105,55,0.10)', glow: 'rgba(130,105,55,0.10)', lit: false },
  { fill: 'rgba(100,80,45,0.08)',  glow: 'rgba(100,80,45,0.06)',  lit: false },
  { fill: 'rgba(85,115,145,0.07)', glow: 'rgba(85,115,145,0.06)', lit: false },
  { fill: 'rgba(135,70,70,0.07)',  glow: 'rgba(135,70,70,0.06)',  lit: false },
  { fill: 'rgba(80,125,85,0.06)',  glow: 'rgba(80,125,85,0.05)',  lit: false },
  { fill: 'rgba(160,140,100,0.12)',glow: 'rgba(160,140,100,0.12)',lit: true },
];


// ── Seeded PRNG ───────────────────────────────────────────────────
function seededRng(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function generateBottleData(count, seed) {
  const r = seededRng(seed);
  return Array.from({ length: count }, (_, i) => {
    const fillIdx = Math.floor(r() * BOTTLE_FILLS.length);
    return {
      pathIdx: Math.floor(r() * BOTTLE_PATHS.length),
      w: 16 + r() * 16,
      h: 44 + r() * 52,
      fillIdx,
      delay: r() * 8,
      duration: 5 + r() * 5,
      isLit: BOTTLE_FILLS[fillIdx].lit,
      brightness: 0.3 + r() * 0.7, // 0.3–1.0 — irregular lighting
    };
  });
}


// ── BOTTLE ────────────────────────────────────────────────────────

function Bottle({ pathIdx, w, h, fillIdx, delay, duration, isLit, brightness }) {
  const palette = BOTTLE_FILLS[fillIdx];
  const baseOpacity = brightness;
  const minOpacity = baseOpacity * 0.4;
  const maxOpacity = baseOpacity;

  return (
    <div className="flex-shrink-0 relative" style={{ width: w, height: h }}>
      {/* Backlight glow behind lit bottles */}
      {isLit && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '-40%', left: '-50%', width: '200%', height: '160%',
            background: `radial-gradient(ellipse, ${palette.glow} 0%, transparent 65%)`,
            filter: 'blur(8px)',
            opacity: brightness * 0.5,
          }}
        />
      )}
      <motion.svg
        viewBox="0 0 100 200"
        width={w} height={h}
        preserveAspectRatio="none"
        style={{ display: 'block', position: 'relative', zIndex: 1, filter: isLit ? `drop-shadow(0 0 6px ${palette.glow})` : 'none' }}
        animate={{ opacity: [minOpacity, maxOpacity, minOpacity] }}
        transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
      >
        <path d={BOTTLE_PATHS[pathIdx]} fill={palette.fill} />
        {/* Glass edge highlight on lit bottles */}
        {isLit && (
          <path d={BOTTLE_PATHS[pathIdx]} fill="none" stroke="rgba(201,162,39,0.06)" strokeWidth="1.5" />
        )}
      </motion.svg>
    </div>
  );
}


// ── PHYSICAL SHELF ────────────────────────────────────────────────
// Thick wooden shelf with shadows, brackets, and bottles sitting on top

function ShelfUnit({ bottles, backlightIntensity = 0 }) {
  return (
    <div className="relative w-full">
      {/* Bottles sitting ON the shelf */}
      <div className="flex items-end justify-center gap-2 md:gap-4 lg:gap-5 mx-[6%] md:mx-[8%] mb-0 relative" style={{ zIndex: 2 }}>
        {bottles.map((b, i) => <Bottle key={i} {...b} />)}
      </div>

      {/* The physical shelf */}
      <div className="relative mx-[5%] md:mx-[7%]" style={{ zIndex: 1 }}>
        {/* Top edge brass strip */}
        <div className="h-[1px]" style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(201,162,39,0.06) 20%, rgba(201,162,39,0.09) 50%, rgba(201,162,39,0.06) 80%, transparent 95%)',
        }} />
        {/* Shelf body — dark walnut, physically thick */}
        <div className="h-[8px] md:h-[10px]" style={{
          background: 'linear-gradient(180deg, #1c1826 0%, #161220 40%, #100d18 100%)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.7), 0 2px 5px rgba(0,0,0,0.5)',
        }} />
        {/* Underside shadow gradient */}
        <div className="h-[12px]" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)',
        }} />
      </div>

      {/* Shelf brackets — small triangular supports */}
      {[{ left: '10%' }, { left: '30%' }, { right: '30%' }, { right: '10%' }].map((pos, i) => (
        <div key={i} className="absolute hidden md:block" style={{ ...pos, top: 'calc(100% - 12px)', zIndex: 0 }}>
          <div style={{
            width: 6, height: 10,
            clipPath: i % 2 === 0 ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)',
            background: '#14101c',
            boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
          }} />
        </div>
      ))}

      {/* Optional warm backlight behind shelf */}
      {backlightIntensity > 0 && (
        <div className="absolute top-[-80%] left-[15%] right-[15%] h-[160%] pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 80%, rgba(201,162,39,${0.02 * backlightIntensity}) 0%, transparent 70%)`,
          filter: 'blur(10px)', zIndex: 0,
        }} />
      )}
    </div>
  );
}


// ── BAR COUNTER ───────────────────────────────────────────────────
// Physical counter with visible thickness, perspective, and polish

function BarCounter() {
  return (
    <div className="relative w-full h-full">
      {/* === COUNTER TOP SURFACE (viewed from slightly above) === */}
      <div className="absolute top-0 left-[1%] right-[1%] h-[28px] md:h-[34px]" style={{
        background: 'linear-gradient(180deg, #201a2a 0%, #181322 40%, #121018 100%)',
        borderTop: '2px solid rgba(201,162,39,0.10)',
        boxShadow: '0 -4px 25px rgba(201,162,39,0.03), inset 0 3px 12px rgba(0,0,0,0.4)',
      }}>
        {/* Polished surface reflection — warm streak across the top */}
        <div className="absolute top-[2px] left-0 right-0 h-[6px] opacity-[0.025]" style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(201,162,39,0.5) 30%, rgba(201,162,39,0.8) 50%, rgba(201,162,39,0.5) 70%, transparent 95%)',
        }} />
        {/* Subtle wood grain on surface */}
        <div className="absolute inset-0 opacity-[0.008]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(201,162,39,0.4) 22px, rgba(201,162,39,0.4) 23px)',
        }} />
      </div>

      {/* === COUNTER FRONT FACE (vertical surface facing the viewer) === */}
      <div className="absolute left-[1%] right-[1%]" style={{ top: 28, bottom: 0 }}>
        {/* Main gradient — polished dark wood */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #0f0c16 0%, #0b0912 30%, #080610 60%, #050408 100%)',
        }} />
        {/* Vertical wood panel divisions */}
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,162,39,0.3) 80px, rgba(201,162,39,0.3) 81px)',
        }} />
        {/* Horizontal trim band across the front */}
        <div className="absolute top-[25%] left-0 right-0 h-[2px] opacity-[0.04]" style={{
          background: 'linear-gradient(90deg, transparent 3%, rgba(201,162,39,0.5) 20%, rgba(201,162,39,0.8) 50%, rgba(201,162,39,0.5) 80%, transparent 97%)',
        }} />
        {/* Bottom edge shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-[20px]" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }} />
      </div>

      {/* Warm light pool on the counter surface */}
      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[350px] h-[100px] rounded-full blur-[50px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse, rgba(201,162,39,0.04) 0%, transparent 70%)',
      }} />
    </div>
  );
}


// ── COUNTER OBJECTS ───────────────────────────────────────────────
// Small premium silhouettes sitting ON the counter surface

function CounterObjects() {
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none hidden md:block" style={{ zIndex: 3 }}>
      {/* Cocktail coupe glass — left area */}
      <svg className="absolute" style={{ left: '15%', top: -32 }} width="22" height="32" viewBox="0 0 60 90" fill="none">
        <path d="M10,3 L50,3 Q50,5 48,6 L33,30 L33,60 L27,60 L27,30 L12,6 Q10,5 10,3 Z" fill="rgba(180,160,120,0.05)" stroke="rgba(201,162,39,0.04)" strokeWidth="1"/>
        <ellipse cx="30" cy="64" rx="13" ry="3" fill="rgba(180,160,120,0.04)"/>
        <path d="M17,12 L43,12 L33,28 L27,28 Z" fill="rgba(201,162,39,0.025)"/>
      </svg>

      {/* Standing bottle — left-center */}
      <svg className="absolute" style={{ left: '28%', top: -40 }} width="14" height="40" viewBox="0 0 100 200" fill="none">
        <path d={BOTTLE_PATHS[2]} fill="rgba(140,120,80,0.06)" stroke="rgba(201,162,39,0.025)" strokeWidth="1.5"/>
      </svg>

      {/* Cocktail shaker — right area */}
      <svg className="absolute" style={{ right: '18%', top: -44 }} width="16" height="44" viewBox="0 0 40 100" fill="none">
        <rect x="14" y="0" width="12" height="8" rx="2" fill="rgba(160,145,115,0.06)"/>
        <path d="M10,8 L30,8 L32,82 Q32,92 20,92 Q8,92 8,82 Z" fill="rgba(140,125,100,0.05)" stroke="rgba(201,162,39,0.025)" strokeWidth="1"/>
      </svg>

      {/* Small brass tray / coaster — far right */}
      <div className="absolute" style={{ right: '8%', top: -4 }}>
        <div style={{ width: 30, height: 3, borderRadius: 2, background: 'rgba(201,162,39,0.04)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}/>
      </div>

      {/* Cutting board — far left */}
      <div className="absolute" style={{ left: '6%', top: -5 }}>
        <div style={{ width: 36, height: 4, borderRadius: 1, background: 'rgba(120,100,70,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
      </div>
    </div>
  );
}


// ── CANDLE WITH ANIMATED FLAME ────────────────────────────────────

function CandleHolder({ left }) {
  return (
    <div className="absolute hidden md:block" style={{ left, top: -38, zIndex: 4 }}>
      {/* Warm radial light pool cast by candle */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ top: -30, width: 140, height: 100, filter: 'blur(45px)', background: 'radial-gradient(ellipse, rgba(201,162,39,0.055) 0%, transparent 70%)' }}
      />
      {/* Flame */}
      <motion.div className="mx-auto relative" style={{ width: 5, height: 14, marginBottom: 1 }}
        animate={{ opacity: [0.5, 0.9, 0.6, 1, 0.5], scaleY: [1, 1.18, 0.88, 1.12, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-full h-full rounded-full" style={{
          background: 'radial-gradient(ellipse at 50% 85%, rgba(220,180,50,0.9) 0%, rgba(201,162,39,0.4) 45%, transparent 100%)',
        }}/>
      </motion.div>
      {/* Candle body */}
      <div className="mx-auto rounded-t-sm" style={{ width: 7, height: 18, background: 'linear-gradient(180deg, #24202e 0%, #1a1624 100%)' }}/>
      {/* Brass holder */}
      <div className="mx-auto" style={{ width: 14, height: 4, borderRadius: 1, background: 'linear-gradient(180deg, #2a2435 0%, #1e1a28 100%)', borderTop: '1px solid rgba(201,162,39,0.08)' }}/>
    </div>
  );
}


// ── SMOKE WISP ────────────────────────────────────────────────────

function SmokeWisp({ x, w, h, delay, duration, driftX }) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: '15%', width: w, height: h, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(155,140,115,0.035) 0%, transparent 70%)', filter: 'blur(45px)',
      }}
      animate={{ y: [0, -200, -420], x: [0, driftX, driftX * 0.3], opacity: [0, 0.07, 0], scale: [0.5, 0.9, 1.3] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}


// ── DUST MOTES ────────────────────────────────────────────────────
// Tiny gold particles catching warm light

function DustMote({ x, y, size, delay, duration, driftX, driftY }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size,
        background: 'rgba(201,162,39,0.3)', boxShadow: '0 0 3px rgba(201,162,39,0.15)',
      }}
      animate={{ y: [0, driftY * 0.5, driftY], x: [0, driftX, driftX * 0.6], opacity: [0, 0.5, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'linear' }}
    />
  );
}


// ── HOW IT WORKS STATIONS ─────────────────────────────────────────

function StationCard({ icon, title, subtitle, children, prominent }) {
  return (
    <div className={`relative ${prominent ? 'md:-mt-3' : 'md:mt-2 md:opacity-80'}`}>
      <div className="relative px-4 py-5 md:px-5 md:py-6 rounded-lg border"
        style={{
          background: 'rgba(8,6,12,0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderColor: prominent ? 'rgba(201,162,39,0.08)' : 'rgba(201,162,39,0.04)',
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,162,39,${prominent ? 0.04 : 0.02})`,
        }}
      >
        <div className="flex justify-center mb-3">{icon}</div>
        <h3 className="font-playfair text-sm md:text-base font-black text-center mb-1 tracking-tight" style={{ color: '#ede8dc' }}>{title}</h3>
        <p className="font-inter text-[11px] md:text-xs text-smoke/50 text-center leading-relaxed">{subtitle}</p>
        {children}
      </div>
      {/* Reflection on counter below card */}
      {prominent && (
        <div className="absolute -bottom-3 left-[15%] right-[15%] h-5 rounded-full blur-xl" style={{ background: 'rgba(201,162,39,0.025)' }}/>
      )}
    </div>
  );
}

// Station icons
function VesselIcon() {
  return (
    <svg viewBox="0 0 60 70" width={44} height={52} fill="none">
      <path d="M18,5 L18,48 Q18,58 30,58 Q42,58 42,48 L42,5" stroke="rgba(201,162,39,0.12)" strokeWidth="1.5" fill="rgba(201,162,39,0.02)"/>
      <path d="M20,28 L40,28 L40,48 Q40,56 30,56 Q20,56 20,48 Z" fill="rgba(201,162,39,0.04)"/>
      <circle cx="26" cy="38" r="1.5" fill="rgba(201,162,39,0.20)"/>
      <circle cx="34" cy="42" r="1" fill="rgba(201,162,39,0.15)"/>
      <circle cx="30" cy="34" r="2" fill="rgba(201,162,39,0.12)"/>
      <circle cx="28" cy="48" r="1.2" fill="rgba(201,162,39,0.18)"/>
      <line x1="15" y1="5" x2="45" y2="5" stroke="rgba(201,162,39,0.08)" strokeWidth="1"/>
    </svg>
  );
}

function ShakerIcon() {
  return (
    <svg viewBox="0 0 50 70" width={38} height={52} fill="none">
      <rect x="18" y="2" width="14" height="10" rx="3" fill="rgba(201,162,39,0.06)" stroke="rgba(201,162,39,0.08)" strokeWidth="1"/>
      <path d="M12,12 L38,12 L40,56 Q40,64 25,64 Q10,64 10,56 Z" fill="rgba(201,162,39,0.03)" stroke="rgba(201,162,39,0.08)" strokeWidth="1"/>
      {/* Energy lines */}
      <line x1="5" y1="30" x2="12" y2="32" stroke="rgba(201,162,39,0.06)" strokeWidth="0.8"/>
      <line x1="38" y1="28" x2="46" y2="26" stroke="rgba(201,162,39,0.06)" strokeWidth="0.8"/>
      <line x1="4" y1="40" x2="10" y2="42" stroke="rgba(201,162,39,0.04)" strokeWidth="0.8"/>
      <line x1="40" y1="42" x2="47" y2="40" stroke="rgba(201,162,39,0.04)" strokeWidth="0.8"/>
    </svg>
  );
}

function PourIcon() {
  return (
    <svg viewBox="0 0 50 60" width={38} height={46} fill="none">
      <rect x="8" y="4" width="34" height="48" rx="3" fill="rgba(201,162,39,0.02)" stroke="rgba(201,162,39,0.08)" strokeWidth="1"/>
      <line x1="14" y1="14" x2="36" y2="14" stroke="rgba(201,162,39,0.06)" strokeWidth="0.8"/>
      <line x1="14" y1="20" x2="30" y2="20" stroke="rgba(201,162,39,0.04)" strokeWidth="0.8"/>
      <line x1="14" y1="26" x2="33" y2="26" stroke="rgba(201,162,39,0.04)" strokeWidth="0.8"/>
      <rect x="14" y="32" width="22" height="3" rx="1" fill="rgba(201,162,39,0.06)"/>
      <line x1="14" y1="40" x2="26" y2="40" stroke="rgba(201,162,39,0.03)" strokeWidth="0.8"/>
      <line x1="14" y1="44" x2="22" y2="44" stroke="rgba(201,162,39,0.03)" strokeWidth="0.8"/>
    </svg>
  );
}


// ════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════

export default function BarParallax() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // ── PARALLAX TRANSFORMS ───────────────────────────────────────
  // Wall: gentle drift — feels far away
  const wallY = useTransform(scrollYProgress, [0, 1], [60, -160]);
  // Counter: dramatic shift — feels physically close
  const counterY = useTransform(scrollYProgress, [0, 1], [180, -500]);

  // ── PHASE-BASED REVEALS ───────────────────────────────────────
  // Phase 1: Environment fades in
  const envOpacity = useTransform(scrollYProgress, [0.08, 0.25], [0, 1]);
  // Phase 2: Fully established (env stays at opacity 1)
  // Phase 3: Content appears
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.48], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.48], [30, 0]);
  // Stations appear after heading
  const stationsOpacity = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);
  const stationsY = useTransform(scrollYProgress, [0.45, 0.58], [40, 0]);

  // ── STABLE SHELF DATA ─────────────────────────────────────────
  const shelves = useMemo(() => ({
    top:    generateBottleData(5, 111),
    mid:    generateBottleData(7, 222),
    bot:    generateBottleData(6, 333),
    mobA:   generateBottleData(4, 444),
    mobB:   generateBottleData(4, 555),
  }), []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative bg-room" style={{ minHeight: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Seamless blend from hero */}
        <div className="absolute top-0 left-0 w-full h-[18vh] pointer-events-none" style={{ background: 'linear-gradient(to bottom, #06060a 0%, transparent 100%)', zIndex: 20 }}/>

        {/* ═══════════ LAYER 1 — BACK WALL + SHELVES (0.25x) ═══ */}
        <motion.div
          className="absolute left-0 right-0"
          style={{ y: wallY, opacity: envOpacity, top: '-20%', height: '140%' }}
        >
          {/* Dark walnut wall base */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, #080610 0%, #0a0814 25%, #0c0a16 50%, #0a0812 75%, #070610 100%)',
          }}/>

          {/* Wood panel divisions — 5 vertical panels */}
          <div className="absolute inset-0 flex">
            {[0.02, 0.012, 0.016, 0.014, 0.018].map((op, i) => (
              <div key={i} className="flex-1" style={{
                borderRight: `1px solid rgba(201,162,39,${op})`,
                background: i % 2 === 0 ? 'rgba(14,11,18,0.25)' : 'transparent',
              }}/>
            ))}
          </div>

          {/* Architectural crown molding */}
          <div className="absolute left-0 w-full" style={{ top: '11%' }}>
            <div className="h-[1px] mx-[3%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.04) 20%, rgba(201,162,39,0.06) 50%, rgba(201,162,39,0.04) 80%, transparent)' }}/>
            <div className="h-[4px] mx-[3%]" style={{ background: 'linear-gradient(180deg, rgba(20,16,26,0.6) 0%, transparent 100%)' }}/>
          </div>

          {/* ── Desktop: 3 shelves with bottles ── */}
          <div className="hidden md:block absolute inset-0">
            <div className="absolute w-full" style={{ top: '20%' }}>
              <ShelfUnit bottles={shelves.top} backlightIntensity={1.5} />
            </div>
            <div className="absolute w-full" style={{ top: '42%' }}>
              <ShelfUnit bottles={shelves.mid} backlightIntensity={2.0} />
            </div>
            <div className="absolute w-full" style={{ top: '62%' }}>
              <ShelfUnit bottles={shelves.bot} backlightIntensity={1.0} />
            </div>
          </div>

          {/* ── Mobile: 2 shelves ── */}
          <div className="md:hidden absolute inset-0">
            <div className="absolute w-full" style={{ top: '28%' }}>
              <ShelfUnit bottles={shelves.mobA} backlightIntensity={1.5} />
            </div>
            <div className="absolute w-full" style={{ top: '55%' }}>
              <ShelfUnit bottles={shelves.mobB} backlightIntensity={1.0} />
            </div>
          </div>

          {/* Warm side lighting */}
          <div className="absolute top-[30%] left-0 w-[180px] h-[300px] rounded-full blur-[80px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.018) 0%, transparent 70%)' }}/>
          <div className="absolute top-[25%] right-0 w-[160px] h-[280px] rounded-full blur-[70px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(175,138,55,0.014) 0%, transparent 70%)' }}/>
          {/* Central warm pool between shelves */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full blur-[90px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.022) 0%, transparent 65%)' }}/>
        </motion.div>


        {/* ═══════════ LAYER 2 — BAR COUNTER (0.6x) ════════════ */}
        <motion.div
          className="absolute left-0 w-full"
          style={{ y: counterY, opacity: envOpacity, top: '62%', height: '75%' }}
        >
          <BarCounter />
          <CounterObjects />
          <CandleHolder left="62%" />
        </motion.div>


        {/* ═══════════ LAYER 3 — ATMOSPHERE ════════════════════ */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
          {/* Smoke wisps (desktop only) */}
          <div className="hidden md:block">
            <SmokeWisp x={8} w={150} h={90} delay={0} duration={16} driftX={40}/>
            <SmokeWisp x={28} w={110} h={65} delay={5} duration={18} driftX={-25}/>
            <SmokeWisp x={50} w={130} h={80} delay={2} duration={14} driftX={30}/>
            <SmokeWisp x={72} w={100} h={60} delay={7} duration={17} driftX={-20}/>
            <SmokeWisp x={88} w={120} h={70} delay={4} duration={15} driftX={25}/>
          </div>

          {/* Dust motes catching warm light */}
          <DustMote x={20} y={35} size={1.5} delay={0} duration={10} driftX={15} driftY={-80}/>
          <DustMote x={45} y={45} size={2}   delay={3} duration={12} driftX={-10} driftY={-60}/>
          <DustMote x={65} y={30} size={1}   delay={6} duration={11} driftX={20} driftY={-90}/>
          <DustMote x={35} y={55} size={1.5} delay={2} duration={14} driftX={-15} driftY={-70}/>
          <DustMote x={80} y={40} size={1}   delay={8} duration={9} driftX={10} driftY={-50}/>
          <DustMote x={15} y={50} size={2}   delay={5} duration={13} driftX={-20} driftY={-100}/>
          <div className="hidden md:block">
            <DustMote x={55} y={25} size={1} delay={1} duration={15} driftX={12} driftY={-65}/>
            <DustMote x={72} y={55} size={1.5} delay={9} duration={10} driftX={-8} driftY={-55}/>
          </div>
        </div>


        {/* Vignette — depth around edges */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 82% 78% at 50% 45%, transparent 50%, rgba(6,6,10,0.55) 100%)', zIndex: 7,
        }}/>


        {/* ═══════════ CONTENT — HOW IT WORKS ═════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{ opacity: contentOpacity, y: contentY, zIndex: 10 }}
        >
          {/* Readability backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,6,10,0.60) 0%, transparent 65%)' }}/>

          <div className="relative text-center max-w-2xl mx-auto select-none mb-8">
            <div className="mb-5">
              <span className="font-inter text-[10px] md:text-[11px] tracking-[0.3em] text-tarnished-gold/60 uppercase">How It Works</span>
              <div className="mt-3 mx-auto w-6 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.35), transparent)' }}/>
            </div>
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-[1.25] tracking-tight" style={{ color: '#ede8dc' }}>
              Bring us your ingredients.{' '}
              <span className="text-gold/75">Watch the bartender work.</span>{' '}
              Take your pour.
            </h2>
          </div>
        </motion.div>


        {/* ═══════════ STATIONS ON THE COUNTER ═════════════════ */}
        <motion.div
          className="absolute bottom-[18%] md:bottom-[22%] left-0 w-full px-4"
          style={{ opacity: stationsOpacity, y: stationsY, zIndex: 12 }}
        >
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <StationCard
              icon={<VesselIcon />}
              title="Your Ingredients"
              subtitle="Raw data, signals, and variables pour into the vessel."
            />
            <StationCard
              icon={<ShakerIcon />}
              title="The Making"
              subtitle="40+ intelligence modules — LSTM, Monte Carlo, XGBoost — shake, stir, and blend."
              prominent
            />
            <StationCard
              icon={<PourIcon />}
              title="The Pour"
              subtitle="A finished prediction, served with confidence, edge, and proof."
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
