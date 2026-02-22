import React from "react";
import { Linkedin, Instagram, Youtube, Mail, ArrowUp } from "lucide-react";
import PausableAnimation from "./PausableAnimation";
import "./Footer.css";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer-section">
      <div className="footer-inner">
        {/* Top Section: Socials & Scroll Trigger */}
        <div className="footer-top">
          <div className="footer-socials-wrapper">
            <span className="footer-label">Connect</span>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/prakhar-parsai-a87268328/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/prakhar_parsai7/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@ParSai6244"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="mailto:workwithparsai@gmail.com"
                className="social-btn"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://wa.me/+919926490283"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="WhatsApp"
              >
                <img
                  src="https://img.icons8.com/material-outlined/48/000000/whatsapp--v1.png"
                  alt="WhatsApp"
                  className="footer-wa-icon"
                />
              </a>
            </div>
          </div>

          <PausableAnimation
            tag="button"
            className="scroll-top-trigger"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <span className="scroll-label">Back to Top</span>
            <div className="scroll-circle">
              <ArrowUp size={24} className="arrow-icon" />
            </div>
          </PausableAnimation>
        </div>

        {/* Middle Section: Giant Typography */}
        <div className="footer-main">
          <h1 className="giant-name">PRAKHAR</h1>
        </div>

        {/* Bottom Section: Developer Branding (Left) & Copyright (Right) */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="developer-badge">
              <span className="dev-text">
                Portfolio Website Developed by{" "}
                <span className="text-white">Kunal Paraye</span>
              </span>
              <div className="dev-actions">
                <a
                  href="https://wa.me/918959690529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-contact-link"
                  aria-label="WhatsApp"
                >
                  <img
                    src="https://img.icons8.com/material-outlined/48/000000/whatsapp--v1.png"
                    alt="WhatsApp"
                    className="dev-wa-icon"
                  />
                  <span>+91 89596 90529</span>
                </a>
                <a
                  href="mailto:draftworks000@gmail.com"
                  className="dev-contact-link"
                  aria-label="Email"
                >
                  <Mail size={14} />
                  <span>draftworks000@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-right">
            <p className="copyright">
              © 2026 Prakhar Parsai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
