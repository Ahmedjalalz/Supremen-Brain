import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import CalmAtmosphere from './CalmAtmosphere';
import UsageTab from './tabs/UsageTab';
import HistoryTab from './tabs/HistoryTab';
import RecipesTab from './tabs/RecipesTab';
import AlertsTab from './tabs/AlertsTab';
import NightcapTab from './tabs/NightcapTab';
import BillingTab from './tabs/BillingTab';
import SettingsModal from './modals/SettingsModal';
import Toast from './modals/Toast';
import {
  DUMMY_USER,
  DUMMY_USAGE,
  loadStoredHistory,
  saveStoredHistory,
  loadStoredRecipes,
  saveStoredRecipes,
  loadStoredAlerts,
  saveDismissedAlert,
  loadStoredPlan,
  saveStoredPlan,
  loadSubscriptionStatus,
  saveSubscriptionStatus,
  loadStoredPaymentMethods,
  saveStoredPaymentMethods,
} from '../../data/dashboard';

export default function DashboardPage({ onNavigate, onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('usage');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Local state initialized from storage/dummy data
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('supreme_dashboard_user');
      return saved ? JSON.parse(saved) : DUMMY_USER;
    } catch (e) {
      return DUMMY_USER;
    }
  });

  const [history, setHistory] = useState(loadStoredHistory);
  const [recipes, setRecipes] = useState(loadStoredRecipes);
  const [alerts, setAlerts] = useState(loadStoredAlerts);
  const [currentPlan, setCurrentPlan] = useState(loadStoredPlan);
  const [subscriptionStatus, setSubscriptionStatus] = useState(loadSubscriptionStatus);
  const [paymentMethods, setPaymentMethods] = useState(loadStoredPaymentMethods);

  // Synchronize title
  useEffect(() => {
    document.title = `Supreme Brain · The Back Room · ${activeTab.toUpperCase()}`;
  }, [activeTab]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Save User
  const handleSaveUser = (updatedUser) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('supreme_dashboard_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
    }
  };

  // Save Recipes
  const handleSaveRecipes = (updatedRecipes) => {
    setRecipes(updatedRecipes);
    saveStoredRecipes(updatedRecipes);
  };

  // Dismiss Alert
  const handleDismissAlert = (alertId) => {
    saveDismissedAlert(alertId);
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  // Update Order Outcome from Nightcap
  const handleUpdateOrderOutcome = (orderId, newOutcome, meta = {}) => {
    const updatedHistory = history.map((item) => {
      if (item.id === orderId) {
        return {
          ...item,
          outcome: newOutcome,
          userFeedbackNotes: meta.userNotes || '',
          perceivedConfidence: meta.perceivedConfidence || item.proof,
          verifiedAt: new Date().toISOString(),
        };
      }
      return item;
    });
    setHistory(updatedHistory);
    saveStoredHistory(updatedHistory);
  };

  // Save Plan / Change Stool
  const handleSavePlan = (planId) => {
    saveStoredPlan(planId);
    setCurrentPlan(loadStoredPlan());
  };

  // Save Subscription Status
  const handleSaveSubscriptionStatus = (status) => {
    saveSubscriptionStatus(status);
    setSubscriptionStatus(status);
  };

  // Save Payment Methods
  const handleSavePaymentMethods = (methods) => {
    setPaymentMethods(methods);
    saveStoredPaymentMethods(methods);
  };

  // Tab transition motion variants
  const tabMotionVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06060a] text-light selection:bg-gold/30 selection:text-gold overflow-x-hidden pt-20 pb-20">
      {/* Calm ambient background particles & warm glow */}
      <CalmAtmosphere />

      {/* Speakeasy Navbar with Avatar Dropdown */}
      <Navbar
        currentRoute="/dashboard"
        onNavigate={onNavigate}
        onOpenAuth={onOpenAuth}
        user={user}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Page Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        {/* Mobile Tab Navigation (< lg) */}
        <MobileNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          alertCount={alerts.length}
        />

        {/* Desktop Sidebar + Main Content Layout */}
        <div className="flex items-start gap-6 lg:gap-8 mt-3 lg:mt-0">
          {/* Desktop Glass Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            currentPlan={currentPlan}
            alertCount={alerts.length}
          />

          {/* Main Dashboard Content Panel inside Subtle Glassmorphism Environment */}
          <div className="flex-1 min-w-0 rounded-2xl border border-gold/[0.1] bg-[#0a0a12]/70 backdrop-blur-xl p-5 sm:p-7 lg:p-9 shadow-[0_16px_45px_rgba(0,0,0,0.6)]">
            <AnimatePresence mode="wait">
              {activeTab === 'usage' && (
                <motion.div
                  key="usage"
                  variants={tabMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <UsageTab
                    usage={DUMMY_USAGE}
                    history={history}
                    onShowToast={setToast}
                  />
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  variants={tabMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <HistoryTab
                    history={history}
                    onNavigate={onNavigate}
                    onShowToast={setToast}
                  />
                </motion.div>
              )}

              {activeTab === 'recipes' && (
                <motion.div
                  key="recipes"
                  variants={tabMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <RecipesTab
                    recipes={recipes}
                    onSaveRecipes={handleSaveRecipes}
                    onNavigate={onNavigate}
                    onShowToast={setToast}
                  />
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  variants={tabMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <AlertsTab
                    alerts={alerts}
                    onDismissAlert={handleDismissAlert}
                    onSelectTab={setActiveTab}
                    onNavigate={onNavigate}
                  />
                </motion.div>
              )}

              {activeTab === 'nightcap' && (
                <motion.div
                  key="nightcap"
                  variants={tabMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <NightcapTab
                    history={history}
                    onUpdateOrderOutcome={handleUpdateOrderOutcome}
                    onShowToast={setToast}
                    onSelectTab={setActiveTab}
                  />
                </motion.div>
              )}

              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  variants={tabMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <BillingTab
                    currentPlan={currentPlan}
                    subscriptionStatus={subscriptionStatus}
                    paymentMethods={paymentMethods}
                    onSavePlan={handleSavePlan}
                    onSaveSubscriptionStatus={handleSaveSubscriptionStatus}
                    onSavePaymentMethods={handleSavePaymentMethods}
                    onShowToast={setToast}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        user={user}
        onSaveUser={handleSaveUser}
        onShowToast={setToast}
      />

      {/* Speakeasy Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
