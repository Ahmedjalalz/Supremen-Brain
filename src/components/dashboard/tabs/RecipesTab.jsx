import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Wine,
  Edit2,
  Trash2,
  Calendar,
  Sparkles,
  Sliders,
  X,
  Check,
  AlertCircle,
  BookMarked,
  ArrowRight,
} from 'lucide-react';
import { COCKTAILS } from '../../../data/cocktails';

const AVAILABLE_MODULES = [
  'LSTM',
  'Monte Carlo',
  'XGBoost',
  'Bayesian',
  'Kelly',
  'Calibration',
];

export default function RecipesTab({ recipes, onSaveRecipes, onNavigate, onShowToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [deleteTargetRecipe, setDeleteTargetRecipe] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    cocktailId: 'the-oracle',
    confidenceThreshold: 85,
    modules: ['LSTM', 'Monte Carlo', 'Bayesian'],
    notes: '',
  });

  const openCreateModal = () => {
    setEditingRecipe(null);
    setFormData({
      name: '',
      cocktailId: 'the-oracle',
      confidenceThreshold: 85,
      modules: ['LSTM', 'Monte Carlo', 'Bayesian'],
      notes: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (recipe, e) => {
    if (e) e.stopPropagation();
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      cocktailId: recipe.cocktailId,
      confidenceThreshold: recipe.confidenceThreshold || 85,
      modules: recipe.modules || ['LSTM', 'Monte Carlo'],
      notes: recipe.notes || '',
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (recipe, e) => {
    if (e) e.stopPropagation();
    setDeleteTargetRecipe(recipe);
  };

  const confirmDelete = () => {
    if (!deleteTargetRecipe) return;
    const updated = recipes.filter((r) => r.id !== deleteTargetRecipe.id);
    onSaveRecipes(updated);
    setDeleteTargetRecipe(null);
    if (detailRecipe?.id === deleteTargetRecipe.id) {
      setDetailRecipe(null);
    }
    if (onShowToast) {
      onShowToast({
        title: 'Recipe Removed',
        message: `"${deleteTargetRecipe.name}" was removed from your shelf.`,
      });
    }
  };

  const handlePourRecipe = (recipe, e) => {
    if (e) e.stopPropagation();
    localStorage.setItem('supreme_selected_cocktail', recipe.cocktailId);
    if (recipe.parameters) {
      localStorage.setItem('supreme_prefilled_params', JSON.stringify(recipe.parameters));
    }
    if (onNavigate) {
      onNavigate('/order');
    }
  };

  const toggleModule = (moduleName) => {
    setFormData((prev) => {
      const exists = prev.modules.includes(moduleName);
      if (exists) {
        if (prev.modules.length <= 1) return prev; // Keep at least one
        return { ...prev, modules: prev.modules.filter((m) => m !== moduleName) };
      }
      return { ...prev, modules: [...prev.modules, moduleName] };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const baseCocktail = COCKTAILS.find((c) => c.id === formData.cocktailId) || COCKTAILS[0];

    if (editingRecipe) {
      // Edit existing
      const updated = recipes.map((r) =>
        r.id === editingRecipe.id
          ? {
              ...r,
              name: formData.name.trim(),
              cocktailId: formData.cocktailId,
              cocktailName: baseCocktail.name,
              confidenceThreshold: formData.confidenceThreshold,
              modules: formData.modules,
              notes: formData.notes,
              parameters: [
                { key: 'confidence_threshold', value: (formData.confidenceThreshold / 100).toFixed(2) },
                { key: 'modules_active', value: formData.modules.join(',') },
              ],
            }
          : r
      );
      onSaveRecipes(updated);
      if (onShowToast) {
        onShowToast({
          title: 'Recipe Updated',
          message: `Saved changes to "${formData.name}".`,
        });
      }
    } else {
      // Create new
      const newRecipe = {
        id: `recipe-${Date.now()}`,
        name: formData.name.trim(),
        cocktailId: formData.cocktailId,
        cocktailName: baseCocktail.name,
        confidenceThreshold: formData.confidenceThreshold,
        modules: formData.modules,
        savedDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        parameters: [
          { key: 'confidence_threshold', value: (formData.confidenceThreshold / 100).toFixed(2) },
          { key: 'modules_active', value: formData.modules.join(',') },
        ],
        notes: formData.notes,
      };
      const updated = [newRecipe, ...recipes];
      onSaveRecipes(updated);
      if (onShowToast) {
        onShowToast({
          title: 'Recipe added to the shelf.',
          message: `"${newRecipe.name}" is now stored in your bar records.`,
        });
      }
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER & WRITE RECIPE ACTION ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
              MY RECIPES
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-black text-light tracking-tight">
            Recipes Worth Keeping
          </h1>
          <p className="font-inter text-sm sm:text-base text-smoke/80 mt-1.5 max-w-2xl leading-relaxed">
            Your favorite pours, saved for another night. Tune your ensemble blends and confidence thresholds.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gold/40 bg-black/40 text-gold hover:text-white hover:border-gold hover:bg-gold/15 font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(201,162,39,0.1)] active:scale-[0.98] shrink-0"
        >
          <Plus size={16} />
          <span>WRITE A NEW RECIPE</span>
        </button>
      </div>

      {/* ── RECIPE SHELF GRID ── */}
      {recipes.length === 0 ? (
        <div className="rounded-2xl border border-gold/15 bg-[#0a0a14]/60 p-12 text-center space-y-3">
          <BookMarked size={36} className="mx-auto text-gold/40" />
          <h3 className="font-playfair text-xl font-bold text-light">
            Nothing on the shelf yet.
          </h3>
          <p className="font-inter text-xs text-smoke max-w-md mx-auto">
            Write your first recipe to preserve your favored ensemble weights and parameter tunings.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold hover:bg-gold/30 text-xs font-inter font-semibold transition-colors cursor-pointer"
          >
            <Plus size={14} /> Write Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              onClick={() => setDetailRecipe(recipe)}
              className="group relative rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/85 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(201,162,39,0.15)] transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-light group-hover:text-gold transition-colors">
                      {recipe.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-smoke/80 font-inter mt-0.5">
                      <Wine size={13} className="text-gold" />
                      <span>{recipe.cocktailName}</span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold shrink-0">
                    {recipe.confidenceThreshold}% Proof Target
                  </span>
                </div>

                {/* Modules Pills */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {recipe.modules.map((mod) => (
                    <span
                      key={mod}
                      className="rounded-md border border-gold/15 bg-black/50 px-2 py-0.5 font-mono text-[10px] text-smoke/90"
                    >
                      {mod}
                    </span>
                  ))}
                </div>

                {/* Notes or Parameters */}
                {recipe.notes && (
                  <p className="font-inter text-xs text-smoke/70 italic line-clamp-2 mt-2">
                    "{recipe.notes}"
                  </p>
                )}
              </div>

              {/* Bottom Card Area */}
              <div className="pt-4 mt-4 border-t border-gold/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-smoke/60">
                  <Calendar size={11} />
                  <span>Saved: {recipe.savedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => openEditModal(recipe, e)}
                    title="Edit Recipe"
                    className="p-1.5 rounded-lg border border-gold/15 text-smoke/70 hover:text-gold hover:border-gold/30 transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(recipe, e)}
                    title="Delete Recipe"
                    className="p-1.5 rounded-lg border border-gold/15 text-smoke/70 hover:text-red-400 hover:border-red-400/30 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <button
                    onClick={(e) => handlePourRecipe(recipe, e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 font-inter text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>POUR</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── CREATE / EDIT RECIPE MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl border border-gold/30 bg-[#0a0a14] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-gold/10">
                <div>
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-light">
                    {editingRecipe ? 'Edit Recipe' : 'Write a New Recipe'}
                  </h3>
                  <p className="font-inter text-xs text-smoke mt-0.5">
                    Tell the House how you'd like this pour prepared.
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg border border-gold/20 text-smoke/70 hover:text-gold transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                {/* Recipe Name */}
                <div>
                  <label className="block font-mono text-[11px] text-smoke uppercase tracking-wider mb-1">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. My Oracle, Midnight Spread..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-4 py-2.5 font-inter text-sm text-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                    required
                  />
                </div>

                {/* Base Cocktail */}
                <div>
                  <label className="block font-mono text-[11px] text-smoke uppercase tracking-wider mb-1">
                    Base Cocktail
                  </label>
                  <select
                    value={formData.cocktailId}
                    onChange={(e) => setFormData({ ...formData, cocktailId: e.target.value })}
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-4 py-2.5 font-inter text-sm text-light focus:border-gold focus:outline-none cursor-pointer"
                  >
                    {COCKTAILS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.tagline}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Confidence Threshold Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-[11px] text-smoke uppercase tracking-wider">
                      Confidence Threshold
                    </label>
                    <span className="font-mono text-xs text-gold font-bold">
                      {formData.confidenceThreshold}% Proof
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={formData.confidenceThreshold}
                    onChange={(e) =>
                      setFormData({ ...formData, confidenceThreshold: Number(e.target.value) })
                    }
                    className="w-full accent-[#C9A227] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-smoke/50 mt-1">
                    <span>50% (Loose)</span>
                    <span>85% (Balanced)</span>
                    <span>99% (Surgical)</span>
                  </div>
                </div>

                {/* Modules Toggles */}
                <div>
                  <label className="block font-mono text-[11px] text-smoke uppercase tracking-wider mb-2">
                    Distillation Modules (Toggles)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVAILABLE_MODULES.map((mod) => {
                      const isActive = formData.modules.includes(mod);
                      return (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => toggleModule(mod)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-inter transition-all cursor-pointer ${
                            isActive
                              ? 'border-gold/50 bg-gold/15 text-gold font-medium shadow-[0_0_10px_rgba(201,162,39,0.15)]'
                              : 'border-gold/10 bg-[#06060a]/50 text-smoke hover:border-gold/25'
                          }`}
                        >
                          <span>{mod}</span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                              isActive ? 'bg-gold text-[#06060a]' : 'border border-smoke/30'
                            }`}
                          >
                            {isActive ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-mono text-[11px] text-smoke uppercase tracking-wider mb-1">
                    House Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Rationale, hedge parameters, or risk constraints..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-4 py-2 font-inter text-xs text-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 resize-none"
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold/10">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gold/20 text-smoke hover:text-light text-xs font-inter transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs font-semibold tracking-wide uppercase hover:shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all cursor-pointer"
                  >
                    SAVE RECIPE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {deleteTargetRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTargetRecipe(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-2xl border border-red-500/30 bg-[#0c0c14] p-6 shadow-2xl z-10 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                <Trash2 size={20} />
              </div>

              <div>
                <h4 className="font-playfair text-lg font-bold text-light">
                  Remove this recipe from the shelf?
                </h4>
                <p className="font-inter text-xs text-smoke mt-1">
                  "{deleteTargetRecipe.name}" will be deleted from your private ledger.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteTargetRecipe(null)}
                  className="px-4 py-2 rounded-xl border border-gold/20 text-smoke hover:text-light text-xs font-inter"
                >
                  KEEP IT
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 text-xs font-inter font-semibold"
                >
                  DELETE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── RECIPE DETAIL MODAL (WHEN CARD CLICKED) ── */}
      <AnimatePresence>
        {detailRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailRecipe(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl border border-gold/30 bg-[#0a0a14] p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-gold/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Wine size={14} className="text-gold" />
                    <span className="font-mono text-[10px] text-gold uppercase tracking-wider">
                      {detailRecipe.cocktailName}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-light">
                    {detailRecipe.name}
                  </h3>
                </div>
                <button
                  onClick={() => setDetailRecipe(null)}
                  className="p-1.5 rounded-lg border border-gold/20 text-smoke hover:text-gold transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gold/10 bg-black/40 p-3.5">
                    <span className="font-mono text-[10px] text-smoke uppercase block mb-0.5">
                      Confidence Target
                    </span>
                    <span className="font-playfair text-lg font-bold text-gold">
                      {detailRecipe.confidenceThreshold}% Proof
                    </span>
                  </div>

                  <div className="rounded-xl border border-gold/10 bg-black/40 p-3.5">
                    <span className="font-mono text-[10px] text-smoke uppercase block mb-0.5">
                      Shelf Date
                    </span>
                    <span className="font-mono text-sm text-light">
                      {detailRecipe.savedDate}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-smoke uppercase block mb-1.5">
                    Active Blending Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {detailRecipe.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-gold/25 bg-gold/10 px-2.5 py-1 font-mono text-[11px] text-light"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {detailRecipe.notes && (
                  <div className="rounded-xl border border-gold/10 bg-black/40 p-3.5">
                    <span className="font-mono text-[10px] text-smoke uppercase block mb-1">
                      House Tasting Notes
                    </span>
                    <p className="font-inter text-xs text-smoke/90 italic">
                      "{detailRecipe.notes}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gold/10 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => openEditModal(detailRecipe, e)}
                  className="px-4 py-2.5 rounded-xl border border-gold/20 text-smoke hover:text-gold text-xs font-inter transition-colors"
                >
                  Edit Configuration
                </button>

                <button
                  onClick={() => handlePourRecipe(detailRecipe)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all cursor-pointer"
                >
                  <Wine size={14} />
                  <span>POUR THIS</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
