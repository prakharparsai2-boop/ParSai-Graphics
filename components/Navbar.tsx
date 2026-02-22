import React, { useState, useEffect } from "react";
import { Menu, X, Home, User, Zap, Briefcase, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation for both routing and anchor scrolling
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const elementId = href.substring(1);

      if (location.pathname !== "/") {
        // If not on home, go home then scroll
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // If on home, just scroll
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Regular route
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "About", href: "/about", icon: <User size={20} /> },
    { name: "Services", href: "/services", icon: <Zap size={20} /> },
    { name: "My Work", href: "/work", icon: <Briefcase size={20} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={20} /> },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo anim-nav-logo">
            <div className="logo-icon">
              <span className="logo-text">P</span>
            </div>
            <span className="logo-name">Prakhar Parsai</span>
          </Link>

          {/* Desktop Links (Visible on Laptop+) */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link anim-nav-link"
                onClick={(e) => handleNavigation(e, link.href)}
                aria-label={`Go to ${link.name}`}
              >
                <span className="nav-link-text">{link.name}</span>
                <span className="nav-link-bg"></span>
              </a>
            ))}
          </div>


          {/* CTA Button (Visible on Laptop+) */}
          <div className="nav-cta anim-nav-cta">
            <a
              href="/contact"
              className="cta-button"
              onClick={(e) => handleNavigation(e, "/contact")}
            >
              <span className="cta-text">Connect on</span>
              <img
                src="https://img.icons8.com/material-outlined/48/whatsapp--v1.png"
                alt="WhatsApp"
                className="whatsapp-icon"
              />
            </a>
          </div>

          {/* Mobile/Tablet Toggle */}
          <button
            className="mobile-toggle anim-nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Slider Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}>
        {/* Backdrop */}
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Glassy Slider */}
        <div className="mobile-menu-slider">
          {/* Slider Header */}
          <div className="mobile-menu-header">
            <Link
              to="/"
              className="logo"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="logo-icon">
                <span className="logo-text">P</span>
              </div>
              <span className="logo-name">Prakhar</span>
            </Link>
            <button
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links with Icons */}
          <div className="mobile-links-container">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-link-item"
                onClick={(e) => handleNavigation(e, link.href)}
                aria-label={`Go to ${link.name}`}
              >
                <span className="mobile-link-icon">{link.icon}</span>
                <span className="mobile-link-text">{link.name}</span>
              </a>
            ))}
          </div>


          {/* Bottom CTA */}
          <div className="mobile-menu-footer">
            <a
              href="/contact"
              className="mobile-cta-btn"
              onClick={(e) => handleNavigation(e, "/contact")}
            >
              <img
                src="https://img.icons8.com/material-outlined/48/000000/whatsapp--v1.png"
                alt="WhatsApp"
                className="whatsapp-icon-mobile"
              />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
