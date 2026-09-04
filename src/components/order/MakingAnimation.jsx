import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

const STAGES = {
  BOTTLES: 1,
  POUR: 2,
  SHAKE: 3,
  STRAIN: 4,
  GARNISH: 5,
  READY: 6,
};

const STAGE_LABELS = {
  [STAGES.BOTTLES]: 'Selecting ingredients…',
  [STAGES.POUR]: 'Pouring the data…',
  [STAGES.SHAKE]: 'Shaking the models…',
  [STAGES.STRAIN]: 'Straining the signal…',
  [STAGES.GARNISH]: 'Adding the final garnish…',
  [STAGES.READY]: 'Your pour is ready.',
};

export default function MakingAnimation({
  cocktail,
  isPouring = false,
  onSequenceComplete,
  className = '',
}) {
  const [currentStage, setCurrentStage] = useState(STAGES.BOTTLES);
  const [activeBottleIndex, setActiveBottleIndex] = useState(0);
  const canvasRef = useRef(null);
  const animTimeoutRef = useRef([]);

  // Reset and play 5-stage animation on cocktail change or when isPouring starts
  useEffect(() => {
    // Clear any active timers
    animTimeoutRef.current.forEach(clearTimeout);
    animTimeoutRef.current = [];

    // Stage 1: Bottles (0 - 1.2s)
    setCurrentStage(STAGES.BOTTLES);
    setActiveBottleIndex(0);

    const t1 = setTimeout(() => {
      setActiveBottleIndex(1);
    }, 400);

    const t2 = setTimeout(() => {
      setActiveBottleIndex(2);
    }, 800);

    // Stage 2: Pour (1.2s - 2.5s)
    const t3 = setTimeout(() => {
      setCurrentStage(STAGES.POUR);
    }, 1200);

    // Stage 3: Shake (2.5s - 4.0s)
    const t4 = setTimeout(() => {
      setCurrentStage(STAGES.SHAKE);
    }, 2500);

    // Stage 4: Strain (4.0s - 5.5s)
    const t5 = setTimeout(() => {
      setCurrentStage(STAGES.STRAIN);
    }, 4000);

    // Stage 5: Garnish (5.5s - 6.5s)
    const t6 = setTimeout(() => {
      setCurrentStage(STAGES.GARNISH);
    }, 5500);

    // Final: Ready (6.5s+)
    const t7 = setTimeout(() => {
      setCurrentStage(STAGES.READY);
      if (onSequenceComplete) {
        onSequenceComplete();
      }
    }, 6500);

    animTimeoutRef.current = [t1, t2, t3, t4, t5, t6, t7];

    return () => {
      animTimeoutRef.current.forEach(clearTimeout);
    };
  }, [cocktail.id, isPouring]);

  // Canvas particle stream for liquid during POUR and STRAIN stages
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const width = (canvas.width = 440);
    const height = (canvas.height = 360);

    const particles = [];
    const color = cocktail.accentColor || '#f59e0b';

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn liquid droplets during POUR (Bottle -> Shaker)
      if (currentStage === STAGES.POUR) {
        if (Math.random() > 0.15) {
          particles.push({
            x: 175 + (Math.random() - 0.5) * 6,
            y: 110,
            targetX: 220 + (Math.random() - 0.5) * 12,
            targetY: 230,
            progress: 0,
            speed: 0.05 + Math.random() * 0.03,
            radius: 1.5 + Math.random() * 2.2,
            alpha: 0.8 + Math.random() * 0.2,
          });
        }
      }

      // Spawn liquid droplets during STRAIN (Shaker -> Glass)
      if (currentStage === STAGES.STRAIN) {
        if (Math.random() > 0.1) {
          particles.push({
            x: 215 + (Math.random() - 0.5) * 8,
            y: 170,
            targetX: 220 + (Math.random() - 0.5) * 16,
            targetY: 265,
            progress: 0,
            speed: 0.06 + Math.random() * 0.04,
            radius: 1.8 + Math.random() * 2.0,
            alpha: 0.9,
          });
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;
        const curX = p.x + (p.targetX - p.x) * p.progress;
        const curY = p.y + (p.targetY - p.y) * p.progress + Math.sin(p.progress * Math.PI) * 4;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(curX, curY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha * (1 - p.progress * 0.3);
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Inner white glimmer
        ctx.beginPath();
        ctx.arc(curX - p.radius * 0.3, curY - p.radius * 0.3, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [currentStage, cocktail.accentColor]);

  const neonColor = cocktail.accentColor || '#f59e0b';
  const glowColor = cocktail.glowColor || 'rgba(245, 158, 11, 0.45)';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* ── AMBIENT COCKTAIL GLOW BACKGROUND ── */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-35 filter blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* ── MAIN STAGE VIEWPORT CONTAINER ── */}
      <div className="relative h-[330px] sm:h-[360px] w-full max-w-[460px] overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-[#140e1f]/95 via-[#0b0814]/98 to-black p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Decorative Vintage Brass Corner Filigree */}
        <div className="absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-gold/40 rounded-tl" />
        <div className="absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-gold/40 rounded-tr" />
        <div className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-gold/40 rounded-bl" />
        <div className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-gold/40 rounded-br" />

        {/* Speakeasy Bar Surface Line */}
        <div className="absolute bottom-12 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-11 left-10 right-10 h-[10px] bg-gradient-to-b from-[#1f1624] to-transparent opacity-50 filter blur-[1px]" />

        {/* Canvas Particle Overlay for Liquid Stream */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-30 h-full w-full"
        />

        {/* ── STAGE 1: BOTTLES ON SHELF ── */}
        <div className="absolute top-6 left-0 right-0 flex justify-center items-end gap-5 z-10">
          {[0, 1, 2].map((idx) => {
            const isActive = currentStage === STAGES.BOTTLES && activeBottleIndex >= idx;
            const isPouringBottle = currentStage === STAGES.POUR && idx === 1;

            return (
              <motion.div
                key={idx}
                animate={{
                  y: isPouringBottle ? 25 : isActive ? -8 : 0,
                  rotate: isPouringBottle ? -55 : isActive ? (idx === 0 ? 8 : idx === 2 ? -8 : 0) : 0,
                  scale: isActive || isPouringBottle ? 1.05 : 0.95,
                  opacity: currentStage >= STAGES.SHAKE ? 0.3 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
              >
                {/* Bottle Active Aura */}
                {(isActive || isPouringBottle) && (
                  <div
                    className="pointer-events-none absolute -inset-2 rounded-full opacity-60 filter blur-lg transition-opacity duration-300"
                    style={{ background: neonColor }}
                  />
                )}

                {/* SVG Bottle Silhouette */}
                <svg viewBox="0 0 40 100" width="34" height="85" className="relative z-10">
                  <defs>
                    <linearGradient id={`botGrad_${idx}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                      <stop offset="35%" stopColor="rgba(20,15,10,0.85)" />
                      <stop offset="70%" stopColor="rgba(30,22,15,0.7)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
                    </linearGradient>
                  </defs>
                  {/* Cap */}
                  <rect x="17" y="6" width="6" height="8" rx="1" fill="#C9A227" />
                  {/* Neck */}
                  <rect x="16" y="14" width="8" height="18" fill="url(#botGrad_${idx})" stroke={isActive || isPouringBottle ? '#C9A227' : 'rgba(201,162,39,0.4)'} strokeWidth="1" />
                  {/* Body */}
                  <path
                    d="M16 32 L8 44 L8 94 Q8 98 12 98 L28 98 Q32 98 32 94 L32 44 L24 32 Z"
                    fill="url(#botGrad_${idx})"
                    stroke={isActive || isPouringBottle ? '#C9A227' : 'rgba(201,162,39,0.4)'}
                    strokeWidth="1.2"
                  />
                  {/* Liquid inside bottle */}
                  <path
                    d="M9.5 50 L30.5 50 L30.5 94 Q30.5 96.5 28 96.5 L12 96.5 Q9.5 96.5 9.5 94 Z"
                    fill={neonColor}
                    fillOpacity={isActive || isPouringBottle ? 0.75 : 0.3}
                  />
                  {/* Label */}
                  <rect x="12" y="60" width="16" height="24" rx="1" fill="#14100c" stroke="rgba(201,162,39,0.7)" strokeWidth="0.8" />
                  <line x1="14" y1="67" x2="26" y2="67" stroke="#C9A227" strokeWidth="0.8" />
                  <line x1="15" y1="73" x2="25" y2="73" stroke="#a6a095" strokeWidth="0.5" />
                  <line x1="14" y1="79" x2="26" y2="79" stroke="#C9A227" strokeWidth="0.6" />
                </svg>

                {/* Bottle Index Tag */}
                <span className="mt-1 font-mono text-[8px] text-tarnished-gold tracking-wider uppercase">
                  MOD 0{idx + 1}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── STAGE 2 & 3: THE COCKTAIL SHAKER ── */}
        <motion.div
          animate={
            currentStage === STAGES.SHAKE
              ? {
                  x: [0, -12, 14, -8, 10, -4, 0],
                  y: [120, 108, 126, 114, 122, 116, 120],
                  rotate: [0, -14, 16, -10, 12, -4, 0],
                  scale: [1, 1.08, 0.98, 1.05, 1],
                }
              : currentStage === STAGES.STRAIN
              ? {
                  x: -35,
                  y: 110,
                  rotate: -65,
                  scale: 0.95,
                  opacity: 0.9,
                }
              : currentStage >= STAGES.GARNISH
              ? {
                  x: -95,
                  y: 155,
                  rotate: 0,
                  scale: 0.75,
                  opacity: 0.35,
                }
              : {
                  x: 0,
                  y: 135,
                  rotate: 0,
                  scale: 1,
                  opacity: currentStage === STAGES.BOTTLES ? 0.6 : 1,
                }
          }
          transition={
            currentStage === STAGES.SHAKE
              ? {
                  duration: 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          {/* Shaker Glow Aura */}
          {currentStage === STAGES.SHAKE && (
            <div
              className="pointer-events-none absolute -inset-6 rounded-full opacity-70 filter blur-xl animate-pulse"
              style={{ background: glowColor }}
            />
          )}

          {/* Stainless Steel / Brass Speakeasy Shaker SVG */}
          <svg viewBox="0 0 70 120" width="58" height="100">
            <defs>
              <linearGradient id="shakerMetal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4a3e2a" />
                <stop offset="25%" stopColor="#d4af37" />
                <stop offset="50%" stopColor="#f3e5ab" />
                <stop offset="75%" stopColor="#aa8c2c" />
                <stop offset="100%" stopColor="#2e2515" />
              </linearGradient>
              <linearGradient id="shakerBodyMetal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#221b10" />
                <stop offset="20%" stopColor="#9a7b2c" />
                <stop offset="45%" stopColor="#fef0cd" />
                <stop offset="70%" stopColor="#876b22" />
                <stop offset="100%" stopColor="#15100a" />
              </linearGradient>
            </defs>

            {/* Shaker Top Cap */}
            <path d="M26 8 L44 8 L41 18 L29 18 Z" fill="url(#shakerMetal)" stroke="#C9A227" strokeWidth="1" />
            <rect x="24" y="6" width="22" height="3" rx="1.5" fill="#FFD700" />

            {/* Shaker Tapered Shoulder */}
            <path d="M22 18 L48 18 L58 48 L12 48 Z" fill="url(#shakerMetal)" stroke="#C9A227" strokeWidth="1.2" />
            {/* Mid Joint Ring */}
            <rect x="10" y="47" width="50" height="4" rx="1" fill="#FFD700" stroke="#C9A227" strokeWidth="0.8" />

            {/* Shaker Main Body */}
            <path d="M12 50 L58 50 L48 114 Q48 118 42 118 L28 118 Q22 118 22 114 Z" fill="url(#shakerBodyMetal)" stroke="#C9A227" strokeWidth="1.2" />

            {/* Embossed Supreme Brain Emblem on Shaker */}
            <circle cx="35" cy="80" r="10" fill="#140f09" stroke="#FFD700" strokeWidth="0.9" />
            <path d="M30 80 Q35 74 40 80 Q35 86 30 80 Z" fill="none" stroke={neonColor} strokeWidth="1.2" />
            <circle cx="35" cy="80" r="2" fill="#FFD700" />
          </svg>
        </motion.div>

        {/* ── STAGE 4, 5 & READY: THE COCKTAIL GLASS & LIQUID FILL ── */}
        <motion.div
          animate={
            currentStage >= STAGES.STRAIN
              ? {
                  x: 0,
                  y: 175,
                  scale: 1,
                  opacity: 1,
                }
              : {
                  x: 60,
                  y: 200,
                  scale: 0.85,
                  opacity: 0.2,
                }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          {/* Glass Glow Aura when Filled */}
          {currentStage >= STAGES.GARNISH && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.8, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute -inset-8 rounded-full opacity-60 filter blur-2xl"
              style={{ background: glowColor }}
            />
          )}

          {/* SVG Coupe / Crystal Glass */}
          <svg viewBox="0 0 90 120" width="76" height="102" className="relative z-10">
            <defs>
              <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="20%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="80%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
              </linearGradient>
              <clipPath id="glassBowlClip">
                <path d="M10 20 Q45 10 80 20 Q75 68 45 70 Q15 68 10 20 Z" />
              </clipPath>
            </defs>

            {/* Glass Stem & Base */}
            <line x1="45" y1="70" x2="45" y2="110" stroke="rgba(201,162,39,0.6)" strokeWidth="2.5" />
            <path d="M25 114 Q45 110 65 114 L65 116 L25 116 Z" fill="rgba(201,162,39,0.8)" stroke="#FFD700" strokeWidth="0.8" />

            {/* Glass Bowl Outer Outline */}
            <path
              d="M10 20 Q45 10 80 20 Q75 68 45 70 Q15 68 10 20 Z"
              fill="url(#glassReflection)"
              stroke="rgba(201,162,39,0.7)"
              strokeWidth="1.4"
            />

            {/* Liquid Level Filling inside glass */}
            <g clipPath="url(#glassBowlClip)">
              <motion.rect
                x="0"
                y="0"
                width="90"
                height="80"
                initial={{ y: 80 }}
                animate={{
                  y:
                    currentStage === STAGES.STRAIN
                      ? 34
                      : currentStage >= STAGES.GARNISH
                      ? 26
                      : 80,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                fill={neonColor}
                fillOpacity="0.82"
              />

              {/* Glowing Liquid Meniscus Line */}
              {currentStage >= STAGES.STRAIN && (
                <motion.ellipse
                  cx="45"
                  cy={currentStage >= STAGES.GARNISH ? 27 : 35}
                  rx="30"
                  ry="5"
                  fill="#ffffff"
                  fillOpacity="0.3"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              )}
            </g>

            {/* Glass Highlights */}
            <path
              d="M14 26 Q17 58 40 66"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
          </svg>

          {/* ── STAGE 5: SIGNATURE GARNISH ── */}
          <AnimatePresence>
            {currentStage >= STAGES.GARNISH && (
              <motion.div
                initial={{ opacity: 0, y: -25, rotate: -30, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 120 }}
                className="absolute top-1 right-2 z-30 flex items-center justify-center"
              >
                {/* Specific Garnish Silhouette */}
                {cocktail.garnishType === 'citrus_twist' && (
                  <svg viewBox="0 0 32 32" width="26" height="26">
                    <path
                      d="M6 18 Q16 4 26 12 Q20 28 8 22"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 17 Q16 6 24 13"
                      fill="none"
                      stroke="#fef3c7"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {cocktail.garnishType === 'lime_wheel' && (
                  <svg viewBox="0 0 30 30" width="24" height="24">
                    <circle cx="15" cy="15" r="12" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                    <circle cx="15" cy="15" r="9" fill="#064e3b" />
                    <line x1="15" y1="6" x2="15" y2="24" stroke="#34d399" strokeWidth="0.8" />
                    <line x1="6" y1="15" x2="24" y2="15" stroke="#34d399" strokeWidth="0.8" />
                  </svg>
                )}

                {cocktail.garnishType === 'cyan_zest' && (
                  <svg viewBox="0 0 30 30" width="24" height="24">
                    <path d="M6 8 L24 24 M12 6 L26 20" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="15" cy="15" r="3" fill="#ecfeff" />
                  </svg>
                )}

                {cocktail.garnishType === 'cherry_bitters' && (
                  <svg viewBox="0 0 30 30" width="24" height="24">
                    <circle cx="12" cy="18" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                    <path d="M14 11 Q22 4 24 2" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="15" r="2" fill="#ffffff" fillOpacity="0.6" />
                  </svg>
                )}

                {cocktail.garnishType === 'gold_leaf_violet' && (
                  <svg viewBox="0 0 30 30" width="24" height="24">
                    <polygon points="15,4 20,12 28,14 22,20 24,28 15,23 6,28 8,20 2,14 10,12" fill="#FFD700" stroke="#C9A227" strokeWidth="0.8" />
                    <circle cx="15" cy="16" r="4" fill="#a855f7" />
                  </svg>
                )}

                {cocktail.garnishType === 'rosemary_sprig' && (
                  <svg viewBox="0 0 30 30" width="24" height="24">
                    <line x1="8" y1="26" x2="24" y2="4" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="20" x2="6" y2="18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="16" y1="14" x2="22" y2="12" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="20" y1="8" x2="14" y2="6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── ANIMATION TIMELINE STAGE CAPTION ── */}
      <div className="mt-4 flex items-center justify-center gap-2.5">
        {currentStage === STAGES.READY ? (
          <Check size={14} className="text-emerald-400" />
        ) : (
          <span
            className="h-2 w-2 rounded-full animate-ping"
            style={{ backgroundColor: neonColor }}
          />
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentStage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="font-inter text-xs font-semibold tracking-widest uppercase text-tarnished-gold"
          >
            {STAGE_LABELS[currentStage]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
