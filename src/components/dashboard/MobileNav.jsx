import React from 'react';
import { DASHBOARD_TABS } from './Sidebar';

export default function MobileNav({ activeTab, onSelectTab, alertCount }) {
  return (
    <div className="lg:hidden w-full overflow-x-auto no-scrollbar pb-2">
      <div className="flex items-center gap-2 min-w-max p-1 rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
        {DASHBOARD_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-inter text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gold/20 text-gold border border-gold/40 shadow-[0_0_12px_rgba(201,162,39,0.2)]'
                  : 'text-smoke/70 hover:text-gold hover:bg-gold/[0.05]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-gold' : 'text-smoke/60'} />
              <span>{tab.label}</span>

              {tab.id === 'alerts' && alertCount > 0 && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-gold/30 text-gold font-bold">
                  {alertCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
