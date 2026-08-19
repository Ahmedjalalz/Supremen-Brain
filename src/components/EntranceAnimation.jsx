import React, { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ── Timing constants ───────────────────────────────────────────────────────────
const BLACK_HOLD_MS = 500;  // 0.5s of pure black before video fades in
const VIDEO_FADE_MS = 600;  // video fade-in duration
const FADE_OUT_MS   = 800;  // fade to hero transition

// Helper hook to detect whether the viewport prefers vertical/portrait orientation
function useIsVertical() {
  const [isVertical, setIsVertical] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Aspect ratio < 1.05 covers mobile portrait, square, and vertical tablet viewports
    return window.innerWidth / window.innerHeight < 1.05;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth / window.innerHeight < 1.05);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return isVertical;
}

export default function EntranceAnimation({ onComplete }) {
  const videoRef = useRef(null);
  const doneRef  = useRef(false);
  const [stage, setStage] = useState('black');
  const isVertical = useIsVertical();

  // Pick vertical video for portrait/mobile, standard video for landscape/desktop
  const videoSrc = isVertical
    ? '/entrance-video-verticle.mp4'
    : '/entrance-video.mp4';

  // ── Exit → hero ──────────────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setStage('exit');
    // Note: re-enable localStorage persistence when ready:
    // localStorage.setItem('sb_visited', 'true');
    setTimeout(() => onComplete(), FADE_OUT_MS);
  }, [onComplete]);

  // ── Black hold (0.5s) → play & fade in ───────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('fadein');
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // If browser blocks autoplay, gracefully complete
          handleComplete();
        });
      }
    }, BLACK_HOLD_MS);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  // ── Mark as playing after fade-in duration ───────────────────────────────
  useEffect(() => {
    if (stage !== 'fadein') return;
    const timer = setTimeout(() => setStage('playing'), VIDEO_FADE_MS);
    return () => clearTimeout(timer);
  }, [stage]);

  // ── Auto-play when video src changes (e.g. orientation switch) ───────────
  useEffect(() => {
    if (stage === 'fadein' || stage === 'playing') {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [videoSrc, stage]);

  // ── Auto-complete on video end ───────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => handleComplete();
    video.addEventListener('ended', onEnded);
    return () => video.removeEventListener('ended', onEnded);
  }, [handleComplete, videoSrc]);

  const videoOpacity = stage === 'black' ? 0 : 1;

  // ─────────────────────────────────────────────────────────────────────────
  // SEAMLESS VIGNETTE BLENDING
  //
  // 1. Video is rendered with `objectFit: 'cover'`, ensuring zero hard cuts
  //    or harsh black bars regardless of aspect ratio.
  // 2. Linear edge gradients gently feather all 4 outer margins (top, bottom,
  //    left, right) into deep black `#000000`.
  // 3. The central 70%+ of the viewport is kept 100% clean and clear so text
  //    and key visuals remain crystal clear and unobstructed on all devices.
  // ─────────────────────────────────────────────────────────────────────────
  const edgeVignette = isVertical
    ? `linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 8%,  transparent 16%),
       linear-gradient(to top,    rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 8%,  transparent 16%),
       linear-gradient(to right,  rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 6%,  transparent 14%),
       linear-gradient(to left,   rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 6%,  transparent 14%)`
    : `linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 10%, transparent 20%),
       linear-gradient(to top,    rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.40) 10%, transparent 20%),
       linear-gradient(to right,  rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 8%,  transparent 16%),
       linear-gradient(to left,   rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 8%,  transparent 16%)`;

  const radialCornerVignette = isVertical
    ? 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 70%, rgba(0,0,0,0.35) 100%)'
    : 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 65%, rgba(0,0,0,0.40) 100%)';

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          key="entrance-video"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: '#000',
            overflow: 'hidden',
          }}
        >
          {/* ── Video Player ─────────────────────────────────────────────── */}
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              opacity: videoOpacity,
              transition: `opacity ${VIDEO_FADE_MS}ms ease`,
              display: 'block',
            }}
          />

          {/* ── Edge Feathering Vignette ─────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 2,
              background: edgeVignette,
              transition: 'background 0.4s ease',
            }}
          />

          {/* ── Soft Corner Vignette (Center stays 100% clear) ──────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 3,
              background: radialCornerVignette,
              transition: 'background 0.4s ease',
            }}
          />

          {/* ── Skip Button ─────────────────────────────────────────────── */}
          <button
            onClick={handleComplete}
            aria-label="Skip entrance"
            style={{
              position: 'absolute',
              bottom: 'clamp(16px, 3vh, 32px)',
              right:  'clamp(16px, 3vw, 36px)',
              fontFamily: 'Inter, sans-serif',
              fontSize:   'clamp(12px, 1.4vw, 14px)',
              color: '#b8a44e',
              opacity: 0.65,
              background: 'rgba(0,0,0,0.40)',
              border: '1px solid rgba(180,164,78,0.4)',
              borderRadius: 6,
              cursor: 'pointer',
              letterSpacing: '0.08em',
              zIndex: 55,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: 'clamp(4px,1vh,8px) clamp(10px,2vw,16px)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              transition: 'all 0.3s ease',
              pointerEvents: stage === 'black' ? 'none' : 'auto',
              visibility:    stage === 'black' ? 'hidden' : 'visible',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = '#FFD700';
              e.currentTarget.style.borderColor = 'rgba(255,215,0,0.65)';
              e.currentTarget.style.boxShadow = '0 0 14px rgba(255,215,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '0.65';
              e.currentTarget.style.color = '#b8a44e';
              e.currentTarget.style.borderColor = 'rgba(180,164,78,0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Skip <span style={{ fontSize: '1.1em' }}>→</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
