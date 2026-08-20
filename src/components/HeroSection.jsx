import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import { Menu, X, ArrowRight, RotateCcw } from 'lucide-react';

// ── Bottle Shelf Background ────────────────────────────────────────────────────
// Abstract geometric bottle silhouettes with subtle internal glow.
// NOT photographs — elegant low-opacity shapes sitting on shelves in the dark.

const BOTTLE_PALETTES = [
  { fill: 'rgba(201,162,39,0.06)',  glow: 'rgba(201,162,39,0.03)' },   // gold
  { fill: 'rgba(180,140,60,0.05)', glow: 'rgba(180,140,60,0.025)' },  // amber
  { fill: 'rgba(120,90,50,0.05)',  glow: 'rgba(120,90,50,0.02)' },    // whiskey
  { fill: 'rgba(90,120,160,0.04)', glow: 'rgba(90,120,160,0.02)' },   // blue
  { fill: 'rgba(160,80,80,0.04)', glow: 'rgba(160,80,80,0.02)' },     // burgundy
  { fill: 'rgba(100,160,100,0.04)', glow: 'rgba(100,160,100,0.02)' }, // green
];

function BottleSilhouette({ height, width, neckWidth, neckHeight, palette, pulseDelay }) {
  return (
    <motion.div
      className="relative flex flex-col items-center flex-shrink-0"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay: pulseDelay,
        ease: 'easeInOut',
      }}
    >
      {/* Bottle neck */}
      <div
        style={{
          width: `${neckWidth}px`,
          height: `${neckHeight}px`,
          background: palette.fill,
          borderRadius: '3px 3px 1px 1px',
        }}
      />
      {/* Bottle body */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: palette.fill,
          borderRadius: '2px 2px 1px 1px',
          boxShadow: `0 0 20px ${palette.glow}, inset 0 0 12px ${palette.glow}`,
        }}
      />
    </motion.div>
  );
}

