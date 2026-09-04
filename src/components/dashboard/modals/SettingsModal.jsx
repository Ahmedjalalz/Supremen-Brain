import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Bell, Shield, Check, Sparkles } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, user, onSaveUser, onShowToast }) {
  const [formData, setFormData] = useState(() => ({
    name: user?.name || 'Ahmed Jalal',
    email: user?.email || 'ahmed@supremebrain.ai',
    pourAlerts: user?.notifications?.pourAlerts ?? true,
    weeklyLedger: user?.notifications?.weeklyLedger ?? true,
    calibrationUpdates: user?.notifications?.calibrationUpdates ?? true,
    rateLimitWarnings: user?.notifications?.rateLimitWarnings ?? true,
  }));

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveUser) {
      onSaveUser({
        ...user,
        name: formData.name,
        email: formData.email,
        initials: formData.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        notifications: {
          pourAlerts: formData.pourAlerts,
          weeklyLedger: formData.weeklyLedger,
          calibrationUpdates: formData.calibrationUpdates,
          rateLimitWarnings: formData.rateLimitWarnings,
        },
      });
    }
    if (onShowToast) {
      onShowToast({
        title: 'Settings preserved.',
        message: 'Your member preferences have been recorded.',
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        {/* Smoked Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-2xl border border-gold/30 bg-[#0a0a14] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(201,162,39,0.15)] z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-gold/10">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-gold" />
                <span className="font-mono text-[11px] tracking-widest text-gold uppercase">
                  Member Preferences
                </span>
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-light mt-1">
                Bar Settings
              </h3>
              <p className="font-inter text-xs text-smoke mt-0.5">
                Adjust your patron identity and ledger dispatch preferences.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-gold/20 text-smoke/70 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Display Name */}
            <div>
              <label className="block font-mono text-[11px] text-smoke uppercase tracking-wider mb-1.5">
                Display Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gold/20 bg-[#06060a] pl-10 pr-4 py-2.5 font-inter text-sm text-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono text-[11px] text-smoke uppercase tracking-wider mb-1.5">
                Patron Dispatch Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gold/20 bg-[#06060a] pl-10 pr-4 py-2.5 font-inter text-sm text-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                  required
                />
              </div>
            </div>

            {/* Theme Information */}
            <div className="rounded-xl border border-gold/15 bg-black/40 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-smoke uppercase tracking-wider">
                  Ambiance / Theme
                </span>
                <span className="font-mono text-xs text-gold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
                  Victorian Back Room
                </span>
              </div>
              <p className="font-inter text-[11px] text-smoke/70 mt-1">
                Smoked crystal, aged wood, and warm 92-proof amber lighting are locked by the House.
              </p>
            </div>

            {/* Notification Toggles */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-[11px] text-smoke uppercase tracking-wider">
                Ledger Dispatch & Warnings
              </div>

              {[
                {
                  key: 'pourAlerts',
                  label: 'Pour Completion Notices',
                  desc: 'Notify when high-proof batch inferences finish',
                },
                {
                  key: 'rateLimitWarnings',
                  label: 'Stool Volume Alerts',
                  desc: 'Warn when monthly pour capacity exceeds 80%',
                },
                {
                  key: 'calibrationUpdates',
                  label: 'House Recipe Upgrades',
                  desc: 'Alerts when newer ML weights are deployed behind the bar',
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between p-3 rounded-xl border border-gold/10 bg-[#06060a]/60 hover:border-gold/25 transition-colors cursor-pointer select-none"
                >
                  <div className="pr-4">
                    <div className="font-inter text-xs font-medium text-light">
                      {item.label}
                    </div>
                    <div className="font-inter text-[11px] text-smoke/70">
                      {item.desc}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData[item.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.key]: e.target.checked })
                    }
                    className="accent-[#C9A227] w-4 h-4 rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gold/20 text-smoke hover:text-light text-xs font-inter transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs font-semibold tracking-wide hover:shadow-[0_0_15px_rgba(201,162,39,0.3)] active:scale-[0.98] transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
