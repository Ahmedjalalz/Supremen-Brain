import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Trash2, Sparkles, Sliders } from 'lucide-react';

const OUTPUT_FORMATS = [
  { id: 'JSON', label: 'JSON — Structured Data Object', badge: '.json' },
  { id: 'CSV', label: 'CSV — Tabular Stream Rows', badge: '.csv' },
  { id: 'Plain Text', label: 'Plain Text — Executive Briefing', badge: '.txt' },
];

export default function IngredientsForm({
  cocktail,
  outputFormat,
  onChangeOutputFormat,
  dataInput,
  onChangeDataInput,
  parameters,
  onChangeParameters,
  secretIngredient,
  onToggleSecretIngredient,
}) {
  const [isTwistOpen, setIsTwistOpen] = useState(false);

  // Update preloaded data when cocktail changes
  useEffect(() => {
    if (cocktail?.defaultPayload) {
      onChangeDataInput(JSON.stringify(cocktail.defaultPayload, null, 2));
    }
    if (cocktail?.defaultParameters) {
      onChangeParameters(cocktail.defaultParameters);
    }
  }, [cocktail?.id]);

  const handleAddParameter = () => {
    onChangeParameters([
      ...parameters,
      { key: `custom_param_${parameters.length + 1}`, value: '0.5' },
    ]);
    if (!isTwistOpen) setIsTwistOpen(true);
  };

  const handleRemoveParameter = (idx) => {
    const updated = parameters.filter((_, i) => i !== idx);
    onChangeParameters(updated);
  };

  const handleParamKeyChange = (idx, newKey) => {
    const updated = [...parameters];
    updated[idx].key = newKey;
    onChangeParameters(updated);
  };

  const handleParamValChange = (idx, newVal) => {
    const updated = [...parameters];
    updated[idx].value = newVal;
    onChangeParameters(updated);
  };

  return (
    <div className="w-full space-y-6">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={12} className="text-gold" />
          <span className="font-mono text-[10px] font-semibold text-tarnished-gold uppercase tracking-widest">
            Your Ingredients
          </span>
        </div>
        <h3 className="font-playfair text-2xl sm:text-3xl font-black text-[#ede8dc] tracking-tight">
          Tell us what you're working with.
        </h3>
        <p className="mt-1 font-inter text-xs sm:text-sm text-smoke/90 leading-relaxed">
          Give the bartender your data. We'll handle the rest.
        </p>
      </div>

      {/* ── OUTPUT FORMAT (CHOOSE YOUR GLASS) ── */}
      <div className="rounded-xl border border-gold/15 bg-black/60 p-4 backdrop-blur-md">
        <label className="block font-mono text-[11px] font-bold text-tarnished-gold uppercase tracking-wider mb-1">
          Choose your glass
        </label>
        <span className="block font-inter text-xs text-smoke/80 mb-3">
          Choose how you'd like the prediction served.
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {OUTPUT_FORMATS.map((fmt) => (
            <button
              type="button"
              key={fmt.id}
              onClick={() => onChangeOutputFormat(fmt.id)}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left font-mono text-xs transition-all duration-200 cursor-pointer ${
                outputFormat === fmt.id
                  ? 'border border-gold bg-gold/20 text-gold shadow-[0_0_12px_rgba(201,162,39,0.25)] font-bold'
                  : 'border border-gold/15 bg-black/40 text-smoke/80 hover:border-gold/30 hover:text-light'
              }`}
            >
              <span>{fmt.id}</span>
              <span
                className={`rounded px-1.5 py-0.2 text-[9px] ${
                  outputFormat === fmt.id ? 'bg-gold/30 text-gold' : 'bg-black/60 text-smoke/50'
                }`}
              >
                {fmt.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── DATA INPUT (POUR YOUR DATA) ── */}
      <div className="rounded-xl border border-gold/15 bg-black/60 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block font-mono text-[11px] font-bold text-tarnished-gold uppercase tracking-wider">
            Pour your data
          </label>
          <span className="font-mono text-[9px] text-smoke/70">
            JSON · CSV · Raw Telemetry
          </span>
        </div>
        <p className="font-inter text-xs text-smoke/80 mb-3">
          Paste your raw variables, financial ticks, or odds below.
        </p>

        <div className="relative">
          <textarea
            rows={7}
            value={dataInput}
            onChange={(e) => onChangeDataInput(e.target.value)}
            placeholder="Paste your data here… (JSON, CSV, or raw text)"
            className="w-full rounded-xl border border-gold/20 bg-[#07050b] p-3.5 font-mono text-xs text-emerald-400 placeholder:text-smoke/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 focus:shadow-[0_0_20px_rgba(201,162,39,0.15)] transition-all resize-y"
            spellCheck="false"
          />
          <div className="absolute right-3 bottom-3 pointer-events-none">
            <span className="font-mono text-[9px] text-tarnished-gold/60 bg-black/80 px-2 py-0.5 rounded border border-gold/15">
              {cocktail.name} Payload
            </span>
          </div>
        </div>
      </div>

      {/* ── ADD A TWIST (COLLAPSIBLE PARAMETERS) ── */}
      <div className="rounded-xl border border-gold/15 bg-black/60 p-4 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsTwistOpen(!isTwistOpen)}
          className="flex w-full items-center justify-between text-left cursor-pointer group"
        >
          <div>
            <div className="flex items-center gap-2">
              <Sliders size={13} className="text-gold" />
              <span className="font-mono text-[11px] font-bold text-tarnished-gold uppercase tracking-wider group-hover:text-gold transition-colors">
                Add a twist
              </span>
              <span className="rounded bg-gold/15 px-2 py-0.2 font-mono text-[9px] text-gold border border-gold/20">
                {parameters.length} Active
              </span>
            </div>
            <p className="font-inter text-xs text-smoke/80 mt-1">
              Optional parameters for a more precise pour.
            </p>
          </div>

          <motion.div
            animate={{ rotate: isTwistOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="p-1 rounded-full border border-gold/20 text-smoke group-hover:text-gold group-hover:border-gold"
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isTwistOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-3 border-t border-gold/10 space-y-2.5 overflow-hidden"
            >
              {parameters.map((param, idx) => (
                <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) => handleParamKeyChange(idx, e.target.value)}
                    placeholder="parameter_key"
                    className="flex-1 min-w-0 rounded-lg border border-gold/15 bg-[#09070f] px-2.5 sm:px-3 py-2 font-mono text-xs text-light placeholder:text-smoke/40 focus:border-gold focus:outline-none"
                  />
                  <span className="font-mono text-xs text-smoke/50 shrink-0">:</span>
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => handleParamValChange(idx, e.target.value)}
                    placeholder="value"
                    className="w-24 sm:w-36 shrink-0 rounded-lg border border-gold/15 bg-[#09070f] px-2.5 sm:px-3 py-2 font-mono text-xs text-gold placeholder:text-smoke/40 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveParameter(idx)}
                    className="p-2 shrink-0 rounded-lg border border-red-500/20 bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-red-300 transition-colors cursor-pointer"
                    title="Remove Parameter"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}

              <div className="pt-2 flex justify-start">
                <button
                  type="button"
                  onClick={handleAddParameter}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gold/20 bg-black/40 px-3 py-1.5 font-mono text-xs text-gold hover:bg-gold/10 hover:border-gold/40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Plus size={13} />
                  <span>Add Parameter</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SECRET INGREDIENT (TOGGLE) ── */}
      <div
        className={`rounded-xl border p-4 backdrop-blur-md transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer select-none ${
          secretIngredient
            ? 'border-gold/50 bg-[#161022] shadow-[0_0_20px_rgba(201,162,39,0.2)]'
            : 'border-gold/15 bg-black/60 hover:border-gold/30'
        }`}
        onClick={onToggleSecretIngredient}
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                secretIngredient ? 'bg-gold animate-pulse' : 'bg-smoke/40'
              }`}
            />
            <span className="font-mono text-xs font-bold text-light uppercase tracking-wider whitespace-nowrap">
              Secret ingredient
            </span>
          </div>
          <p className="font-inter text-xs text-smoke/80 mt-1 leading-snug">
            Let the House choose the recommended Bayesian hyperparameters.
          </p>
        </div>

        {/* Custom Brass Speakeasy Toggle Switch */}
        <div
          className={`relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors duration-300 ${
            secretIngredient ? 'bg-gold' : 'bg-black/80 border border-gold/20'
          }`}
        >
          <motion.div
            animate={{ x: secretIngredient ? 20 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`h-5 w-5 rounded-full shadow-md ${
              secretIngredient ? 'bg-[#0a0804]' : 'bg-smoke/60'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
