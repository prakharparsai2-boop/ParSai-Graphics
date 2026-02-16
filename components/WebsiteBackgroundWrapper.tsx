import React from 'react';
import './WebsiteBackgroundWrapper.css';

interface WebsiteBackgroundWrapperProps {
  children: React.ReactNode;
}

const WebsiteBackgroundWrapper: React.FC<WebsiteBackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="website-bg-wrapper">
      <div className="website-bg-layer">
        <div className="bg-glow bg-glow-purple-left" />
        <div className="bg-glow bg-glow-indigo-right" />
        <div className="bg-noise" />
      </div>
      <div className="relative-z">
        {children}
      </div>
    </div>
  );
};

export default WebsiteBackgroundWrapper;