import React from 'react';
import { Check, ArrowRight, Sparkles, Star } from 'lucide-react';
import './Pricing.css';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-header">
          <h2 className="section-label">Pricing</h2>
          <h3 className="section-title">Select Your Plan</h3>
          <p className="pricing-subtitle">
            Transparent pricing for creators who want to scale.
          </p>
        </div>

        <div className="pricing-grid">
          {/* --- Short Form (Reels / Shorts) --- */}
          <div className="pricing-card">
            <div className="plan-header">
              <h4 className="plan-name">Short Form (Reels / Shorts)</h4>
              <p className="plan-desc">Per-minute pricing (category-based)</p>

              <div className="pricing-tiers">
                <div className="tier-row">
                  <span>Basic Reel</span>
                  <span className="tier-price">₹799</span>
                </div>
                <div className="tier-row">
                  <span>Advanced Reel</span>
                  <span className="tier-price">₹1,199</span>
                </div>
                <div className="tier-row">
                  <span>Motion Graphics Reel</span>
                  <span className="tier-price">₹2,499</span>
                </div>
              </div>

              <button className="plan-btn mt-auto">
                <span>Book a Call</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="plan-features">
              <span className="features-label">Includes (all):</span>
              <ul className="feature-list mb-6">
                <li><Star size={12} className="feature-icon" /> 2 revisions</li>
                <li><Star size={12} className="feature-icon" /> Basic color + audio / SFX</li>
                <li><Star size={12} className="feature-icon" /> 24–48h delivery</li>
                <li><Star size={12} className="feature-icon" /> WhatsApp support</li>
              </ul>

              <span className="features-label">Motion Graphics / Advanced Includes:</span>
              <ul className="feature-list">
                <li><Star size={12} className="feature-icon" /> Motion graphics + animated text</li>
                <li><Star size={12} className="feature-icon" /> Transitions + stock footage</li>
                <li><Star size={12} className="feature-icon" /> SFX, sound design & mixing</li>
                <li><Star size={12} className="feature-icon" /> Subtitles</li>
                <li><Star size={12} className="feature-icon" /> 2-day delivery</li>
                <li><Star size={12} className="feature-icon" /> 3 revisions</li>
              </ul>
            </div>
          </div>

          {/* --- Long Form Videos (Pro Plan) --- */}
          <div className="pricing-card popular">
            <div className="popular-badge">Popular</div>
            <div className="plan-header">
              <h4 className="plan-name">Long Form Videos</h4>
              <p className="plan-desc">Per-minute pricing (category-based)</p>

              <div className="pricing-tiers">
                <div className="tier-row">
                  <span>Basic Edit</span>
                  <span className="tier-price">₹600 / min</span>
                </div>
                <div className="tier-row">
                  <span>Pro Edit + SFX</span>
                  <span className="tier-price">₹900 / min</span>
                </div>
                <div className="tier-row">
                  <span>Advanced Edit + SFX</span>
                  <span className="tier-price">₹1,400 / min</span>
                </div>
              </div>

              <button className="plan-btn mt-auto">
                <span>Book a Call</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="plan-features">
              <span className="features-label">Includes (all):</span>
              <ul className="feature-list mb-6">
                <li><Star size={12} className="feature-icon text-accent" /> 2 revisions</li>
                <li><Star size={12} className="feature-icon text-accent" /> Basic color + audio / SFX</li>
                <li><Star size={12} className="feature-icon text-accent" /> 24–48h delivery</li>
                <li><Star size={12} className="feature-icon text-accent" /> WhatsApp support</li>
              </ul>

              <span className="features-label">Advanced / Motion Graphics Includes:</span>
              <ul className="feature-list">
                <li><Star size={12} className="feature-icon text-accent" /> Motion graphics + animated text</li>
                <li><Star size={12} className="feature-icon text-accent" /> Transitions + stock footage</li>
                <li><Star size={12} className="feature-icon text-accent" /> Sound design & mixing</li>
                <li><Star size={12} className="feature-icon text-accent" /> Subtitles</li>
                <li><Star size={12} className="feature-icon text-accent" /> Timeline-based delivery</li>
                <li><Star size={12} className="feature-icon text-accent" /> 3 revisions</li>
              </ul>
            </div>
          </div>

          {/* --- Bundles (Custom Plan) --- */}
          <div className="pricing-card custom-plan">
            <div className="custom-content">
              <div className="custom-left">
                <h4 className="plan-name text-white">Bundles</h4>
                <div className="plan-price">
                  <span className="amount" style={{ fontSize: '2.5rem' }}>Custom</span>
                </div>
                <p className="pricing-subtitle-custom">
                  pricing based on creator needs & volume.
                </p>
                <p className="plan-desc">Tailored for creators & brands with high-volume or advanced needs.</p>

                <button className="plan-btn btn-accent">
                  <span>Book a Call</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="custom-right">
                <span className="features-label">Includes:</span>
                <div className="custom-features-grid">
                  <ul className="feature-list">
                    <li><Sparkles size={12} className="feature-icon" /> Choose from 10–40+ video edits / month</li>
                    <li><Sparkles size={12} className="feature-icon" /> 24h / 48h delivery options</li>
                    <li><Sparkles size={12} className="feature-icon" /> Shorts, reels, long-form, podcasts</li>
                    <li><Sparkles size={12} className="feature-icon" /> Motion graphics & advanced edits</li>
                  </ul>
                  <ul className="feature-list">
                    <li><Sparkles size={12} className="feature-icon" /> Multi-platform exports</li>
                    <li><Sparkles size={12} className="feature-icon" /> Title, thumbnail & retention tips</li>
                    <li><Sparkles size={12} className="feature-icon" /> Dedicated social media manager</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;