import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function WarningsPanel({ warnings = [] }) {
  if (!warnings || warnings.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-black/60 to-amber-950/20 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-500/20">
        <AlertTriangle size={15} className="text-amber-400" />
        <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
          Risk Disclaimers & Model Considerations
        </span>
      </div>

      <ul className="space-y-1.5 font-inter text-xs text-smoke/90">
        {warnings.map((warning, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-amber-400 font-mono text-[10px] mt-0.5">●</span>
            <span className="leading-relaxed">{warning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