function BottleShelf({ bottles, shelfY }) {
  return (
    <div
      className="absolute w-full flex items-end justify-center gap-3 md:gap-5"
      style={{ bottom: `${shelfY}%` }}
    >
      {/* Shelf line */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-[1px]"
        style={{ background: 'rgba(201,162,39,0.03)' }}
      />
      {bottles.map((b, i) => (
        <BottleSilhouette key={i} {...b} />
      ))}
    </div>
  );
}

function generateBottles(count) {
  const bottles = [];
  for (let i = 0; i < count; i++) {
    const bodyH = 35 + Math.random() * 55;  // 35–90px body
    const bodyW = 14 + Math.random() * 18;   // 14–32px body
    const neckW = 4 + Math.random() * 6;     // 4–10px neck
    const neckH = 8 + Math.random() * 16;    // 8–24px neck
    bottles.push({
      height: bodyH,
      width: bodyW,
      neckWidth: neckW,
      neckHeight: neckH,
      palette: BOTTLE_PALETTES[Math.floor(Math.random() * BOTTLE_PALETTES.length)],
      pulseDelay: Math.random() * 6,
    });
  }
  return bottles;
}

function BarBackwall() {
  // Generate three shelves with 5–7 bottles each ≈ 18 total
  const shelves = useMemo(() => [
    { bottles: generateBottles(7), shelfY: 62 },
    { bottles: generateBottles(6), shelfY: 40 },
    { bottles: generateBottles(5), shelfY: 20 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Dark walnut wall texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 40%, rgba(25,18,12,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 30% 60%, rgba(20,15,8,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(20,15,8,0.15) 0%, transparent 60%)
          `,
        }}
      />

      {/* Shelves with bottles */}
      <div className="absolute inset-0 hidden md:block">
        {shelves.map((shelf, i) => (
          <BottleShelf key={i} {...shelf} />
        ))}
      </div>
      {/* Mobile: show only the middle shelf, simplified */}
      <div className="absolute inset-0 md:hidden">
        <BottleShelf bottles={shelves[1].bottles.slice(0, 4)} shelfY={45} />
      </div>
    </div>
  );
}


// ── Scroll Indicator ────────────────────────────────────────────────────────────
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none"
      style={{ zIndex: 5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.35 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="font-inter text-[10px] tracking-[0.25em] text-tarnished-gold uppercase">
        Scroll to explore
      </span>
      <motion.div
        className="w-[1px] h-5 bg-gradient-to-b from-gold/40 to-transparent"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}


// ── Main Hero Section ───────────────────────────────────────────────────────────
export default function HeroSection({ onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Entrance animation variants (staggered, cinematic) ──────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.22,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // custom ease-out
      },
    },
  };

  return (
    <div className="relative w-full bg-room">
      {/* ── Hero viewport ──────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex flex-col overflow-hidden">

        {/* Layer 0: Dark walnut wall + shelves + bottles */}
        <BarBackwall />

        {/* Layer 1: Ambient warm light pools */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Central warm pool */}
          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)' }}
          />
          {/* Left warm accent */}
          <div
            className="absolute top-[40%] left-[15%] w-[250px] h-[250px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(180,140,60,0.025) 0%, transparent 70%)' }}
          />
          {/* Right warm accent */}
          <div
            className="absolute top-[35%] right-[15%] w-[200px] h-[200px] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(180,140,60,0.02) 0%, transparent 70%)' }}
          />
        </div>

        {/* Layer 2: Subtle atmospheric haze */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="absolute bottom-0 left-0 w-full h-[40%]"
            style={{
              background: 'linear-gradient(to top, rgba(6,6,10,0.6) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Layer 3: Particle constellation */}
        <ParticleCanvas />

        {/* ── Navbar ──────────────────────────────────────────────────── */}
        <nav
          className={`fixed top-0 left-0 w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#08080e]/85 backdrop-blur-xl border-b border-gold/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
              : 'bg-transparent'
          }`}
          style={{ zIndex: 40 }}
        >
          <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-3.5' : 'py-5'
          }`}>
            {/* Left: Brand */}
            <a href="#" className="flex items-center">
              <span className="font-playfair text-lg md:text-xl font-black text-gold tracking-wider">
                SUPREME BRAIN
              </span>
            </a>

            {/* Center: Navigation (Desktop) */}
            <div className="hidden md:flex items-center gap-10">
              {['How It Works', 'The Menu', 'The Bartender'].map((link, index) => (
                <React.Fragment key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="font-inter text-[13px] text-smoke/80 hover:text-gold transition-colors duration-300 relative group tracking-wide"
                  >
                    {link}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-gold/50 transition-all duration-300 group-hover:w-full" />
                  </a>
                  {index < 2 && (
                    <span className="text-gold/15 text-[8px]">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right: CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Replay entrance (small, understated) */}
              <button
                onClick={onReplayIntro}
                title="Replay Entrance"
                className="p-2 rounded-full border border-gold/[0.08] hover:border-gold/20 text-tarnished-gold/60 hover:text-gold transition-all duration-300 active:scale-95"
              >
                <RotateCcw size={13} />
              </button>

              {/* Gold pill CTA (Desktop) */}
              <a
                href="#pull-up-a-stool"
                className="hidden md:inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-[12px] tracking-[0.12em] font-semibold hover:shadow-[0_0_18px_rgba(201,162,39,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 uppercase items-center"
              >
                Pull Up a Stool
              </a>

              {/* Hamburger (Mobile) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gold/70 hover:text-gold hover:bg-wood/30 transition-colors"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ── Mobile Drawer ──────────────────────────────────────────── */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 right-0 w-[280px] bg-[#08080e]/95 backdrop-blur-2xl border-l border-gold/[0.06] z-50 p-8 flex flex-col justify-between shadow-2xl h-screen"
              >
                <div className="flex flex-col gap-8 mt-12">
                  <div className="flex justify-between items-center pb-6 border-b border-gold/[0.06]">
                    <span className="font-playfair text-base font-black text-gold tracking-wider">THE BAR</span>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1 rounded-md text-gold/60 hover:text-gold transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                    {['How It Works', 'The Menu', 'The Bartender'].map((link) => (
                      <a
                        key={link}
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-inter text-base text-light/80 hover:text-gold transition-colors duration-200 tracking-wide"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <a
                    href="#pull-up-a-stool"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3.5 rounded-full bg-gold text-[#0a0804] font-inter text-[12px] tracking-[0.12em] font-semibold text-center hover:shadow-[0_0_18px_rgba(201,162,39,0.2)] transition-all uppercase"
                  >
                    Pull Up a Stool
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── Hero Content ────────────────────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center relative" style={{ zIndex: 5 }}>
          <div className="max-w-3xl mx-auto px-6 text-center select-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-playfair text-3xl sm:text-5xl md:text-[3.6rem] lg:text-[4.2rem] font-black leading-[1.12] tracking-tight"
                style={{ color: '#ede8dc' }}
              >
                Your data deserves a{' '}
                <span className="gold-shimmer-text">better bartender</span>.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="font-inter text-sm sm:text-base md:text-lg text-smoke/85 leading-relaxed max-w-xl mt-6 md:mt-8"
              >
                Deep learning. Monte Carlo simulation. 40+ intelligence modules. One API.
                We take your raw data and mix it into predictions no one else can pour.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10 w-full sm:w-auto"
              >
                {/* Primary: Gold filled pill */}
                <a
                  href="#the-menu"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-sm tracking-wide font-semibold hover:shadow-[0_0_22px_rgba(201,162,39,0.22)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 flex items-center justify-center gap-2 group"
                >
                  <span>See the Menu</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                {/* Secondary: Gold outline ghost */}
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border border-gold/30 text-gold/90 font-inter text-sm tracking-wide font-semibold hover:bg-gold/[0.06] hover:border-gold/50 active:scale-[0.98] transition-all duration-250 text-center"
                >
                  How It Works
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll invitation */}
        <ScrollIndicator />

      </section>
    </div>
  );
}
