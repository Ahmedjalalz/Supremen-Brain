import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Check, Terminal } from 'lucide-react';

export default function ApiRecipePreview({
  cocktail,
  outputFormat,
  dataInput,
  parameters,
  secretIngredient,
}) {
  const [copied, setCopied] = useState(false);

  // Parse or format data preview
  let parsedData = null;
  try {
    parsedData = JSON.parse(dataInput);
  } catch {
    parsedData = dataInput || { sample: 'custom_input' };
  }

  // Construct parameter dictionary
  const paramDict = parameters.reduce((acc, curr) => {
    if (curr.key && curr.key.trim()) {
      acc[curr.key.trim()] = isNaN(curr.value) ? curr.value : Number(curr.value);
    }
    return acc;
  }, {});

  if (secretIngredient) {
    paramDict['house_bayesian_prior'] = 'optimal_kelly_auto';
  }

  const recipePayload = {
    cocktail: cocktail.id,
    output_glass: outputFormat,
    secret_ingredient: secretIngredient,
    parameters: paramDict,
    data: parsedData,
  };

  const codeSnippet = `POST ${cocktail.endpoint || '/v1/pour/' + cocktail.id} HTTP/1.1
Host: api.supremebrain.ai
Content-Type: application/json
Authorization: Bearer speakeasy_key_live_94proof

${JSON.stringify(recipePayload, null, 2)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-gold/20 bg-gradient-to-b from-[#110d1a]/90 via-[#0a0710]/95 to-black p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-gold/15 pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-gold" />
          <span className="font-mono text-[11px] font-bold tracking-widest text-gold uppercase">
            The Recipe · API Preview
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gold/25 bg-black/60 px-3 py-1 font-mono text-[11px] text-light/90 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold">COPIED</span>
            </>
          ) : (
            <>
              <Copy size={12} className="text-smoke" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content View */}
      <div className="mt-3 relative">
        <pre className="max-h-56 overflow-x-auto rounded-xl border border-gold/10 bg-[#060408] p-3.5 font-mono text-[11px] leading-relaxed text-emerald-400/95 scrollbar-thin">
          <code>{codeSnippet}</code>
        </pre>
      </div>

      {/* Footer endpoint notice */}
      <div className="mt-2.5 flex items-center justify-between font-mono text-[9px] text-smoke/60">
        <span>Method: REST POST / cURL</span>
        <span className="text-tarnished-gold">Frontend Live Sync</span>
      </div>
    </div>
  );
}
