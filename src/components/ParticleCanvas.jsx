import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas — Gold dust constellation
 *
 * ~60 tiny gold particles drifting through a dark bar atmosphere.
 * Nearby particles connect with extremely thin gold lines.
 * On desktop, particles gently react to cursor movement (soft, not magnetic).
 * Pauses when off-screen for performance.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, targetX: null, targetY: null });
  const animationFrameId = useRef(null);
  const isVisible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isMobile = width < 768;
    // ~60 on desktop, ~25 on mobile — enough to notice but never noisy
    let particleCount = isMobile ? 25 : 60;

    let particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Tiny particles: 1px–2.5px — dust, not stars
        this.radius = 1 + Math.random() * 1.5;
        // Very low opacity — only apparent when looking closely
        this.opacity = 0.08 + Math.random() * 0.18; // 0.08 to 0.26

        // Slow natural drift: 0.08 to 0.25 px/frame
        const speed = 0.08 + Math.random() * 0.17;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Spring physics state for mouse interaction
        this.offsetX = 0;
        this.offsetY = 0;
        this.vxOffset = 0;
        this.vyOffset = 0;
      }

      update(mouseX, mouseY) {
        // Base drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges seamlessly
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Extremely soft mouse interaction — like disturbing dust in the air
        if (!isMobile && mouseX !== null && mouseY !== null) {
          const dx = mouseX - (this.x + this.offsetX);
          const dy = mouseY - (this.y + this.offsetY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          let targetOffsetX = 0;
          let targetOffsetY = 0;

          if (distance < 120) {
            // Very gentle attraction — NOT magnetic
            const force = (120 - distance) / 120;
            targetOffsetX = dx * force * 0.08;
            targetOffsetY = dy * force * 0.08;
          }

          // Soft spring: low stiffness, high damping
          const stiffness = 0.015;
          const damping = 0.96;

          const ax = (targetOffsetX - this.offsetX) * stiffness;
          const ay = (targetOffsetY - this.offsetY) * stiffness;

          this.vxOffset = (this.vxOffset + ax) * damping;
          this.vyOffset = (this.vyOffset + ay) * damping;

          this.offsetX += this.vxOffset;
          this.offsetY += this.vyOffset;
        } else {
          // Decay offset gracefully
          this.offsetX *= 0.94;
          this.offsetY *= 0.94;
        }
      }

      draw() {
        const drawX = this.x + this.offsetX;
        const drawY = this.y + this.offsetY;

        // Tiny soft-edged gold dot
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${this.opacity})`;
        ctx.fill();

        // Even tinier glow halo
        if (this.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, this.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 162, 39, ${this.opacity * 0.12})`;
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // ── Mouse handlers ──────────────────────────────────────────────────
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = null;
      mouseRef.current.targetY = null;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // ── Resize handler ──────────────────────────────────────────────────
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width < 768;
      particleCount = isMobile ? 25 : 60;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // ── Animation Loop ──────────────────────────────────────────────────
    const animate = () => {
      // Pause when off-screen for performance
      if (!isVisible.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates
      if (mouseRef.current.targetX !== null) {
        if (mouseRef.current.x === null) {
          mouseRef.current.x = mouseRef.current.targetX;
          mouseRef.current.y = mouseRef.current.targetY;
        } else {
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
        }
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }

      // Update and draw particles
      for (const p of particles) {
        p.update(mouseRef.current.x, mouseRef.current.y);
        p.draw();
      }

      // Draw extremely subtle connection lines
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const x1 = p1.x + p1.offsetX;
        const y1 = p1.y + p1.offsetY;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const x2 = p2.x + p2.offsetX;
          const y2 = p2.y + p2.offsetY;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            // Very low opacity connections
            const lineOpacity = 0.035 * (1 - dist / 90);
            ctx.strokeStyle = `rgba(201, 162, 39, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // ── IntersectionObserver to pause when off-screen ────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // ── Cleanup ─────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
