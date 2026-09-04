import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id || 'toast'}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full pointer-events-auto"
      >
        <div className="flex items-start gap-3.5 p-4 rounded-xl border border-gold/40 bg-[#0c0c16]/95 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.18)]">
          <div className="h-8 w-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold shadow-[0_0_10px_rgba(201,162,39,0.25)]">
            <Sparkles size={16} />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <h4 className="font-playfair text-sm font-bold text-gold tracking-wide">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="font-inter text-xs text-smoke/90 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-smoke/60 hover:text-gold transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
