import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CocktailDataGlass({
  accentColor = '#f59e0b',
  glowColor = 'rgba(245, 158, 11, 0.45)',
  glassType = 'Highball Crystal',
  garnish = 'Citrus Twist',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = 240);
    const height = (canvas.height = 280);

    // Flowing intelligence data nodes
    const nodes = Array.from({ length: 32 }, () => ({
      x: 45 + Math.random() * 150,
      y: 90 + Math.random() * 150,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.4 - Math.random() * 0.8,
      radius: 1.2 + Math.random() * 2.2,
      alpha: 0.3 + Math.random() * 0.7,
      pulseSpeed: 0.03 + Math.random() * 0.05,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle wave vector fields inside the glass
      ctx.save();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25;

      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const baseWaveY = 110 + w * 45;
        for (let x = 45; x <= 195; x += 5) {
          const y = baseWaveY + Math.sin(time * 2 + x * 0.05 + w) * 6;
          if (x === 45) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Connect near nodes with neural vectors
      ctx.save();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 42) {
            ctx.globalAlpha = (1 - dist / 42) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Draw & update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounding inside glass bowl
        if (node.y < 85) {
          node.y = 240;
          node.x = 55 + Math.random() * 130;
        }
        if (node.x < 45) node.x = 195;
        if (node.x > 195) node.x = 45;

        const currentAlpha =
          node.alpha * (0.6 + 0.4 * Math.sin(time * node.pulseSpeed + node.pulseOffset));

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 8;
        ctx.fill();

        // White core glint
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = currentAlpha * 0.9;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-45 filter blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* ── COCKTAIL GLASS CONTAINER WITH FLOWING DATA ── */}
      <div className="relative h-[280px] w-[240px] flex items-center justify-center">
        {/* Contact Shadow */}
        <div className="absolute bottom-4 h-4 w-32 rounded-full bg-black/90 filter blur-md" />

        {/* Canvas for Particle Field and Neural Vectors */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full mix-blend-screen"
        />

        {/* SVG Cocktail Glass Shape */}
        <svg viewBox="0 0 160 220" width="180" height="250" className="relative z-10">
          <defs>
            <linearGradient id="crystalGlassGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="15%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="85%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
            </linearGradient>
            <clipPath id="resultsGlassClip">
              <path d="M30 40 Q80 25 130 40 Q122 145 80 150 Q38 145 30 40 Z" />
            </clipPath>
          </defs>

          {/* Stem & Solid Crystal Base */}
          <line x1="80" y1="150" x2="80" y2="200" stroke="rgba(201,162,39,0.8)" strokeWidth="3.5" />
          <path d="M45 204 Q80 198 115 204 L115 207 L45 207 Z" fill="rgba(201,162,39,0.9)" stroke="#FFD700" strokeWidth="1" />

          {/* Glass Outer Bowl */}
          <path
            d="M30 40 Q80 25 130 40 Q122 145 80 150 Q38 145 30 40 Z"
            fill="url(#crystalGlassGradient)"
            stroke="rgba(201,162,39,0.8)"
            strokeWidth="1.8"
          />

          {/* Liquid Shimmer Fill */}
          <g clipPath="url(#resultsGlassClip)">
            <rect
              x="20"
              y="50"
              width="120"
              height="110"
              fill={accentColor}
              fillOpacity="0.45"
            />
            {/* Liquid Meniscus */}
            <ellipse cx="80" cy="52" rx="48" ry="8" fill="#ffffff" fillOpacity="0.35" stroke="#ffffff" strokeWidth="0.8" />
          </g>

          {/* Crystal Bevel Highlights */}
          <path d="M36 50 Q42 125 72 142" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeOpacity="0.6" strokeLinecap="round" />
          <path d="M124 50 Q118 125 88 142" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Glass & Garnish Subtitle */}
      <div className="mt-1 text-center font-mono text-[10px] text-tarnished-gold tracking-wider uppercase">
        <span>{glassType}</span>
        <span className="text-smoke/50 mx-2">·</span>
        <span className="text-smoke/90">{garnish}</span>
      </div>
    </div>
  );
}
