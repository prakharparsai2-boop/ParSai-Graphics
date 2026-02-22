import React from 'react';
import './Loader.css';

interface LoaderProps {
  progress: number;
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ progress, isLoading }) => {
  return (
    <div className={`loader-container ${!isLoading ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          ParSai
        </div>
        
        <div className="loader-progress-wrapper">
          <div className="loader-metrics">
            <div className="loader-label">Loading Assets</div>
            <div className="loader-percentage">{Math.round(progress)}%</div>
          </div>
          
          <div className="loader-bar-bg">
            <div 
              className="loader-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="loader-status">
            {progress < 30 && "Initializing..."}
            {progress >= 30 && progress < 60 && "Loading premium visuals..."}
            {progress >= 60 && progress < 90 && "Preparing interaction maps..."}
            {progress >= 90 && "Almost there..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
