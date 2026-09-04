import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, X, Wine, ArrowRight, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export default function NightcapTab({ history, onUpdateOrderOutcome, onShowToast, onSelectTab }) {
  // Select first pending order by default, or the first order
  const pendingOrders = history.filter((h) => h.outcome === 'PENDING');
  const defaultOrderId = pendingOrders.length > 0 ? pendingOrders[0].id : history[0]?.id || '';

  const [selectedOrderId, setSelectedOrderId] = useState(defaultOrderId);
  const [outcome, setOutcome] = useState('HIT'); // 'HIT' | 'MISS'
  const [userNotes, setUserNotes] = useState('');
  const [perceivedConfidence, setPerceivedConfidence] = useState(78);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOrder = history.find((h) => h.id === selectedOrderId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOrderId) return;

    // Update in shared history state & localStorage
    onUpdateOrderOutcome(selectedOrderId, outcome, {
      userNotes,
      perceivedConfidence,
    });

    setIsSubmitted(true);

    if (onShowToast) {
      onShowToast({
        title: 'Nightcap received.',
        message: 'The ledger has been updated with your verified outcome.',
      });
    }

    // Reset notes and confidence after brief delay
    setTimeout(() => {
      setUserNotes('');
      setIsSubmitted(false);
    }, 2500);
  };

  if (!history || history.length === 0) {
    return (
      <div className="rounded-2xl border border-gold/15 bg-[#0a0a14]/60 p-12 text-center space-y-3">
        <Wine size={32} className="mx-auto text-gold/50" />
        <h3 className="font-playfair text-xl font-bold text-light">
          You'll need a pour before you can leave a nightcap.
        </h3>
        <p className="font-inter text-xs text-smoke max-w-sm mx-auto">
          Place your first order at the counter to begin logging outcomes into the House ledger.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
            THE NIGHTCAP
          </span>
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-black text-light tracking-tight">
          Tell us how your pour turned out.
        </h1>
        <p className="font-inter text-sm sm:text-base text-smoke/80 mt-1.5 max-w-2xl leading-relaxed">
          Every outcome teaches the House something. Log whether your market prediction hit or missed to recalibrate our predictive blend.
        </p>
      </div>

      {/* ── CENTERED FEEDBACK FORM ── */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gold/[0.15] bg-[#0a0a14]/85 backdrop-blur-xl p-6 sm:p-9 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(201,162,39,0.08)]"
        >
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* 01: SELECT PAST ORDER */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-smoke/80 flex items-center gap-2">
                  <span>01</span>
                  <span className="text-gold">WHICH POUR?</span>
                </label>
                {selectedOrder && (
                  <span className="font-mono text-[10px] text-smoke/60">
                    Current Status: <strong className="text-light">{selectedOrder.outcome}</strong>
                  </span>
                )}
              </div>

              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="w-full rounded-xl border border-gold/25 bg-[#06060a] px-4 py-3 font-inter text-xs sm:text-sm text-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 cursor-pointer"
                required
              >
                {history.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.dateTime.split(' • ')[0]} • {order.cocktailName} • {order.proof} Proof [{order.outcome}]
                  </option>
                ))}
              </select>

              {selectedOrder && (
                <div className="mt-2.5 rounded-lg border border-gold/10 bg-black/40 p-3 text-xs text-smoke/80 font-inter flex items-start gap-2">
                  <Wine size={14} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-light font-medium">{selectedOrder.cocktailName}:</span>{' '}
                    <span>{selectedOrder.inputSummary}</span>
                    <div className="text-[11px] text-smoke/60 italic mt-0.5">
                      "{selectedOrder.thesis}"
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 02: OUTCOME CARDS (HIT / MISS) */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-smoke/80 mb-2.5 flex items-center gap-2">
                <span>02</span>
                <span className="text-gold">HOW DID IT TURN OUT?</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                {/* HIT CARD */}
                <button
                  type="button"
                  onClick={() => setOutcome('HIT')}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    outcome === 'HIT'
                      ? 'border-gold bg-gold/15 shadow-[0_0_25px_rgba(201,162,39,0.25)]'
                      : 'border-gold/15 bg-black/40 hover:border-gold/35 text-smoke'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        outcome === 'HIT'
                          ? 'bg-gold text-[#06060a]'
                          : 'bg-gold/10 text-gold border border-gold/20'
                      }`}
                    >
                      <Check size={18} strokeWidth={2.5} />
                    </div>
                    {outcome === 'HIT' && (
                      <span className="font-mono text-[10px] text-gold uppercase tracking-widest">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <div className="font-playfair text-xl font-bold text-light">
                    HIT
                  </div>
                  <div className="font-inter text-xs text-smoke/80 mt-1 leading-tight">
                    Prediction was verified by the market.
                  </div>
                </button>

                {/* MISS CARD */}
                <button
                  type="button"
                  onClick={() => setOutcome('MISS')}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    outcome === 'MISS'
                      ? 'border-tarnished-gold bg-[#302010]/50 shadow-[0_0_25px_rgba(184,164,78,0.2)]'
                      : 'border-gold/15 bg-black/40 hover:border-gold/35 text-smoke'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        outcome === 'MISS'
                          ? 'bg-tarnished-gold text-[#06060a]'
                          : 'bg-tarnished-gold/10 text-tarnished-gold border border-tarnished-gold/20'
                      }`}
                    >
                      <X size={18} strokeWidth={2.5} />
                    </div>
                    {outcome === 'MISS' && (
                      <span className="font-mono text-[10px] text-tarnished-gold uppercase tracking-widest">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <div className="font-playfair text-xl font-bold text-light">
                    MISS
                  </div>
                  <div className="font-inter text-xs text-smoke/80 mt-1 leading-tight">
                    Market deviated from predictive thesis.
                  </div>
                </button>
              </div>
            </div>

            {/* 03: ACTUAL RESULT (TEXTAREA) */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-smoke/80 mb-2 flex items-center gap-2">
                <span>03</span>
                <span className="text-gold">WHAT ACTUALLY HAPPENED?</span>
                <span className="font-mono text-[10px] text-smoke/50">(Optional)</span>
              </label>

              <textarea
                rows={3}
                placeholder="Tell the bartender what happened… (e.g. Fed commentary spiked volatility, basis spread closed within 3 minutes, slippage occurred at secondary gateway)"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-4 py-3 font-inter text-xs sm:text-sm text-light placeholder:text-smoke/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 resize-none leading-relaxed"
              />
            </div>

            {/* 04: CONFIDENCE ADJUSTMENT (SLIDER) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-smoke/80 flex items-center gap-2">
                  <span>04</span>
                  <span className="text-gold">HOW CONFIDENT DID IT FEEL?</span>
                  <span className="font-mono text-[10px] text-smoke/50">(Optional)</span>
                </label>
                <span className="font-mono text-xs font-bold text-gold">
                  {perceivedConfidence}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={perceivedConfidence}
                onChange={(e) => setPerceivedConfidence(Number(e.target.value))}
                className="w-full accent-[#C9A227] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-smoke/50 mt-1">
                <span>0% (Flimsy)</span>
                <span>50% (Even)</span>
                <span>100% (Ironclad)</span>
              </div>
            </div>

            {/* 05: SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs sm:text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2.5 hover:shadow-[0_0_25px_rgba(201,162,39,0.35)] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Sparkles size={16} />
                <span>POUR BACK THE NIGHTCAP</span>
              </button>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-center font-inter text-xs text-emerald-300 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={15} />
                  <span>Nightcap recorded. Check the Ledger tab to view updated proof.</span>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
