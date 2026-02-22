import React from "react";
import { Camera, Edit3, Heart, Award, ArrowRight } from "lucide-react";
import WebsiteBackgroundWrapper from "../components/WebsiteBackgroundWrapper";
import "./About.css";

const About: React.FC = () => {
  return (
    <WebsiteBackgroundWrapper>
      <div className="about-page">
        <div className="container">
          {/* Header Section - Cinematic Reveal */}
          <div className="about-header">
            <h1 className="about-title anim-title-reveal delay-100">
              More Than Just <br />
              <span className="text-accent">Cuts & Transitions</span>
            </h1>
            <p className="about-subtitle anim-fade-up delay-300">
              I'm Prakhar, a visual storyteller obsessed with rhythm, emotion,
              and the fine line between "watching" and "feeling."
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="about-grid">
            {/* Image Column - Elegant Rise */}
            <div className="about-image-col">
              <div className="profile-image-wrapper anim-image-enter delay-200">
                <img
                  src="/prakhar.jpg"
                  alt="Prakhar Workspace"
                  className="profile-image"
                />
                {/* Badge - Smooth Fade Up (No Pop) */}
                <div className="experience-badge anim-fade-up delay-500">
                  <span className="years">02+</span>
                  <span className="label">
                    Years of
                    <br />
                    Excellence
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content Column - Fade Up Stagger */}
            <div className="about-content-col">
              <section className="bio-section anim-fade-up delay-300">
                <h2 className="section-heading">The Backstory</h2>
                <p className="bio-text">
                  Hey, I’m Prakhar, a 24 year old editor from Bhopal.
                </p>

                <p className="bio-text">
                  I started with gaming, and editing quickly became my passion.
                  After growing a YouTube channel, I shifted fully into editing
                  and later joined WebMaak to work on real-world projects.
                  Today, I’m an all-round editor collaborating with creators and
                  brands worldwide, specializing in fast, energetic edits that
                  keep audiences engaged. I’ve delivered successful projects for
                  Johnson &amp; Johnson, VFS Global, via WebMaak, and other
                  major companies.
                </p>

                <p className="bio-text">
                  My goal is simple: cinematic visuals, real emotion, and edits
                  that reflect hard work. I’m raw, minimal, and introverted but
                  I always deliver the best edit for my clients.
                </p>
              </section>


              {/* Philosophy Grid - Fade Up Stagger (defined in CSS) */}
              <div className="philosophy-grid">
                <article className="philosophy-card anim-fade-up">
                  <Heart className="philo-icon text-red" aria-hidden="true" />
                  <h3>Emotion First</h3>
                  <p>
                    Tech specs matter, but feeling matters more. I edit for the
                    gut punch.
                  </p>
                </article>
                <article className="philosophy-card anim-fade-up">
                  <Edit3 className="philo-icon text-blue" aria-hidden="true" />
                  <h3>Story Driven</h3>
                  <p>
                    Visuals should serve the narrative, not distract from it.
                  </p>
                </article>
                <article className="philosophy-card anim-fade-up">
                  <Camera className="philo-icon text-yellow" aria-hidden="true" />
                  <h3>Visual Rhythm</h3>
                  <p>
                    Pacing is the heartbeat of video. I make sure it never
                    skips.
                  </p>
                </article>
                <article className="philosophy-card anim-fade-up">
                  <Award className="philo-icon text-purple" aria-hidden="true" />
                  <h3>Retention King</h3>
                  <p>
                    Optimized for the algorithm, designed for the human mind.
                  </p>
                </article>
              </div>

            </div>
          </div>

          {/* Stats / Fun Fact Strip - Fade Up */}
          <div className="stats-strip">
            <div className="stat-item anim-fade-up">
              <span className="stat-num">500+</span>
              <span className="stat-lbl">Videos Edited</span>
            </div>
            <div className="stat-item anim-fade-up">
              <span className="stat-num">2M+</span>
              <span className="stat-lbl">Views Generated</span>
            </div>
            <div className="stat-item anim-fade-up">
              <span className="stat-num">24/6</span>
              <span className="stat-lbl">Obsession Mode</span>
            </div>
          </div>
          <div className="about-cta anim-fade-up delay-600">
            <div className="about-cta-inner">
              <a
                href="https://wa.me/919926490283?text=Hello%20I%20would%20like%20to%20connect"
                className="cta-button-main about"
              >
                <span>Let's Create Together</span>
                <div className="cta-btn-icon">
                  <ArrowRight size={20} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </WebsiteBackgroundWrapper>
  );
};

export default About;
