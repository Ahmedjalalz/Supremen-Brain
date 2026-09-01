import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Wine, ShieldCheck, Mail, Building, User } from 'lucide-react';

// ── REFINED GOLD CONFETTI BURST CANVAS ──────────────────────────────
function SubtleGoldCelebrationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // ~35 tiny, elegant gold foil flakes & dust motes
    const particles = Array.from({ length: 36 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.5;
      return {
        x: width / 2 + (Math.random() - 0.5) * 40,
        y: height / 2 - 20 + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        w: 3 + Math.random() * 4,
        h: 2 + Math.random() * 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
        color: Math.random() > 0.3 ? '#C9A227' : Math.random() > 0.5 ? '#eab308' : '#ede8dc',
        opacity: 0.9 + Math.random() * 0.1,
        decay: 0.005 + Math.random() * 0.008,
        gravity: 0.04,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      particles.forEach((p) => {
        if (p.opacity > 0.01) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.98;
          p.rotation += p.rotSpeed;
          p.opacity -= p.decay;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
}

// ── VERTICAL OPTIONS ────────────────────────────────────────────────
const VERTICALS = [
  'Finance',
  'Healthcare',
  'Sports',
  'Logistics',
  'Insurance',
  'Energy',
  'Marketing',
  'Research',
  'Other',
];

// ── VOLUME TIERS ────────────────────────────────────────────────────
const VOLUMES = ['<1K', '1K–10K', '10K–100K', '100K+'];

export default function WaitlistScene() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    vertical: 'Finance',
    volume: '10K–100K',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    // Simulate brief speakeasy reservation write
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="pull-up-a-stool"
      className="relative w-full bg-[#06060a] py-28 px-4 sm:px-6 lg:px-8 text-light overflow-hidden"
    >
      {/* Background Ambience: Quieter, Intimate Speakeasy Mood */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 30%, rgba(201, 162, 39, 0.15) 0%, transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(201,162,39,0.3) 45px, rgba(201,162,39,0.3) 46px)',
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* ── SECTION HEADER ── */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1 backdrop-blur-md">
            <Sparkles size={13} className="text-gold animate-pulse" />
            <span className="font-inter text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
              Private Reservation
            </span>
          </div>

          <h2 className="font-playfair text-3xl font-black tracking-tight text-[#ede8dc] sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Get Behind the Bar
          </h2>

          <p className="mx-auto mt-4 max-w-xl font-inter text-base md:text-lg text-smoke/90 leading-relaxed">
            We're pouring for a select few.{' '}
            <span className="text-gold font-semibold">Leave your name and we'll save you a seat.</span>
          </p>
        </div>

        {/* ── MAIN RESERVATION FORM CONTAINER ── */}
        <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-[#140e1f]/90 via-[#0a0711]/95 to-black p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
          {/* Top Inlay Brass Trim */}
          <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="waitlist-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-[11px] font-semibold text-tarnished-gold uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="What should we call you?"
                        className="w-full rounded-xl border border-gold/15 bg-black/60 px-4 py-3.5 pl-11 font-inter text-sm text-light placeholder:text-smoke/50 transition-all duration-300 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 focus:shadow-[0_0_18px_rgba(201,162,39,0.2)]"
                      />
                      <User size={16} className="absolute left-3.5 top-4 text-tarnished-gold/60" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-[11px] font-semibold text-tarnished-gold uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-gold/15 bg-black/60 px-4 py-3.5 pl-11 font-inter text-sm text-light placeholder:text-smoke/50 transition-all duration-300 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 focus:shadow-[0_0_18px_rgba(201,162,39,0.2)]"
                      />
                      <Mail size={16} className="absolute left-3.5 top-4 text-tarnished-gold/60" />
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block font-mono text-[11px] font-semibold text-tarnished-gold uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Who do you pour for?"
                      className="w-full rounded-xl border border-gold/15 bg-black/60 px-4 py-3.5 pl-11 font-inter text-sm text-light placeholder:text-smoke/50 transition-all duration-300 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 focus:shadow-[0_0_18px_rgba(201,162,39,0.2)]"
                    />
                    <Building size={16} className="absolute left-3.5 top-4 text-tarnished-gold/60" />
                  </div>
                </div>

                {/* Vertical Selection */}
                <div>
                  <label className="block font-mono text-[11px] font-semibold text-tarnished-gold uppercase tracking-wider mb-2.5">
                    Vertical
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {VERTICALS.map((vert) => (
                      <button
                        type="button"
                        key={vert}
                        onClick={() => setFormData({ ...formData, vertical: vert })}
                        className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                          formData.vertical === vert
                            ? 'border border-gold bg-gold/20 text-gold shadow-[0_0_12px_rgba(201,162,39,0.25)] font-bold'
                            : 'border border-gold/15 bg-black/50 text-smoke hover:border-gold/30 hover:text-light'
                        }`}
                      >
                        {vert}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prediction Volume Selection */}
                <div>
                  <label className="block font-mono text-[11px] font-semibold text-tarnished-gold uppercase tracking-wider mb-2.5">
                    Prediction Volume
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {VOLUMES.map((vol) => (
                      <button
                        type="button"
                        key={vol}
                        onClick={() => setFormData({ ...formData, volume: vol })}
                        className={`rounded-xl py-2.5 text-center font-mono text-xs transition-all duration-200 ${
                          formData.volume === vol
                            ? 'border border-gold bg-gold/20 text-gold shadow-[0_0_14px_rgba(201,162,39,0.25)] font-bold'
                            : 'border border-gold/15 bg-black/50 text-smoke hover:border-gold/30 hover:text-light'
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] py-4 font-inter text-sm font-bold tracking-wider text-[#0a0804] uppercase shadow-[0_0_25px_rgba(201,162,39,0.3)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_35px_rgba(201,162,39,0.45)] active:scale-[0.99] disabled:opacity-75"
                  >
                    <span>{isSubmitting ? 'Reserving Seat...' : 'Request a Seat'}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </motion.form>
            ) : (
              /* ── CONFIRMATION STATE WITH GOLD CONFETTI BURST ── */
              <motion.div
                key="waitlist-confirmed"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative py-12 px-4 text-center"
              >
                {/* Gold Confetti Burst Canvas */}
                <SubtleGoldCelebrationCanvas />

                {/* Wax Seal Gold Check Icon */}
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/70 bg-gradient-to-br from-[#2a1d10] via-[#150f08] to-black shadow-[0_0_35px_rgba(201,162,39,0.4)]">
                  <Check size={32} className="text-gold" />
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#ede8dc]">
                  You're on the list.
                </h3>

                <p className="mx-auto mt-3 max-w-md font-inter text-base text-smoke/90 leading-relaxed">
                  We'll be in touch within <span className="text-gold font-semibold">48 hours</span>.
                </p>

                {/* Stool Reservation Badge */}
                <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-gold/25 bg-black/60 px-5 py-2.5 font-mono text-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-tarnished-gold">Reserved Stool:</span>
                  <span className="font-bold text-gold">#{Math.floor(1000 + Math.random() * 9000)}</span>
                  <span className="text-smoke">· {formData.vertical} Pipeline</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
