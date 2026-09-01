import React, { useState } from 'react';
import EntranceAnimation from './components/EntranceAnimation';
import HeroSection from './components/HeroSection';
import VictorianBarScene from './components/VictorianBarScene';
import HowItWorksScene from './components/HowItWorksScene';
import MenuScene from './components/MenuScene';
import WaitlistScene from './components/WaitlistScene';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  // Entrance animation plays on initial load
  const [showIntro, setShowIntro] = useState(true);

  // Auth Modal State (Sign In / Sign Up / Forgot Password)
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    initialMode: 'signin',
  });

  const handleOpenAuth = (mode = 'signin') => {
    setAuthModal({
      isOpen: true,
      initialMode: mode,
    });
  };

  const handleCloseAuth = () => {
    setAuthModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <>
      <div className="film-grain" />
      {showIntro && <EntranceAnimation onComplete={handleIntroComplete} />}
      <HeroSection onReplayIntro={handleReplayIntro} onOpenAuth={handleOpenAuth} />
      <VictorianBarScene />
      <HowItWorksScene />
      <MenuScene />
      <WaitlistScene />
      <Footer onOpenAuth={handleOpenAuth} />
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={handleCloseAuth}
        initialMode={authModal.initialMode}
      />
    </>
  );
}

export default App;

