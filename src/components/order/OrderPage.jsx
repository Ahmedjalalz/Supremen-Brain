import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COCKTAILS, getCocktailById } from '../../data/cocktails';
import { getDemoPrediction } from '../../data/demoResults';
import CocktailSelector from './CocktailSelector';
import MakingAnimation from './MakingAnimation';
import IngredientsForm from './IngredientsForm';
import ApiRecipePreview from './ApiRecipePreview';
import Navbar from '../Navbar';
import { Sparkles, ArrowRight, Wine } from 'lucide-react';

export default function OrderPage({ onNavigate, onOpenAuth }) {
  const [selectedCocktail, setSelectedCocktail] = useState(() => {
    const saved = localStorage.getItem('supreme_selected_cocktail');
    return saved ? getCocktailById(saved) : COCKTAILS[0];
  });

  const [outputFormat, setOutputFormat] = useState('JSON');
  const [dataInput, setDataInput] = useState(() => {
    const saved = localStorage.getItem('supreme_selected_cocktail');
    const c = saved ? getCocktailById(saved) : COCKTAILS[0];
    return JSON.stringify(c.defaultPayload, null, 2);
  });
  const [parameters, setParameters] = useState(() => {
    const savedParams = localStorage.getItem('supreme_prefilled_params');
    if (savedParams) {
      try {
        const parsed = JSON.parse(savedParams);
        localStorage.removeItem('supreme_prefilled_params');
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    const saved = localStorage.getItem('supreme_selected_cocktail');
    const c = saved ? getCocktailById(saved) : COCKTAILS[0];
    return c.defaultParameters;
  });
  const [secretIngredient, setSecretIngredient] = useState(false);
  const [isPouring, setIsPouring] = useState(false);
  const [formError, setFormError] = useState('');

  // Save selected cocktail preference
  useEffect(() => {
    localStorage.setItem('supreme_selected_cocktail', selectedCocktail.id);
    document.title = `Supreme Brain · The Making · ${selectedCocktail.name}`;
  }, [selectedCocktail]);

  const handleSelectCocktail = (cocktail) => {
    if (isPouring) return;
    setSelectedCocktail(cocktail);
  };

  const handlePourClick = (e) => {
    e.preventDefault();
    if (isPouring) return;

    // Validate data input
    if (!dataInput || !dataInput.trim()) {
      setFormError('Please pour your data before ordering.');
      return;
    }
    setFormError('');

    // Generate dummy prediction result and persist in localStorage & state
    const demoResult = getDemoPrediction(
      selectedCocktail.id,
      dataInput,
      parameters,
      outputFormat
    );

    localStorage.setItem(
      'supreme_last_order',
      JSON.stringify({
        cocktailId: selectedCocktail.id,
        cocktailName: selectedCocktail.name,
        outputFormat,
        dataInput,
        parameters,
        secretIngredient,
        orderedAt: new Date().toISOString(),
      })
    );

    localStorage.setItem('supreme_latest_prediction', JSON.stringify(demoResult));

    // Trigger complete making animation
    setIsPouring(true);
  };

  const handleSequenceComplete = () => {
    if (isPouring) {
      setTimeout(() => {
        onNavigate('/results');
      }, 400);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06060a] text-light selection:bg-gold/30 selection:text-gold overflow-x-hidden pt-20 pb-24">
      {/* Background Ambience: Speakeasy Warm Hearth Pools */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20 z-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 20%, rgba(201, 162, 39, 0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(201, 162, 39, 0.1) 0%, transparent 65%)',
        }}
      />

      {/* ── TOP SPEAKEASY NAVBAR ── */}
      <Navbar
        currentRoute="/order"
        onNavigate={onNavigate}
        onOpenAuth={onOpenAuth}
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 md:mt-8">
        {/* ── DESKTOP: 60% LEFT / 40% RIGHT SPLIT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ════════════════════════════════════════════════════════
              LEFT SIDE (60% Desktop — Columns 1..7):
              THE MAKING + COCKTAIL SELECTOR + ANIMATION
          ════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header / Eyebrow */}
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/60 px-4 py-1 backdrop-blur-md">
                <Sparkles size={13} className="text-gold animate-pulse" />
                <span className="font-inter text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                  The Making
                </span>
              </div>

              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#ede8dc] leading-tight">
                What are you craving?
              </h1>

              <p className="mt-3 font-inter text-sm sm:text-base text-smoke/90 leading-relaxed max-w-xl">
                Choose your cocktail. Then give the bartender your ingredients.
              </p>
            </div>

            {/* Cocktail Selection Grid */}
            <CocktailSelector
              selectedCocktail={selectedCocktail}
              onSelectCocktail={handleSelectCocktail}
            />

            {/* Making Animation Centerpiece */}
            <div className="mt-6 pt-4 border-t border-gold/15">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-semibold text-tarnished-gold uppercase tracking-wider">
                  The Bartender at Work
                </span>
                <span className="font-mono text-[9px] text-smoke">
                  Active: <strong className="text-gold">{selectedCocktail.name}</strong> ({selectedCocktail.proof})
                </span>
              </div>

              <MakingAnimation
                cocktail={selectedCocktail}
                isPouring={isPouring}
                onSequenceComplete={handleSequenceComplete}
              />
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              RIGHT SIDE (40% Desktop — Columns 8..12):
              INGREDIENTS FORM + API PREVIEW + POUR CTA
          ════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Your Ingredients Form Component */}
            <IngredientsForm
              cocktail={selectedCocktail}
              outputFormat={outputFormat}
              onChangeOutputFormat={setOutputFormat}
              dataInput={dataInput}
              onChangeDataInput={setDataInput}
              parameters={parameters}
              onChangeParameters={setParameters}
              secretIngredient={secretIngredient}
              onToggleSecretIngredient={() => setSecretIngredient(!secretIngredient)}
            />

            {/* API Preview / Recipe Component */}
            <ApiRecipePreview
              cocktail={selectedCocktail}
              outputFormat={outputFormat}
              dataInput={dataInput}
              parameters={parameters}
              secretIngredient={secretIngredient}
            />

            {/* Form Error Banner (if any) */}
            {formError && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-center font-mono text-xs text-red-300">
                {formError}
              </div>
            )}

            {/* ── LARGE PRIMARY POUR BUTTON ── */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePourClick}
                disabled={isPouring}
                className="group relative flex w-full items-center justify-center gap-2.5 sm:gap-3 rounded-2xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] py-4 sm:py-5 font-inter text-sm sm:text-base md:text-lg font-black tracking-wider sm:tracking-widest text-[#0a0804] uppercase shadow-[0_0_35px_rgba(201,162,39,0.35)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(201,162,39,0.55)] active:scale-[0.99] disabled:opacity-85 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap shrink-0"
              >
                {isPouring ? (
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin shrink-0" />
                    <span>SHAKING…</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    <Wine size={19} className="text-[#0a0804] shrink-0" />
                    <span>POUR {selectedCocktail.name.toUpperCase()}</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1.5 shrink-0"
                    />
                  </div>
                )}
              </button>

              <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-smoke/70 px-2 whitespace-nowrap">
                <span>Latency: {selectedCocktail.latency}</span>
                <span>Purity: {selectedCocktail.proof}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
