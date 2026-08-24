import React, { useState } from 'react';
import EntranceAnimation from './components/EntranceAnimation';
import HeroSection from './components/HeroSection';
import VictorianBarScene from './components/VictorianBarScene';

function App() {
  // Always show entrance – localStorage gate is temporarily disabled for testing
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <>
      <div className="film-grain" />
      {showIntro ? (
        <EntranceAnimation onComplete={handleIntroComplete} />
      ) : (
        <>
          <HeroSection onReplayIntro={handleReplayIntro} />
          <VictorianBarScene />
        </>
      )}
    </>
  );
}

export default App;

