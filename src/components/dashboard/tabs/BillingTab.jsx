import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Check,
  Sparkles,
  Receipt,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  X,
  ExternalLink,
  ShieldCheck,
  Building,
  User,
  MapPin,
  Globe,
  ArrowRight,
} from 'lucide-react';
import {
  DUMMY_PLANS,
  DUMMY_INVOICES,
  DUMMY_BILLING_INFO,
} from '../../../data/dashboard';

export default function BillingTab({
  currentPlan,
  subscriptionStatus,
  paymentMethods,
  onSavePlan,
  onSaveSubscriptionStatus,
  onSavePaymentMethods,
  onShowToast,
}) {
  // Modals state
  const [changeStoolModalOpen, setChangeStoolModalOpen] = useState(false);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [billingInfoModalOpen, setBillingInfoModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // Billing details local state
  const [billingInfo, setBillingInfo] = useState(DUMMY_BILLING_INFO);

  // Add card form state
  const [cardFormData, setCardFormData] = useState({
    name: 'Ahmed Jalal',
    number: '4242 •••• •••• 1234',
    expiry: '12/29',
    cvc: '742',
    zip: 'EC2V 8EH',
  });

  const handleSelectPlan = (plan) => {
    onSavePlan(plan.id);
    setChangeStoolModalOpen(false);
    if (onShowToast) {
      onShowToast({
        title: 'Your stool has been changed.',
        message: `You are now seated at ${plan.name} (${plan.pours}).`,
      });
    }
  };

  const handleRemovePaymentMethod = (id) => {
    if (paymentMethods.length <= 1) {
      if (onShowToast) {
        onShowToast({
          title: 'Card Retained',
          message: 'At least one payment method is required for an active stool.',
        });
      }
      return;
    }
    const updated = paymentMethods.filter((pm) => pm.id !== id);
    onSavePaymentMethods(updated);
    if (onShowToast) {
      onShowToast({
        title: 'Card Removed',
        message: 'Payment method removed from your ledger tab.',
      });
    }
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    const last4 = cardFormData.number.replace(/\D/g, '').slice(-4) || '1234';
    const [expMonth, expYear] = cardFormData.expiry.split('/');
    const newCard = {
      id: `pm_${Date.now()}`,
      brand: 'VISA',
      last4: last4,
      expMonth: expMonth || '12',
      expYear: expYear || '29',
      isDefault: false,
    };
    onSavePaymentMethods([...paymentMethods, newCard]);
    setAddCardModalOpen(false);
    if (onShowToast) {
      onShowToast({
        title: 'Payment method added.',
        message: `Card ending in •••• ${last4} is now available on your tab.`,
      });
    }
  };

  const handleUpdateBillingInfo = (e) => {
    e.preventDefault();
    setBillingInfoModalOpen(false);
    if (onShowToast) {
      onShowToast({
        title: 'Billing details updated.',
        message: 'Receipt invoices will reflect your new billing entity.',
      });
    }
  };

  const handleCancelSubscription = () => {
    onSaveSubscriptionStatus('CANCELLED');
    setCancelModalOpen(false);
    if (onShowToast) {
      onShowToast({
        title: 'Subscription Cancelled',
        message: "We'll keep your stool until the end of the current period.",
      });
    }
  };

  const handleReactivateSubscription = () => {
    onSaveSubscriptionStatus('ACTIVE');
    if (onShowToast) {
      onShowToast({
        title: 'Stool Restored',
        message: 'Your membership stool is once again in good standing.',
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A227]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
            YOUR TAB
          </span>
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-black text-light tracking-tight">
          Manage Your Stool
        </h1>
        <p className="font-inter text-sm sm:text-base text-smoke/80 mt-1.5 max-w-2xl leading-relaxed">
          Your seat at the bar, your pours, and your billing. Transparent ledger accounting with no hidden fees.
        </p>
      </div>

      {/* ── CURRENT PLAN / STOOL CARD ── */}
      <div className="rounded-2xl border border-gold/25 bg-[#0a0a14]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(201,162,39,0.12)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gold/[0.12]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold uppercase tracking-widest font-semibold">
                CURRENT STOOL
              </span>
              {subscriptionStatus === 'CANCELLED' ? (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-red-900/30 border border-red-500/40 text-red-300 uppercase">
                  CANCELLED (ACTIVE UNTIL MAR 01)
                </span>
              ) : (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/30 border border-emerald-500/40 text-emerald-300 uppercase">
                  ACTIVE
                </span>
              )}
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl font-black text-light">
              {currentPlan.name}
            </h2>

            <p className="font-inter text-xs sm:text-sm text-smoke/80 max-w-xl">
              {currentPlan.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right">
            <div>
              <div className="font-playfair text-3xl sm:text-4xl font-black text-gold">
                ${currentPlan.price}
                <span className="font-inter text-sm font-normal text-smoke/80 ml-1">
                  / month
                </span>
              </div>
              <div className="font-mono text-[11px] text-smoke/60 mt-0.5">
                Next renewal: March 01, 2026
              </div>
            </div>

            <button
              onClick={() => setChangeStoolModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4a030] via-gold to-[#c8960a] text-[#0a0804] font-inter text-xs font-semibold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              CHANGE STOOL
            </button>
          </div>
        </div>

        {/* Usage Progress Bar */}
        <div className="pt-6 space-y-2.5">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-smoke/80">Monthly Pour Capacity</span>
            <span className="text-gold font-bold">
              2,345 / {currentPlan.poursLimit ? currentPlan.poursLimit.toLocaleString() : '10,000'} pours
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-black/60 border border-gold/15 p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-gold to-amber-300 transition-all duration-500 shadow-[0_0_10px_rgba(201,162,39,0.5)]"
              style={{
                width: `${Math.min(
                  100,
                  (2345 / (currentPlan.poursLimit || 10000)) * 100
                )}%`,
              }}
            />
          </div>

          <div className="flex justify-between text-[11px] font-inter text-smoke/60 pt-0.5">
            <span>23.4% consumed this billing cycle</span>
            <span>76.6% reserve intact</span>
          </div>
        </div>
      </div>

      {/* ── PAYMENT METHODS & BILLING DETAILS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods ("Your Cards") */}
        <div className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-light">
                Your Cards
              </h3>
              <p className="font-inter text-xs text-smoke/80 mt-0.5">
                Cards linked to your private member tab.
              </p>
            </div>
            <button
              onClick={() => setAddCardModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/30 bg-black/40 text-gold hover:text-white hover:border-gold hover:bg-gold/10 font-inter text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus size={14} /> Add Card
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gold/15 bg-black/40 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-12 rounded-lg bg-[#06060a] border border-gold/20 flex items-center justify-center font-mono text-[11px] font-bold text-gold">
                    {pm.brand}
                  </div>
                  <div>
                    <div className="font-mono text-sm text-light font-medium flex items-center gap-2">
                      <span>•••• {pm.last4}</span>
                      {pm.isDefault && (
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[11px] text-smoke/70">
                      Expires {pm.expMonth}/{pm.expYear}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemovePaymentMethod(pm.id)}
                  title="Remove card"
                  className="p-2 rounded-lg text-smoke/60 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Information Card */}
        <div className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-light">
                  Billing Entity
                </h3>
                <p className="font-inter text-xs text-smoke/80 mt-0.5">
                  Tax and entity details printed on House invoices.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-inter text-smoke/90">
              <div className="flex items-center gap-2">
                <User size={14} className="text-gold" />
                <span className="text-light font-medium">{billingInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building size={14} className="text-gold" />
                <span>{billingInfo.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span>
                  {billingInfo.address}, {billingInfo.city}, {billingInfo.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-gold" />
                <span>{billingInfo.country} · VAT: {billingInfo.vatNumber}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gold/[0.08]">
            <button
              onClick={() => setBillingInfoModalOpen(true)}
              className="w-full py-2.5 rounded-xl border border-gold/30 bg-black/40 text-gold hover:text-white hover:border-gold hover:bg-gold/15 font-inter text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              UPDATE BILLING DETAILS
            </button>
          </div>
        </div>
      </div>

      {/* ── THE RECEIPTS (INVOICES TABLE) ── */}
      <div className="rounded-2xl border border-gold/[0.12] bg-[#0a0a14]/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4">
        <div>
          <h3 className="font-playfair text-lg sm:text-xl font-bold text-light">
            The Receipts
          </h3>
          <p className="font-inter text-xs text-smoke/80 mt-0.5">
            Archived settlement records for all past subscription periods.
          </p>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gold/[0.08] text-[11px] font-mono uppercase text-smoke/70">
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">DESCRIPTION</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/[0.06] text-xs">
              {DUMMY_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-gold/[0.03] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-smoke/90">
                    {inv.date}
                  </td>
                  <td className="py-3.5 px-4 font-inter text-light">
                    {inv.planName}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gold font-bold">
                    {inv.amount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="text-gold hover:underline font-inter text-xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>VIEW</span>
                      <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CANCEL / REACTIVATE SUBSCRIPTION ── */}
      <div className="pt-4 border-t border-gold/[0.1] flex items-center justify-between">
        {subscriptionStatus === 'CANCELLED' ? (
          <button
            onClick={handleReactivateSubscription}
            className="font-inter text-xs text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
          >
            Reactivate subscription
          </button>
        ) : (
          <button
            onClick={() => setCancelModalOpen(true)}
            className="font-inter text-xs text-red-400/80 hover:text-red-300 underline cursor-pointer"
          >
            Cancel subscription
          </button>
        )}

        <span className="font-mono text-[11px] text-smoke/50">
          Supreme Brain Speakeasy Ledger · V1 Prototype
        </span>
      </div>

      {/* ── PLAN SELECTOR MODAL (CHANGE STOOL) ── */}
      <AnimatePresence>
        {changeStoolModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChangeStoolModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl rounded-2xl border border-gold/30 bg-[#0a0a14] p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-gold/10">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-light">
                    Select Your Stool at the Bar
                  </h3>
                  <p className="font-inter text-xs text-smoke mt-0.5">
                    Choose the prediction bandwidth, latency tier, and GPU allocations suited to your appetite.
                  </p>
                </div>
                <button
                  onClick={() => setChangeStoolModalOpen(false)}
                  className="p-1.5 rounded-lg border border-gold/20 text-smoke hover:text-gold transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 4 Plans Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {DUMMY_PLANS.map((plan) => {
                  const isCurrent = plan.id === currentPlan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan)}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                        isCurrent
                          ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(201,162,39,0.2)]'
                          : 'border-gold/15 bg-black/40 hover:border-gold/40 hover:-translate-y-0.5'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2.5 right-4 font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold text-[#06060a] font-bold">
                          POPULAR
                        </span>
                      )}

                      <div className="space-y-3">
                        <div>
                          <span
                            className="font-mono text-[10px] uppercase tracking-wider block"
                            style={{ color: plan.accentColor }}
                          >
                            {plan.tierName}
                          </span>
                          <h4 className="font-playfair text-lg font-bold text-light">
                            {plan.name}
                          </h4>
                        </div>

                        <div className="font-playfair text-2xl font-bold text-gold">
                          ${plan.price}
                          <span className="font-inter text-xs font-normal text-smoke/80 ml-1">
                            {plan.period}
                          </span>
                        </div>

                        <div className="font-mono text-xs text-light/90 pb-2 border-b border-gold/10">
                          {plan.pours}
                        </div>

                        <ul className="space-y-1.5 text-[11px] font-inter text-smoke">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-1.5">
                              <Check size={12} className="text-gold shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 mt-4">
                        <button
                          type="button"
                          className={`w-full py-2 rounded-xl font-inter text-xs font-semibold tracking-wider uppercase transition-colors ${
                            isCurrent
                              ? 'bg-gold/20 border border-gold/40 text-gold cursor-default'
                              : 'bg-black/60 border border-gold/20 text-smoke hover:text-light hover:border-gold/40'
                          }`}
                        >
                          {isCurrent ? 'CURRENT STOOL' : 'SELECT STOOL'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ADD PAYMENT METHOD MODAL ── */}
      <AnimatePresence>
        {addCardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddCardModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-[#0a0a14] p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start justify-between pb-3 border-b border-gold/10">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-light">
                    Add Payment Method
                  </h3>
                  <p className="font-inter text-xs text-smoke mt-0.5">
                    Link a credit card to settle your monthly pours.
                  </p>
                </div>
                <button
                  onClick={() => setAddCardModalOpen(false)}
                  className="p-1 rounded-lg text-smoke hover:text-gold"
                >
                  <X size={18} />
                </button>
              </div>

              {/* DEMO PROTOTYPE NOTICE */}
              <div className="rounded-xl border border-gold/25 bg-gold/10 p-3 flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-gold shrink-0 mt-0.5" />
                <p className="font-inter text-xs text-gold leading-relaxed">
                  <strong>Demo payment form — no payment will be processed.</strong> Do not enter actual sensitive financial credentials.
                </p>
              </div>

              <form onSubmit={handleAddCardSubmit} className="space-y-4 text-xs font-inter">
                <div>
                  <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardFormData.name}
                    onChange={(e) =>
                      setCardFormData({ ...cardFormData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3.5 py-2 text-light focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardFormData.number}
                    onChange={(e) =>
                      setCardFormData({ ...cardFormData, number: e.target.value })
                    }
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3.5 py-2 font-mono text-light focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                      MM/YY
                    </label>
                    <input
                      type="text"
                      value={cardFormData.expiry}
                      onChange={(e) =>
                        setCardFormData({ ...cardFormData, expiry: e.target.value })
                      }
                      className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 font-mono text-light focus:border-gold focus:outline-none text-center"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cardFormData.cvc}
                      onChange={(e) =>
                        setCardFormData({ ...cardFormData, cvc: e.target.value })
                      }
                      className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 font-mono text-light focus:border-gold focus:outline-none text-center"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                      ZIP
                    </label>
                    <input
                      type="text"
                      value={cardFormData.zip}
                      onChange={(e) =>
                        setCardFormData({ ...cardFormData, zip: e.target.value })
                      }
                      className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 font-mono text-light focus:border-gold focus:outline-none text-center"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setAddCardModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gold/20 text-smoke hover:text-light"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gold text-[#06060a] font-semibold hover:bg-amber-400 uppercase tracking-wider text-xs"
                  >
                    Save Card
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BILLING INFO MODAL ── */}
      <AnimatePresence>
        {billingInfoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBillingInfoModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-[#0a0a14] p-6 sm:p-8 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-gold/10">
                <h3 className="font-playfair text-xl font-bold text-light">
                  Update Billing Entity
                </h3>
                <button
                  onClick={() => setBillingInfoModalOpen(false)}
                  className="p-1 text-smoke hover:text-gold"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdateBillingInfo} className="space-y-3.5 text-xs font-inter">
                <div>
                  <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                    Entity / Full Name
                  </label>
                  <input
                    type="text"
                    value={billingInfo.name}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 text-light focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={billingInfo.company}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, company: e.target.value })
                    }
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 text-light focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={billingInfo.address}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, address: e.target.value })
                    }
                    className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 text-light focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={billingInfo.city}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, city: e.target.value })
                      }
                      className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 text-light focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-smoke uppercase mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={billingInfo.country}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, country: e.target.value })
                      }
                      className="w-full rounded-xl border border-gold/20 bg-[#06060a] px-3 py-2 text-light focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setBillingInfoModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gold/20 text-smoke"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gold text-[#06060a] font-semibold uppercase text-xs"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── INVOICE RECEIPT MODAL ── */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-[#0c0c16] p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start justify-between pb-3 border-b border-gold/15">
                <div>
                  <span className="font-mono text-[10px] text-smoke uppercase tracking-wider">
                    SETTLEMENT RECEIPT
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-light">
                    {selectedInvoice.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1 text-smoke hover:text-gold"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-xl border border-gold/10 bg-black/40 p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-smoke">Date:</span>
                  <span className="text-light">{selectedInvoice.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Description:</span>
                  <span className="text-light">{selectedInvoice.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Amount Paid:</span>
                  <span className="text-gold font-bold">{selectedInvoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Payment Status:</span>
                  <span className="text-emerald-400">{selectedInvoice.status}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-5 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold text-xs font-inter font-semibold"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CANCEL CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancelModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-2xl border border-red-500/30 bg-[#0c0c14] p-6 shadow-2xl z-10 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                <AlertCircle size={20} />
              </div>

              <div>
                <h4 className="font-playfair text-lg font-bold text-light">
                  Are you sure you want to leave the bar?
                </h4>
                <p className="font-inter text-xs text-smoke mt-1 leading-relaxed">
                  Your seat will be relinquished at the conclusion of your current billing period. All model telemetry and past pours remain preserved.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gold/20 text-smoke hover:text-light text-xs font-inter"
                >
                  STAY FOR ANOTHER ROUND
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 text-xs font-inter font-semibold"
                >
                  CANCEL STOOL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
