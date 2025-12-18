import { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Portfolio } from './components/Portfolio';

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  const handleDisperse = () => {
    setIsDisappearing(true);
    // Wait for fade-out animation to complete before showing portfolio
    setTimeout(() => {
      setShowPortfolio(true);
    }, 1500);
  };

  if (showPortfolio) {
    return (
      <div className="animate-fade-in">
        <Portfolio />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      <ParticleCanvas onDisperse={handleDisperse} isDisappearing={isDisappearing} />
    </div>
  );
}
