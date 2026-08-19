import React, { useEffect, useRef } from 'react';

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

    // Dynamic density based on device width
    let isMobile = width < 768;
    let particleCount = isMobile ? 30 : 80;

    let particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 2 + Math.random() * 2; // 2px to 4px
        this.opacity = 0.15 + Math.random() * 0.35; // 0.15 to 0.5
        
        // Speed: 0.2 to 0.5 px/frame
        const speed = 0.2 + Math.random() * 0.3;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Spring physics state
        this.offsetX = 0;
        this.offsetY = 0;
        this.vxOffset = 0;
        this.vyOffset = 0;
      }

      update(mouseX, mouseY) {
        // Base drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse attraction with spring physics (only on desktop/non-touch)
        if (!isMobile && mouseX !== null && mouseY !== null) {
          const dx = mouseX - (this.x + this.offsetX);
          const dy = mouseY - (this.y + this.offsetY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          let targetOffsetX = 0;
          let targetOffsetY = 0;

          if (distance < 150) {
            // Attract force proportional to closeness
            const force = (150 - distance) / 150;
            targetOffsetX = dx * force * 0.15;
            targetOffsetY = dy * force * 0.15;
          }

          // Spring physics: stiffness = 0.02, damping = 0.97
          const stiffness = 0.02;
          const damping = 0.97;

          const ax = (targetOffsetX - this.offsetX) * stiffness;
          const ay = (targetOffsetY - this.offsetY) * stiffness;

          this.vxOffset = (this.vxOffset + ax) * damping;
          this.vyOffset = (this.vyOffset + ay) * damping;

          this.offsetX += this.vxOffset;
          this.offsetY += this.vyOffset;
        } else {
          // Decay offset if mouse is gone or on mobile
          this.offsetX *= 0.95;
          this.offsetY *= 0.95;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(
          this.x + this.offsetX,
          this.y + this.offsetY,
          this.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Mouse handlers
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

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width < 768;
      particleCount = isMobile ? 30 : 80;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      if (!isVisible.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates for spring calculations
      if (mouseRef.current.targetX !== null) {
        if (mouseRef.current.x === null) {
          mouseRef.current.x = mouseRef.current.targetX;
          mouseRef.current.y = mouseRef.current.targetY;
        } else {
          // LERP mouse coordinates slightly for extra smoothness
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;
        }
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update(mouseRef.current.x, mouseRef.current.y);
        p.draw();
      });

      // Draw connections
      ctx.lineWidth = 0.5;
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

          if (dist < 100) {
            // Opacity scales down as distance gets closer to 100px
            const lineOpacity = 0.06 * (1 - dist / 100);
            ctx.strokeStyle = `rgba(255, 215, 0, ${lineOpacity})`;
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

    // IntersectionObserver to pause loop when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup
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
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-room"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
