import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ────────────────────────────────────────────────────────────────────
// SVG BOTTLE SILHOUETTES — viewBox 0 0 100 200
// Elegant geometric shapes, each a distinct spirit category
// ────────────────────────────────────────────────────────────────────

const BOTTLE_PATHS = [
  // 0 — Tall slim (gin / vodka)
  'M32,200 L30,72 Q30,56 39,50 L41,24 L39,17 Q39,6 50,6 Q61,6 61,17 L59,24 L61,50 Q70,56 70,72 L68,200 Z',
  // 1 — Wide rounded (whiskey)
  'M24,200 Q19,135 27,82 Q34,56 43,50 L44,22 Q44,9 50,9 Q56,9 56,22 L57,50 Q66,56 73,82 Q81,135 76,200 Z',
  // 2 — Classic tapered (wine)
  'M33,200 L31,88 Q31,64 41,54 L43,22 L43,11 Q43,4 50,4 Q57,4 57,11 L57,22 L59,54 Q69,64 69,88 L67,200 Z',
  // 3 — Square body (cognac)
  'M29,200 L29,68 Q29,56 39,50 L43,22 Q43,9 50,9 Q57,9 57,22 L61,50 Q71,56 71,68 L71,200 Z',
  // 4 — Short stout (amaro)
  'M23,200 Q19,145 26,92 Q33,62 43,56 L45,26 Q45,13 50,13 Q55,13 55,26 L57,56 Q67,62 74,92 Q81,145 77,200 Z',
  // 5 — Elegant tall (champagne)
  'M36,200 L33,125 Q29,82 36,56 L41,26 Q41,7 50,4 Q59,7 59,26 L64,56 Q71,82 67,125 L64,200 Z',
];

// Fill colors — low opacity, category-coded. Gold dominant.
const BOTTLE_FILLS = [
  'rgba(201,162,39,0.22)',    // gold
  'rgba(201,162,39,0.18)',    // gold soft
  'rgba(175,138,55,0.16)',    // amber
  'rgba(138,102,48,0.13)',    // deep whiskey
  'rgba(92,122,155,0.09)',    // cool steel
  'rgba(142,75,75,0.09)',     // burgundy
  'rgba(88,135,92,0.07)',     // forest
];

// Glow halos (brighter, used in drop-shadow)
const GLOW_COLORS = [
  'rgba(201,162,39,0.28)',
  'rgba(201,162,39,0.22)',
  'rgba(175,138,55,0.20)',
  'rgba(138,102,48,0.16)',
  'rgba(92,122,155,0.12)',
  'rgba(142,75,75,0.12)',
  'rgba(88,135,92,0.09)',
];


// ── Seeded PRNG for stable renders ────────────────────────────────
function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateBottleData(count, seed) {
  const r = seededRng(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      pathIdx: Math.floor(r() * BOTTLE_PATHS.length),
      w: 18 + r() * 16,           // 18–34 px
      h: 50 + r() * 55,           // 50–105 px
      fillIdx: Math.floor(r() * BOTTLE_FILLS.length),
      delay: r() * 7,
      duration: 5 + r() * 4,      // 5–9 s per breath
    });
  }
  return out;
}


// ── Bottle SVG component ──────────────────────────────────────────

function Bottle({ pathIdx, w, h, fillIdx, delay, duration }) {
  return (
    <motion.div
      className="flex-shrink-0"
      style={{ width: w, height: h }}
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <svg
        viewBox="0 0 100 200"
        width={w}
        height={h}
        preserveAspectRatio="none"
        style={{
          display: 'block',
          filter: `drop-shadow(0 0 8px ${GLOW_COLORS[fillIdx]})`,
        }}
      >
        <path d={BOTTLE_PATHS[pathIdx]} fill={BOTTLE_FILLS[fillIdx]} />
      </svg>
    </motion.div>
  );
}


// ── Shelf row ─────────────────────────────────────────────────────

