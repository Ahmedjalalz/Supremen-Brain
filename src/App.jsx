import React, { useState } from 'react';
import EntranceAnimation from './components/EntranceAnimation';
import HeroSection from './components/HeroSection';
import VictorianBarScene from './components/VictorianBarScene';
import HowItWorksScene from './components/HowItWorksScene';
import MenuScene from './components/MenuScene';

function App() {
  // Entrance animation plays on initial load
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
      {showIntro && <EntranceAnimation onComplete={handleIntroComplete} />}
      <HeroSection onReplayIntro={handleReplayIntro} />
      <VictorianBarScene />
      <HowItWorksScene />
      <MenuScene />
    </>
  );
}

export default App;

