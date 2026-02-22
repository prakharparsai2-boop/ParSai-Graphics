import React from "react";
import PausableAnimation from "./PausableAnimation";
import "./MarqueeButton.css";

const MarqueeButton: React.FC = () => {
  return (
    <button className="cta-primary marquee-btn">
      <PausableAnimation className="marquee-track">
        {/* Using &nbsp; to ensure consistent spacing without CSS padding causing gaps */}
        <span className="marquee-text">
          Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp; Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp; Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp; Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp;
        </span>
        <span className="marquee-text">
          Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp; Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp; Hire Me &nbsp;
          <img src="arrow.gif" alt="arrow" width={20} height={20} />
          &nbsp;
        </span>
      </PausableAnimation>
    </button>
  );
};

export default MarqueeButton;
