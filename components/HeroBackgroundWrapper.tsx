import React from 'react';
import './HeroBackgroundWrapper.css';

interface HeroBackgroundWrapperProps {
  children: React.ReactNode;
}

const HeroBackgroundWrapper: React.FC<HeroBackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="hero-bg-wrapper">
      <div className="hero-bg-layer">
        <div className="bg-glow bg-glow-yellow animate-pulse" />
        <div className="bg-glow bg-glow-blue" />
        <div className="bg-noise" />
      </div>
      <div className="relative-z">
        {children}
      </div>
    </div>
  );
};

export default HeroBackgroundWrapper;