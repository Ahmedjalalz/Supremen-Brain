import React, { useEffect, useRef } from 'react';

export default function CalmAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Significantly reduced particle count for a calm, quiet back-room mood
    const particleCount = 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.25 - 0.05,
      opacity: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.4 ? '#C9A227' : '#b8a44e',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Very faint warm amber hearth lighting pools */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 25% 15%, rgba(201, 162, 39, 0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(201, 162, 39, 0.08) 0%, transparent 60%)',
        }}
      />
      {/* Calm dust motes canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
    </>
  );
}
