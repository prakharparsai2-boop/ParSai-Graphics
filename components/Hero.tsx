import React from "react";
import { Box, Layers, Aperture, Film, Scissors } from "lucide-react";
import MarqueeButton from "./MarqueeButton";
import PausableAnimation from "./PausableAnimation";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* 
        Layer 1: Typography (Behind Image)
      */}
      <header className="hero-text-layer">
        <h1 className="hero-title anim-title">PRAKHAR</h1>
        <div className="hero-subtitle-container">
          <p className="hero-subtitle anim-subtitle-left">VIDEO</p>
          <p className="hero-subtitle anim-subtitle-right">EDITOR</p>
        </div>
      </header>

      {/* 
        Layer 2: The Hero Image 
      */}
      <div className="hero-image-layer">
        <img
          src="/hero.png"
          alt="Prakhar"
          className="hero-image anim-image"
        />
        {/* Overlay removed */}
      </div>

      {/* 
        Layer 3: Foreground Content (Overlay)
      */}
      <div className="hero-content-layer">
        <div className="hero-container">
          <div className="hero-grid">
            {/* Left Column: Intro & CTA */}
            <div className="hero-intro">
              <PausableAnimation className="status-badge anim-intro-item">
                <span className="status-dot-container">
                  <span className="status-ping"></span>
                  <span className="status-dot"></span>
                </span>
                <span className="status-text">Open for freelance works</span>
              </PausableAnimation>

              <p className="hero-description anim-intro-item">
                Hey there! I'm a Video Editor working in the global marketplace.
                I create visual stories that engage and inspire.
              </p>

              <div className="anim-intro-item">
                <MarqueeButton />
              </div>
            </div>

            {/* Spacer */}
            <div className="hero-spacer"></div>

            {/* Right Column: Stats */}
            <div className="hero-stats anim-stats">
              <div className="stat-label">Years of Experience</div>
              <div className="stat-value">02+</div>
            </div>
          </div>

          {/* Bottom Logo Strip */}
          <div className="hero-logos anim-logos">
            <div className="logo-item">
              <Scissors className="logo-icon-svg" />{" "}
              <span className="logo-text-brand">CapCut</span>
            </div>
            <div className="logo-item">
              <Aperture className="logo-icon-svg" />{" "}
              <span className="logo-text-brand">Davinci Resolve</span>
            </div>
            <div className="logo-item">
              <Box className="logo-icon-svg" />{" "}
              <span className="logo-text-brand">Blender</span>
            </div>
            <div className="logo-item text-white">
              <Layers className="logo-icon-svg" />{" "}
              <span className="logo-text-brand">After Effects</span>
            </div>
            <div className="logo-item">
              <Film className="logo-icon-svg" />{" "}
              <span className="logo-text-brand">Premiere Pro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
