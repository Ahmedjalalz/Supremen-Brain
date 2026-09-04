import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  AlertTriangle,
  Info,
  AlertOctagon,
  X,
  ArrowRight,
  Sparkles,
  Wine,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function AlertsTab({ alerts, onDismissAlert, onSelectTab, onNavigate }) {
  const getAlertVisuals = (type) => {
    switch (type) {
      case 'warning':
        return {
          icon: AlertTriangle,
          borderColor: 'border-tarnished-gold/30',
          bgColor: 'bg-tarnished-gold/[0.04]',
          iconColor: 'text-tarnished-gold',
          iconBg: 'bg-tarnished-gold/15 border-tarnished-gold/30',
          badgeText: 'NOTICE',
        };
      case 'error':
        return {
          icon: AlertOctagon,
          borderColor: 'border-red-900/40',
          bgColor: 'bg-red-950/[0.08]',
          iconColor: 'text-red-400/90',
          iconBg: 'bg-red-950/40 border-red-800/30',
          badgeText: 'ON THE ROCKS',
        };
      case 'info':
      default:
        return {
          icon: Info,
          borderColor: 'border-gold/30',
          bgColor: 'bg-gold/[0.04]',
          iconColor: 'text-gold',
          iconBg: 'bg-gold/15 border-gold/30',
          badgeText: 'HOUSE BULLETIN',
        };
    }
  };

  const handleAlertAction = (alert) => {
    if (alert.actionTab) {
      if (onSelectTab) {
        onSelectTab(alert.actionTab);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
            LAST CALL
          </span>
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-black text-light tracking-tight">
          Important notices from the bar.
        </h1>
        <p className="font-inter text-sm sm:text-base text-smoke/80 mt-1.5 max-w-2xl leading-relaxed">
          Keep an eye on anything that needs your attention. Telemetry alerts, model updates, and tab caps.
        </p>
      </div>

      {/* ── ALERTS LIST OR EMPTY STATE ── */}
      {alerts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-gold/[0.15] bg-[#0a0a14]/60 backdrop-blur-xl p-12 sm:p-16 text-center space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle Vintage Glass Illustration */}
          <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-xl" />
            <div className="h-14 w-14 rounded-2xl border border-gold/30 bg-[#0c0c16] flex items-center justify-center text-gold shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              <Wine size={26} className="text-gold opacity-90" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-sm mx-auto">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-light">
              All quiet at the bar.
            </h3>
            <p className="font-inter text-xs sm:text-sm text-smoke/80 leading-relaxed">
              No new alerts. Your tab is clear, all models are calibrated, and the back room is undisturbed. Enjoy your evening.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3.5">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => {
              const visuals = getAlertVisuals(alert.type);
              const Icon = visuals.icon;

              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl border ${visuals.borderColor} ${visuals.bgColor} backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${visuals.iconBg} ${visuals.iconColor}`}
                      >
                        <Icon size={20} />
                      </div>

                      {/* Content */}
                      <div className="space-y-1 pr-6">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-smoke/60">
                            {visuals.badgeText}
                          </span>
                          <span className="text-gold/30 text-[8px]">·</span>
                          <span className="font-mono text-[10px] text-smoke/70">
                            {alert.timestamp}
                          </span>
                        </div>

                        <h3 className="font-playfair text-base sm:text-lg font-bold text-light tracking-wide">
                          {alert.title}
                        </h3>

                        <p className="font-inter text-xs sm:text-sm text-smoke/90 leading-relaxed pt-0.5 max-w-3xl">
                          {alert.message}
                        </p>

                        {/* Optional Action Button */}
                        {alert.actionLabel && (
                          <div className="pt-2">
                            <button
                              onClick={() => handleAlertAction(alert)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gold/30 bg-black/40 text-gold hover:text-white hover:border-gold hover:bg-gold/15 font-inter text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              <span>{alert.actionLabel}</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dismiss Button */}
                    <button
                      onClick={() => onDismissAlert(alert.id)}
                      title="Dismiss Notice"
                      className="p-1.5 rounded-lg text-smoke/50 hover:text-light hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
