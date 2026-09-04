import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ChevronDown, Copy, Check, Terminal } from 'lucide-react';

export default function RawResponseViewer({ rawResponse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(rawResponse || {}, null, 2);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-gold/20 bg-gradient-to-b from-[#120e1c]/90 via-[#0a0710]/95 to-black p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
      {/* Header bar that toggles collapsible */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer group select-none"
      >
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-gold" />
          <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider group-hover:text-light transition-colors">
            Raw Response · JSON Attestation
          </span>
          <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/40 px-2 py-0.2 rounded border border-emerald-500/30">
            200 OK
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isOpen && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/25 bg-black/60 px-3 py-1 font-mono text-[10px] text-light/90 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={11} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={11} className="text-smoke" />
                  <span>COPY JSON</span>
                </>
              )}
            </button>
          )}

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="p-1 rounded-full border border-gold/20 text-smoke group-hover:text-gold group-hover:border-gold"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </div>

      {/* Expandable Code block */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-3 border-t border-gold/10 overflow-hidden"
          >
            <pre className="max-h-80 overflow-x-auto rounded-xl border border-gold/15 bg-[#050407] p-4 font-mono text-xs leading-relaxed text-emerald-400 scrollbar-thin">
              <code>{jsonString}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