function ShelfRow({ bottles }) {
  return (
    <div className="flex items-end justify-center gap-3 md:gap-5 lg:gap-7">
      {bottles.map((b, i) => (
        <Bottle key={i} {...b} />
      ))}
    </div>
  );
}

// Shelf line (thin gold-tinted line below the bottles)
function ShelfLine({ width = '65%' }) {
  return (
    <div
      className="mx-auto h-[2px]"
      style={{
        width,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.04) 20%, rgba(201,162,39,0.07) 50%, rgba(201,162,39,0.04) 80%, transparent 100%)',
      }}
    />
  );
}


// ── Smoke wisp ────────────────────────────────────────────────────

function SmokeWisp({ x, w, h, delay, duration, driftX }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        bottom: '12%',
        width: w,
        height: h,
        borderRadius: '50%',
        background:
          'radial-gradient(ellipse, rgba(155,140,115,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        y: [0, -180, -380],
        x: [0, driftX, driftX * 0.3],
        opacity: [0, 0.08, 0],
        scale: [0.6, 1.0, 1.4],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeOut' }}
    />
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

  // ── Parallax layer transforms ─────────────────────────────────
  // Back wall (0.25×) — moves least, feels furthest away
  const wallY = useTransform(scrollYProgress, [0, 1], [100, -220]);
  // Counter (0.6×) — moves more, feels closer
  const counterY = useTransform(scrollYProgress, [0, 1], [60, -380]);

  // ── Content reveal ────────────────────────────────────────────
  const contentOpacity = useTransform(scrollYProgress, [0.22, 0.40], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.22, 0.40], [30, 0]);

  // ── Stable bottle data ────────────────────────────────────────
  const shelves = useMemo(
    () => ({
      top: generateBottleData(5, 111),
      mid: generateBottleData(7, 222),
      bot: generateBottleData(6, 333),
      // Mobile — two smaller shelves
      mobA: generateBottleData(4, 444),
      mobB: generateBottleData(5, 555),
    }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-room"
      style={{ minHeight: '200vh' }}
    >
      {/* ── Sticky viewport — everything composites inside here ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Seamless blend gradient from hero above */}
        <div
          className="absolute top-0 left-0 w-full h-[22vh] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #06060a 0%, transparent 100%)',
            zIndex: 15,
          }}
        />

        {/* ═══ LAYER 1 — BACK WALL (slowest) ═══════════════════ */}
        <motion.div
          className="absolute left-0 right-0"
          style={{ y: wallY, top: '-15%', height: '130%' }}
        >
          {/* Dark walnut wall */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 50% 40%, rgba(22,17,12,0.30) 0%, transparent 65%),
                linear-gradient(180deg, #06060a 0%, #09080e 40%, #07060b 100%)
              `,
            }}
          />

          {/* Barely-visible vertical wood grain */}
          <div
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(201,162,39,0.35) 30px, rgba(201,162,39,0.35) 31px)',
            }}
          />

          {/* ── Desktop shelves (3 rows ≈ 18 bottles) ── */}
          <div className="hidden md:block absolute inset-0">
            {/* Top shelf */}
            <div className="absolute w-full flex flex-col items-center" style={{ top: '16%' }}>
              <ShelfRow bottles={shelves.top} />
              <ShelfLine width="60%" />
            </div>
            {/* Middle shelf */}
            <div className="absolute w-full flex flex-col items-center" style={{ top: '37%' }}>
              <ShelfRow bottles={shelves.mid} />
              <ShelfLine width="68%" />
            </div>
            {/* Bottom shelf */}
            <div className="absolute w-full flex flex-col items-center" style={{ top: '56%' }}>
              <ShelfRow bottles={shelves.bot} />
              <ShelfLine width="60%" />
            </div>
          </div>

          {/* ── Mobile shelves (2 rows ≈ 9 bottles) ── */}
          <div className="md:hidden absolute inset-0">
            <div className="absolute w-full flex flex-col items-center" style={{ top: '22%' }}>
              <ShelfRow bottles={shelves.mobA} />
              <ShelfLine width="78%" />
            </div>
            <div className="absolute w-full flex flex-col items-center" style={{ top: '50%' }}>
              <ShelfRow bottles={shelves.mobB} />
              <ShelfLine width="78%" />
            </div>
          </div>

          {/* Warm light pools on the wall */}
          <div
            className="absolute top-[28%] left-[28%] w-[320px] h-[220px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.025) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-[42%] right-[22%] w-[260px] h-[200px] rounded-full blur-[85px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(175,138,55,0.018) 0%, transparent 70%)' }}
          />
        </motion.div>

        {/* ═══ LAYER 2 — BAR COUNTER (medium speed) ════════════ */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ y: counterY, height: '42%' }}
        >
          {/* Counter surface gradient — polished dark wood/stone */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg,
                transparent 0%,
                rgba(12,10,16,0.92) 12%,
                rgba(9,7,13,0.97) 32%,
                #07050b 60%,
                #040306 100%
              )`,
            }}
          />

          {/* Polished sheen — horizontal warm reflection */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg,
                transparent 5%,
                rgba(201,162,39,0.010) 25%,
                rgba(201,162,39,0.016) 50%,
                rgba(201,162,39,0.010) 75%,
                transparent 95%
              )`,
            }}
          />

          {/* Brass rail — top edge */}
          <div
            className="absolute top-0 left-[4%] right-[4%] h-[1.5px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,162,39,0.10) 20%, rgba(201,162,39,0.16) 50%, rgba(201,162,39,0.10) 80%, transparent)',
            }}
          />

          {/* Soft reflection glow below the rail */}
          <div
            className="absolute top-[2px] left-[10%] right-[10%] h-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,162,39,0.018) 0%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* ═══ LAYER 3 — ATMOSPHERE (smoke wisps) ══════════════ */}
        <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 8 }}>
          <SmokeWisp x={10} w={140} h={85} delay={0} duration={15} driftX={35} />
          <SmokeWisp x={30} w={100} h={60} delay={4} duration={17} driftX={-22} />
          <SmokeWisp x={50} w={125} h={75} delay={2} duration={14} driftX={28} />
          <SmokeWisp x={68} w={95} h={58} delay={7} duration={16} driftX={-18} />
          <SmokeWisp x={82} w={115} h={68} delay={3} duration={13} driftX={22} />
          <SmokeWisp x={20} w={80} h={50} delay={9} duration={18} driftX={-28} />
        </div>

        {/* Corner vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 80% at 50% 45%, transparent 55%, rgba(6,6,10,0.5) 100%)',
            zIndex: 9,
          }}
        />

        {/* ═══ CONTENT — "How It Works" ════════════════════════ */}
        <motion.div
          className="relative flex items-center justify-center h-full px-6"
          style={{ opacity: contentOpacity, y: contentY, zIndex: 10 }}
        >
          {/* Dark radial backdrop for readability */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[420px] rounded-full blur-[100px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(6,6,10,0.70) 0%, transparent 70%)',
            }}
          />

          <div className="relative text-center max-w-2xl mx-auto select-none">
            {/* Section label */}
            <div className="mb-6">
              <span className="font-inter text-[11px] tracking-[0.3em] text-tarnished-gold/70 uppercase">
                How It Works
              </span>
              <div
                className="mt-3 mx-auto w-8 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.4), transparent)',
                }}
              />
            </div>

            {/* Headline */}
            <h2
              className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-[1.22] tracking-tight"
              style={{ color: '#ede8dc' }}
            >
              Bring us your ingredients.{' '}
              <span className="text-gold/80">Watch the bartender work.</span>{' '}
              Take your pour.
            </h2>

            {/* Supporting copy */}
            <p className="font-inter text-sm md:text-base text-smoke/60 mt-6 max-w-lg mx-auto leading-relaxed">
              Three steps. Raw data in, intelligence out. No black boxes — just a
              transparent process you can watch, understand, and trust.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
