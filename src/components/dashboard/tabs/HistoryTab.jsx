import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Check,
  X,
  Clock,
  ArrowRight,
  ExternalLink,
  Copy,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Wine,
  Sparkles,
  AlertTriangle,
  Code2,
} from 'lucide-react';
import { COCKTAILS } from '../../../data/cocktails';

export default function HistoryTab({ history, onNavigate, onShowToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCocktailFilter, setSelectedCocktailFilter] = useState('ALL');
  const [selectedOutcomeFilter, setSelectedOutcomeFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPour, setSelectedPour] = useState(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const PAGE_SIZE = 5;

  // Filter history client-side
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.cocktailName.toLowerCase().includes(query) ||
        item.inputSummary.toLowerCase().includes(query) ||
        item.thesis.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      // Cocktail filter match
      const matchesCocktail =
        selectedCocktailFilter === 'ALL' || item.cocktailId === selectedCocktailFilter;

      // Outcome filter match
      const matchesOutcome =
        selectedOutcomeFilter === 'ALL' || item.outcome === selectedOutcomeFilter;

      return matchesSearch && matchesCocktail && matchesOutcome;
    });
  }, [history, searchQuery, selectedCocktailFilter, selectedOutcomeFilter]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredHistory.length / PAGE_SIZE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredHistory.slice(start, start + PAGE_SIZE);
  }, [filteredHistory, currentPage]);

  const handleCopyJson = (payload) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleOrderAgain = (cocktailId) => {
    localStorage.setItem('supreme_selected_cocktail', cocktailId);
    if (onNavigate) {
      onNavigate('/order');
    }
  };

  const renderOutcomeBadge = (outcome) => {
    if (outcome === 'HIT') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/40 font-mono text-[11px] text-gold font-medium">
          <Check size={12} className="text-gold" />
          <span>HIT</span>
        </span>
      );
    }
    if (outcome === 'MISS') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3a2818]/60 border border-tarnished-gold/40 font-mono text-[11px] text-tarnished-gold font-medium">
          <X size={12} className="text-tarnished-gold" />
          <span>MISS</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-smoke/30 font-mono text-[11px] text-smoke/90 font-medium">
        <Clock size={12} className="text-smoke/70" />
        <span>PENDING</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
            THE LEDGER
          </span>
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-black text-light tracking-tight">
          Past Pours
        </h1>
        <p className="font-inter text-sm sm:text-base text-smoke/80 mt-1.5 max-w-2xl leading-relaxed">
          Every prediction leaves a mark. Click any pour to inspect full telemetry and weights.
        </p>
      </div>

      {/* ── FILTER & SEARCH BAR ── */}
      <div className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-smoke/70" />
            <input
              type="text"
              placeholder="Search pours, inputs, thesis..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gold/20 bg-[#06060a]/90 pl-10 pr-4 py-2 font-inter text-xs text-light placeholder:text-smoke/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke/60 hover:text-light"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
            {/* Cocktail Dropdown */}
            <select
              value={selectedCocktailFilter}
              onChange={(e) => {
                setSelectedCocktailFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto rounded-xl border border-gold/20 bg-[#06060a]/90 px-3 py-2 font-inter text-xs text-smoke hover:text-gold focus:border-gold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Cocktails</option>
              {COCKTAILS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Outcome Dropdown */}
            <select
              value={selectedOutcomeFilter}
              onChange={(e) => {
                setSelectedOutcomeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto rounded-xl border border-gold/20 bg-[#06060a]/90 px-3 py-2 font-inter text-xs text-smoke hover:text-gold focus:border-gold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Outcomes</option>
              <option value="HIT">HIT (Verified)</option>
              <option value="MISS">MISS (Falsified)</option>
              <option value="PENDING">PENDING (Unsettled)</option>
            </select>

            {(searchQuery || selectedCocktailFilter !== 'ALL' || selectedOutcomeFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCocktailFilter('ALL');
                  setSelectedOutcomeFilter('ALL');
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-gold/15 text-smoke/70 hover:text-gold text-xs font-inter transition-colors whitespace-nowrap cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="hidden lg:block rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gold/[0.08] bg-[#06060a]/60">
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-smoke/70">
                  DATE & TIME
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-smoke/70">
                  COCKTAIL
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-smoke/70">
                  INPUT
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-smoke/70">
                  PROOF
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-smoke/70">
                  OUTCOME
                </th>
                <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-smoke/70 text-right">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/[0.06]">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-smoke/70 font-inter text-sm">
                    No pours in the ledger match your criteria.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedPour(item)}
                    className="group hover:bg-gold/[0.04] transition-all duration-200 cursor-pointer"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-smoke/90 whitespace-nowrap">
                      {item.dateTime}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Wine size={14} className="text-gold" />
                        <span className="font-playfair text-sm font-bold text-light group-hover:text-gold transition-colors">
                          {item.cocktailName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-inter text-xs text-smoke max-w-xs truncate">
                      {item.inputSummary}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gold font-medium whitespace-nowrap">
                      {item.proof} Proof
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {renderOutcomeBadge(item.outcome)}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <span className="font-inter text-xs text-gold group-hover:underline inline-flex items-center gap-1">
                        View details <ArrowRight size={12} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE CARDS (Avoid cramped table) ── */}
      <div className="lg:hidden space-y-3">
        {paginatedItems.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-gold/10 bg-[#0a0a14]/60 text-smoke text-sm">
            No pours found in the ledger.
          </div>
        ) : (
          paginatedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPour(item)}
              className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/90 p-5 space-y-3 hover:border-gold/30 active:scale-[0.99] transition-all cursor-pointer shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[10px] text-smoke/70 mb-0.5">
                    {item.dateTime}
                  </div>
                  <h4 className="font-playfair text-base font-bold text-light flex items-center gap-2">
                    <Wine size={14} className="text-gold" />
                    {item.cocktailName}
                  </h4>
                </div>
                {renderOutcomeBadge(item.outcome)}
              </div>

              <div className="text-xs font-inter text-smoke/80 line-clamp-2">
                {item.inputSummary}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gold/[0.08] text-xs">
                <span className="font-mono text-gold font-medium">
                  {item.proof} Proof
                </span>
                <span className="text-gold flex items-center gap-1">
                  View details <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── PAGINATION CONTROLS ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <div className="font-mono text-xs text-smoke/70">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredHistory.length)} of {filteredHistory.length} pours
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-gold/20 text-smoke hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-xs text-light px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-gold/20 text-smoke hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── DETAIL DRAWER (SLIDES FROM RIGHT) ── */}
      <AnimatePresence>
        {selectedPour && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Smoked Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPour(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-xl h-full bg-[#080810] border-l border-gold/25 p-6 sm:p-8 overflow-y-auto custom-scrollbar z-10 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-gold/15">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-smoke/80 uppercase tracking-widest">
                        {selectedPour.id} · {selectedPour.dateTime}
                      </span>
                    </div>
                    <h2 className="font-playfair text-2xl font-bold text-light">
                      {selectedPour.cocktailName}
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedPour(null)}
                    className="p-1.5 rounded-lg border border-gold/20 text-smoke hover:text-gold transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Proof & Outcome Banner */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gold/15 bg-black/40 p-4">
                    <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider mb-1">
                      Confidence Proof
                    </span>
                    <span className="font-playfair text-xl font-bold text-gold">
                      {selectedPour.proof} Proof
                    </span>
                  </div>

                  <div className="rounded-xl border border-gold/15 bg-black/40 p-4">
                    <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider mb-1">
                      Ledger Outcome
                    </span>
                    <div className="mt-1">{renderOutcomeBadge(selectedPour.outcome)}</div>
                  </div>
                </div>

                {/* Input Summary & Thesis */}
                <div className="rounded-xl border border-gold/15 bg-black/40 p-4 space-y-3">
                  <div>
                    <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider mb-1">
                      Input Summary
                    </span>
                    <p className="font-inter text-xs text-light">
                      {selectedPour.inputSummary}
                    </p>
                  </div>

                  <div>
                    <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider mb-1">
                      Market Thesis
                    </span>
                    <p className="font-inter text-xs text-smoke/90 italic leading-relaxed">
                      "{selectedPour.thesis}"
                    </p>
                  </div>
                </div>

                {/* Modules, Edge, and Position Size */}
                <div className="space-y-3">
                  <div>
                    <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider mb-2">
                      Active Modules
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPour.modules.map((mod) => (
                        <span
                          key={mod}
                          className="rounded-md border border-gold/20 bg-gold/5 px-2.5 py-1 font-mono text-[10px] text-light"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-xl border border-gold/10 bg-black/30 p-3">
                      <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider">
                        Extracted Edge
                      </span>
                      <span className="font-inter text-xs font-semibold text-gold mt-0.5 block">
                        {selectedPour.edge || 'N/A'}
                      </span>
                    </div>

                    <div className="rounded-xl border border-gold/10 bg-black/30 p-3">
                      <span className="block font-mono text-[10px] text-smoke uppercase tracking-wider">
                        Kelly Allocation
                      </span>
                      <span className="font-inter text-xs font-semibold text-light mt-0.5 block">
                        {selectedPour.positionSize || 'Discretionary'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warnings (if any) */}
                {selectedPour.warnings && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-2.5">
                    <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="font-inter text-xs text-amber-200/90 leading-relaxed">
                      {selectedPour.warnings}
                    </p>
                  </div>
                )}

                {/* Raw JSON viewer */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-smoke uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 size={13} className="text-gold" /> Raw Telemetry Payload
                    </span>
                    <button
                      onClick={() => handleCopyJson(selectedPour.payload)}
                      className="text-xs text-smoke/70 hover:text-gold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedJson ? (
                        <>
                          <CheckCheck size={13} className="text-emerald-400" />
                          <span className="text-emerald-400 text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span className="text-[11px]">Copy JSON</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="rounded-xl border border-gold/15 bg-[#040407] p-3.5 max-h-48 overflow-y-auto custom-scrollbar font-mono text-[11px] text-light/80 leading-relaxed">
                    <pre>{JSON.stringify(selectedPour.payload, null, 2)}</pre>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Action: Order Again */}
              <div className="pt-6 border-t border-gold/15 mt-6">
                <button
                  onClick={() => handleOrderAgain(selectedPour.cocktailId)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs tracking-wider font-semibold uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all cursor-pointer"
                >
                  <Wine size={14} />
                  <span>ORDER AGAIN</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
