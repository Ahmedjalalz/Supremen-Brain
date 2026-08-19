import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import { Menu, X, ArrowRight, RotateCcw } from 'lucide-react';

export default function HeroSection({ onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion animation definitions for the content entrance
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-room flex flex-col items-center justify-center overflow-hidden">
      {/* Background Interactive Particle Constellation */}
      <ParticleCanvas />

      {/* Floating Ambient Glow Light */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -z-20" />

      {/* Fixed Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-counter/85 backdrop-blur-xl border-b border-gold/5 py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <span className="font-playfair text-xl md:text-2xl font-black text-gold tracking-wide drop-shadow-[0_0_8px_rgba(255,215,0,0.2)]">
              SUPREME BRAIN
            </span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {['How It Works', 'The Menu', 'The Bartender'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-inter text-sm text-smoke hover:text-gold transition-colors duration-300 relative group tracking-wider"
              >
                {link}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right: CTA Button (Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Replay Cinematic Intro button */}
            <button
              onClick={onReplayIntro}
              title="Replay Entrance Cinematic"
              className="p-2.5 rounded-full bg-wood/50 border border-gold/10 hover:border-gold/30 hover:bg-wood text-tarnished-gold hover:text-gold transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] active:scale-95 flex items-center gap-1.5 text-xs font-medium font-inter"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Replay Entrance</span>
            </button>

            <button className="hidden md:inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-[#d4af37] text-[#06060a] font-inter text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-gold/20">
              Pull Up a Stool
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gold hover:bg-wood/40 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-height Drawer Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-[280px] bg-counter/95 backdrop-blur-2xl border-l border-gold/10 z-50 p-8 flex flex-col justify-between shadow-2xl h-screen"
            >
              <div className="flex flex-col gap-8 mt-12">
                <div className="flex justify-between items-center pb-6 border-b border-gold/10">
                  <span className="font-playfair text-lg font-black text-gold">THE BAR</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-md text-gold hover:bg-wood/40 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {['How It Works', 'The Menu', 'The Bartender'].map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-inter text-lg text-light hover:text-gold transition-colors duration-200 tracking-wide font-medium"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <button className="w-full py-3.5 rounded-full bg-gold text-[#06060a] font-inter text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all">
                  Pull Up a Stool
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Content Area */}
      <div className="max-w-4xl mx-auto px-6 text-center z-10 select-none">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge above headline */}
          <motion.div
            variants={heroItemVariants}
            className="px-3.5 py-1.5 rounded-full bg-wood/45 border border-gold/10 text-tarnished-gold font-inter text-xs tracking-widest font-semibold flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            THE BARTENDER IS IN
          </motion.div>

          {/* Main Title H1 */}
          <motion.h1
            variants={heroItemVariants}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl font-black text-light leading-[1.1] tracking-tight max-w-3xl"
          >
            Your data deserves a <span className="gold-shimmer-text">better bartender</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroItemVariants}
            className="font-inter text-base sm:text-lg md:text-xl text-smoke/90 leading-relaxed max-w-2xl mt-2 px-2"
          >
            Deep learning. Monte Carlo simulation. 40+ intelligence modules. One API. We take your raw data and mix it into predictions no one else can pour.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-[#06060a] font-inter text-base font-semibold hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group">
              <span>See the Menu</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-gold/40 text-gold font-inter text-base font-semibold hover:bg-gold/10 hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.12)] active:scale-95 transition-all duration-300">
              How It Works
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Aesthetic ambient lighting details at bottom */}
      <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-counter to-transparent pointer-events-none -z-20" />
    </div>
  );
}
