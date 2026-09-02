import React, { useRef, useEffect, useState } from 'react';

export default function BartenderVideoPanel({ isMobileBanner = false }) {
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

  if (isMobileBanner) {
    // ── MOBILE TOP CINEMATIC BANNER (Left 50% Bartender with Headroom) ──
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#06060a]">
        <video
          ref={videoRef}
          src="/assets/Login-video.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-[0%_35%] transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-95' : 'opacity-0'
          }`}
          style={{
            filter: 'brightness(0.92) contrast(1.1) saturate(1.05)',
          }}
        />

        {/* Ambient Warm Vignette */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(201, 162, 39, 0.18) 0%, transparent 75%)',
          }}
        />

        {/* Seamless Bottom Gradient into pure #06060a where panels render */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(6,6,10,0.3) 0%, transparent 25%, rgba(6,6,10,0.65) 70%, #06060a 100%),
              linear-gradient(to right, transparent 65%, rgba(6,6,10,0.5) 100%)
            `,
          }}
        />

        {/* Subtle Gold Dust */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>
    );
  }

  // ── DESKTOP FULL SCREEN VIDEO BACKGROUND ──
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#06060a]">
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/assets/Login-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`h-full w-full object-cover object-[28%_center] transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          filter: 'brightness(0.85) contrast(1.1) saturate(1.05)',
        }}
      />

      {/* Ambient Warmth Vignette Overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-color"
        style={{
          background: 'radial-gradient(ellipse at 30% 45%, rgba(201, 162, 39, 0.15) 0%, transparent 75%)',
        }}
      />

      {/* Seamless Dark Overlay on Right Half for Auth Panels */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, transparent 0%, transparent 35%, rgba(6,6,10,0.5) 50%, rgba(6,6,10,0.85) 70%, rgba(6,6,10,0.96) 100%),
            linear-gradient(to bottom, rgba(6,6,10,0.6) 0%, transparent 20%, transparent 80%, rgba(6,6,10,0.8) 100%)
          `,
        }}
      />

      {/* Subtle Gold Dust Glimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
