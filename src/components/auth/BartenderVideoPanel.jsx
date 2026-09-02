import React, { useRef, useEffect, useState } from 'react';

export default function BartenderVideoPanel() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isReversing = false;
    let lastTime = performance.now();

    // Configure video attributes
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 0.95;

    const playForward = () => {
      isReversing = false;
      video.playbackRate = 0.95;
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    };

    const reverseLoop = (now) => {
      if (!video) return;

      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isReversing) {
        const step = delta * 0.95;
        const newTime = video.currentTime - step;

        if (newTime <= 0.05) {
          video.currentTime = 0.01;
          playForward();
        } else {
          video.currentTime = newTime;
          animationFrameRef.current = requestAnimationFrame(reverseLoop);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (!isReversing && video.duration > 0) {
        if (video.currentTime >= video.duration - 0.08) {
          video.pause();
          isReversing = true;
          lastTime = performance.now();
          animationFrameRef.current = requestAnimationFrame(reverseLoop);
        }
      }
    };

    const handleEnded = () => {
      if (!isReversing) {
        video.pause();
        isReversing = true;
        lastTime = performance.now();
        animationFrameRef.current = requestAnimationFrame(reverseLoop);
      }
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      playForward();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);

    // Initial play attempt
    playForward();

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#06060a]">
      {/* ── FULL SCREEN VIDEO ELEMENT ── */}
      <video
        ref={videoRef}
        src="/assets/Login-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`h-full w-full object-cover object-[25%_center] md:object-[30%_center] transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          filter: 'brightness(0.85) contrast(1.1) saturate(1.05)',
        }}
      />

      {/* ── AMBIENT WARMTH VIGNETTE OVERLAY ── */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-color"
        style={{
          background: 'radial-gradient(ellipse at 30% 45%, rgba(201, 162, 39, 0.15) 0%, transparent 75%)',
        }}
      />

      {/* ── SEAMLESS DARK OVERLAY ON RIGHT HALF FOR AUTHENTICATION PANELS ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, transparent 0%, transparent 35%, rgba(6,6,10,0.5) 50%, rgba(6,6,10,0.85) 70%, rgba(6,6,10,0.96) 100%),
            linear-gradient(to bottom, rgba(6,6,10,0.6) 0%, transparent 20%, transparent 80%, rgba(6,6,10,0.8) 100%)
          `,
        }}
      />

      {/* ── MOBILE DARK FADE SO TEXT IS ALWAYS CRISP ── */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,6,10,0.3) 0%, rgba(6,6,10,0.8) 50%, #06060a 100%)',
        }}
      />

      {/* ── SUBTLE GOLD DUST GLIMMER OVERLAY ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
