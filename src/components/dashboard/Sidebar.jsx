import React from 'react';
import { motion } from 'framer-motion';
import {
  Wine,
  ScrollText,
  BookMarked,
  Bell,
  Sparkles,
  CreditCard,
  ArrowUpRight,
} from 'lucide-react';
import SupremeBrainLogo from '../SupremeBrainLogo';

export const DASHBOARD_TABS = [
  { id: 'usage', number: '01', label: 'USAGE', icon: Wine },
  { id: 'history', number: '02', label: 'HISTORY', icon: ScrollText },
  { id: 'recipes', number: '03', label: 'RECIPES', icon: BookMarked },
  { id: 'alerts', number: '04', label: 'ALERTS', icon: Bell },
  { id: 'nightcap', number: '05', label: 'NIGHTCAP', icon: Sparkles },
  { id: 'billing', number: '06', label: 'BILLING', icon: CreditCard },
];

export default function Sidebar({ activeTab, onSelectTab, currentPlan, alertCount }) {
  return (
    <aside className="hidden lg:flex w-60 xl:w-64 flex-col justify-between shrink-0 rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/85 backdrop-blur-xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] h-[calc(100vh-6.5rem)] sticky top-24">
      {/* ── TOP SECTION: BRAND & NAVIGATION ── */}
      <div className="space-y-6">
        {/* Sidebar Header */}
        <div className="pb-4 border-b border-gold/[0.1] px-2 flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] text-smoke/70 uppercase tracking-[0.25em] block">
              THE BACK ROOM
            </span>
            <span className="font-playfair text-base font-bold text-light tracking-wide">
              Supreme Brain
            </span>
          </div>
          <div className="w-6 h-6 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_8px_rgba(201,162,39,0.2)]">
            <SupremeBrainLogo className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Six Numbered Navigation Items */}
        <nav className="space-y-1.5" aria-label="Dashboard Navigation">
          {DASHBOARD_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-inter text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gold/[0.12] text-gold font-bold shadow-[0_0_15px_rgba(201,162,39,0.12)] translate-x-1'
                    : 'text-smoke/75 hover:text-gold hover:bg-gold/[0.04] hover:translate-x-1'
                }`}
              >
                {/* Active Thin Gold Accent Line on Left */}
                {isActive && (
                  <motion.span
                    layoutId="activeSidebarIndicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-r bg-gold shadow-[0_0_8px_#C9A227]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? 'text-gold' : 'text-smoke/50 group-hover:text-gold/70'
                    }`}
                  >
                    {tab.number}
                  </span>
                  <Icon
                    size={16}
                    className={`transition-colors ${
                      isActive
                        ? 'text-gold drop-shadow-[0_0_6px_rgba(201,162,39,0.5)]'
                        : 'text-smoke/60 group-hover:text-gold'
                    }`}
                  />
                  <span className="tracking-wide uppercase font-semibold">{tab.label}</span>
                </div>

                {/* Badge for Alerts count */}
                {tab.id === 'alerts' && alertCount > 0 && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">
                    {alertCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── BOTTOM SECTION: CURRENT STOOL & UPGRADE ── */}
      <div className="pt-4 border-t border-gold/[0.1]">
        <div className="rounded-xl border border-gold/15 bg-black/40 p-3.5 space-y-3">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-smoke/70 block">
              CURRENT STOOL
            </span>
            <div className="font-playfair text-sm font-bold text-light mt-0.5">
              {currentPlan?.name || 'The Enthusiast'}
            </div>
          </div>

          {/* Small Usage Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[10px] text-smoke/80">
              <span>Usage</span>
              <span className="text-gold font-semibold">2,345 / 10,000</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-black/80 overflow-hidden border border-gold/10">
              <div
                className="h-full bg-gold rounded-full shadow-[0_0_6px_#C9A227]"
                style={{ width: '23.45%' }}
              />
            </div>
          </div>

          {/* UPGRADE Button linking to Billing */}
          <button
            onClick={() => onSelectTab('billing')}
            className="w-full py-2 rounded-lg bg-gold/15 border border-gold/35 text-gold hover:bg-gold/25 hover:text-white font-inter text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>UPGRADE</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
