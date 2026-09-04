import React from 'react';
import { motion } from 'framer-motion';
import { COCKTAILS } from '../../data/cocktails';
import { Check } from 'lucide-react';

export default function CocktailSelector({ selectedCocktail, onSelectCocktail }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] font-semibold text-tarnished-gold uppercase tracking-wider">
          Select Your Intelligence Cocktail
        </span>
        <span className="font-mono text-[9px] text-smoke">6 High-Proof Engines</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {COCKTAILS.map((cocktail) => {
          const isSelected = selectedCocktail.id === cocktail.id;
          const IconComponent = cocktail.icon;

          return (
            <motion.button
              type="button"
              key={cocktail.id}
              onClick={() => onSelectCocktail(cocktail)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col justify-between text-left rounded-xl p-3.5 sm:p-4 transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-2 border-gold bg-[#161022] shadow-[0_0_25px_rgba(201,162,39,0.3)]'
                  : 'border border-gold/15 bg-black/60 hover:border-gold/40 hover:bg-[#0d0914]'
              }`}
              style={{
                boxShadow: isSelected
                  ? `0 0 24px ${cocktail.glowColor}, inset 0 0 16px ${cocktail.glowColor}`
                  : undefined,
              }}
            >
              {/* Corner Ambient Liquid Glow */}
              <div
                className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-30 filter blur-xl transition-opacity duration-300 group-hover:opacity-60"
                style={{ background: cocktail.glowColor }}
              />

              {/* Card Header: Icon & Category */}
              <div>
                <div className="flex items-center justify-between mb-2 gap-1.5">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg border bg-black/70 shadow-sm shrink-0"
                    style={{
                      borderColor: isSelected ? cocktail.accentColor : 'rgba(201,162,39,0.3)',
                    }}
                  >
                    <IconComponent
                      size={14}
                      style={{ color: isSelected ? cocktail.accentColor : '#ede8dc' }}
                    />
                  </div>

                  {isSelected ? (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-black shrink-0 shadow-sm">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="font-mono text-[8px] sm:text-[9px] text-smoke/70 uppercase whitespace-nowrap shrink-0">
                      {cocktail.proof}
                    </span>
                  )}
                </div>

                {/* Cocktail Name */}
                <h4
                  className={`font-playfair text-sm sm:text-base font-bold transition-colors truncate ${
                    isSelected ? 'text-gold' : 'text-[#ede8dc] group-hover:text-gold'
                  }`}
                >
                  {cocktail.name}
                </h4>

                <p className="mt-1 font-inter text-[10px] text-smoke/80 line-clamp-2 leading-tight">
                  {cocktail.tagline}
                </p>
              </div>

              {/* Card Footer: Top Modules Pills */}
              <div className="mt-3 pt-2 border-t border-gold/10">
                <div className="flex flex-wrap gap-1 items-center">
                  {cocktail.modules.slice(0, 3).map((mod, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-black/70 border border-gold/10 px-1.5 py-0.2 font-mono text-[8px] text-light/70 whitespace-nowrap shrink-0"
                    >
                      {mod}
                    </span>
                  ))}
                  {cocktail.modules.length > 3 && (
                    <span className="font-mono text-[8px] text-tarnished-gold whitespace-nowrap shrink-0">
                      +{cocktail.modules.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
