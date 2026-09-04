import React, { useState, useEffect } from 'react';
import EntranceAnimation from './components/EntranceAnimation';
import HeroSection from './components/HeroSection';
import VictorianBarScene from './components/VictorianBarScene';
import HowItWorksScene from './components/HowItWorksScene';
import MenuScene from './components/MenuScene';
import WaitlistScene from './components/WaitlistScene';
import Footer from './components/Footer';
import AuthPage from './components/auth/AuthPage';
import OrderPage from './components/order/OrderPage';
import ResultsPage from './components/results/ResultsPage';
import DashboardPage from './components/dashboard/DashboardPage';

function App() {
  // Entrance animation plays on initial load
  const [showIntro, setShowIntro] = useState(() => {
    // Only play entrance animation on initial root visit
    return window.location.pathname === '/' || !window.location.pathname;
  });

  // Client-side routing state
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname || '/';
  });

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route) => {
    window.history.pushState(null, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode = 'signin') => {
    if (mode === 'signup') {
      handleNavigate('/signup');
    } else if (mode === 'forgot') {
      handleNavigate('/forgot-password');
    } else {
      handleNavigate('/login');
    }
  };

  const handleOrderCocktail = (cocktailId) => {
    if (cocktailId) {
      localStorage.setItem('supreme_selected_cocktail', cocktailId);
    }
    handleNavigate('/order');
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Check if current route is an authentication page
  const isAuthRoute =
    currentRoute === '/login' ||
    currentRoute === '/signup' ||
    currentRoute === '/forgot-password';

  if (isAuthRoute) {
    return (
      <>
        <div className="film-grain" />
        <AuthPage currentRoute={currentRoute} onNavigate={handleNavigate} />
      </>
    );
  }

  // Check if current route is The Making (/order)
  if (currentRoute === '/order') {
    return (
      <>
        <div className="film-grain" />
        <OrderPage onNavigate={handleNavigate} onOpenAuth={handleOpenAuth} />
      </>
    );
  }

  // Check if current route is The Pour (/results)
  if (currentRoute === '/results') {
    return (
      <>
        <div className="film-grain" />
        <ResultsPage onNavigate={handleNavigate} onOpenAuth={handleOpenAuth} />
      </>
    );
  }

  // Check if current route is The Back Room (/dashboard)
  if (currentRoute === '/dashboard') {
    return (
      <>
        <div className="film-grain" />
        <DashboardPage onNavigate={handleNavigate} onOpenAuth={handleOpenAuth} />
      </>
    );
  }

  return (
    <>
      <div className="film-grain" />
      {showIntro && <EntranceAnimation onComplete={handleIntroComplete} />}
      <HeroSection
        onReplayIntro={handleReplayIntro}
        onOpenAuth={handleOpenAuth}
        onNavigate={handleNavigate}
      />
      <VictorianBarScene />
      <HowItWorksScene />
      <MenuScene onNavigate={handleNavigate} onOrderCocktail={handleOrderCocktail} />
      <WaitlistScene />
      <Footer onOpenAuth={handleOpenAuth} onNavigate={handleNavigate} />
    </>
  );
}

export default App;
