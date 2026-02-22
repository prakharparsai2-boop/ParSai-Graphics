import React from 'react';
import {
  UploadCloud,
  Wand2,
  FileVideo,
  Scissors,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  Youtube,
  Instagram,
  Music,
  Image as ImageIcon,
  Link as LinkIcon,
  ThumbsUp,
  Send
} from 'lucide-react';
import PausableAnimation from './PausableAnimation';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <section className="process-section">
      <div className="container">
        <div className="process-header">
          <div>
            <h2 className="section-label">The Process</h2>
            <h3 className="section-title">How It Works</h3>
          </div>
          <p className="process-description">
            Streamlined workflow designed for speed and quality. From raw footage to viral content in four simple steps.
          </p>
        </div>

        <div className="process-grid">
          {/* Step 01: Ingest */}
          <PausableAnimation className="process-card">
            <div className="card-number">01</div>
            {/* ... */}
            <div className="card-visual">
              <div className="ingest-hub">
                {/* ... content ... */}
                <div className="hub-center">
                  <UploadCloud className="hub-icon" />
                  <div className="hub-pulse"></div>
                </div>

                {/* Orbiting Sources */}
                <div className="source-node node-1">
                  <div className="node-icon"><LinkIcon size={14} /></div>
                  <div className="node-label">Link</div>
                  <div className="particle p-1"></div>
                </div>
                <div className="source-node node-2">
                  <div className="node-icon">GD</div>
                  <div className="node-label">Drive</div>
                  <div className="particle p-2"></div>
                </div>
                <div className="source-node node-3">
                  <div className="node-icon">DB</div>
                  <div className="node-label">Dropbox</div>
                  <div className="particle p-3"></div>
                </div>

                {/* Connecting Lines */}
                <svg className="hub-lines">
                  <line x1="50%" y1="50%" x2="20%" y2="20%" className="line-path" />
                  <line x1="50%" y1="50%" x2="80%" y2="25%" className="line-path" />
                  <line x1="50%" y1="50%" x2="50%" y2="85%" className="line-path" />
                </svg>
              </div>
            </div>
            <div className="card-content">
              <h4 className="card-title">Drop Your Footage</h4>
              <p className="card-text">
                Upload your raw clips via WeTransfer, Google Drive, or Dropbox. Just send the link, and we're ready to roll.
              </p>
            </div>
          </PausableAnimation>

          {/* Step 02: Editing */}
          <PausableAnimation className="process-card">
            <div className="card-number">02</div>
            <div className="card-visual">
              <div className="timeline-ui">
                <div className="timeline-header">
                  <div className="time-code">00:00:12:04</div>
                  <div className="tool-icons">
                    <Scissors size={12} />
                    <Wand2 size={12} />
                  </div>
                </div>
                <div className="track-container">
                  {/* Video Track */}
                  <div className="track track-video">
                    <div className="track-label"><ImageIcon size={10} /></div>
                    <div className="clip clip-v1"></div>
                    <div className="clip clip-v2"></div>
                  </div>
                  {/* Audio Track */}
                  <div className="track track-audio">
                    <div className="track-label"><Music size={10} /></div>
                    <div className="clip clip-a1"></div>
                    <div className="waveform"></div>
                  </div>
                  {/* Effects Track */}
                  <div className="track track-fx">
                    <div className="track-label">FX</div>
                    <div className="clip clip-fx1"></div>
                  </div>

                  {/* Playhead */}
                  <div className="playhead">
                    <div className="playhead-line"></div>
                    <div className="playhead-head"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-content">
              <h4 className="card-title">We Do Our Magic</h4>
              <p className="card-text">
                We cut, trim, color-grade, and add engaging transitions and sound effects to create a polished narrative.
              </p>
            </div>
          </PausableAnimation>

          {/* Step 03: Revision */}
          <PausableAnimation className="process-card">
            <div className="card-number">03</div>
            <div className="card-visual">
              <div className="feedback-ui">
                <div className="chat-interface">
                  <div className="chat-header">
                    <div className="chat-header-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span className="chat-header-title">Project Chat</span>
                  </div>
                  <div className="chat-messages">
                    {/* Message 1: Client Request */}
                    <div className="chat-row left msg-1">
                      <div className="chat-avatar client-avatar">C</div>
                      <div className="chat-bubble">
                        Make the intro faster?
                      </div>
                    </div>

                    {/* Message 2: Editor Response */}
                    <div className="chat-row right msg-2">
                      <div className="chat-bubble primary">
                        On it! Check v2 ⚡️
                      </div>
                      <div className="chat-avatar editor-avatar">Me</div>
                    </div>

                    {/* Message 3: Client Approval */}
                    <div className="chat-row left msg-3">
                      <div className="chat-avatar client-avatar">C</div>
                      <div className="chat-bubble success">
                        I am satisfied! Approved.
                      </div>
                    </div>
                  </div>
                  <div className="chat-input-area">
                    <div className="fake-input"></div>
                    <Send size={12} className="input-icon" />
                  </div>
                </div>

                {/* Floating Status Badge */}
                <div className="approval-stamp">
                  <CheckCircle2 size={16} className="stamp-icon" />
                  <span className="stamp-text">APPROVED</span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <h4 className="card-title">Feedback? Easy</h4>
              <p className="card-text">
                Want something changed? We offer smooth revision rounds to make sure everything fits your vision perfectly.
              </p>
            </div>
          </PausableAnimation>

          {/* Step 04: Growth */}
          <PausableAnimation className="process-card">
            <div className="card-number">04</div>
            <div className="card-visual">
              <div className="growth-ui">
                <div className="chart-container">
                  <div className="chart-grid"></div>
                  <svg className="chart-line-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M0,50 Q20,45 40,25 T100,5" className="chart-path" />
                    <path d="M0,50 Q20,45 40,25 T100,5 V50 H0 Z" className="chart-area" />
                  </svg>
                  <div className="chart-tooltip">
                    <span className="views-label">1.2M Views</span>
                  </div>
                </div>

                <div className="platform-dock">
                  <div className="platform-icon youtube">
                    <Youtube size={16} />
                  </div>
                  <div className="platform-icon instagram">
                    <Instagram size={16} />
                  </div>
                  <div className="platform-icon tiktok">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                  </div>
                </div>

                <div className="final-file">
                  <FileVideo size={14} />
                  <span>Final_v2.mp4</span>
                </div>
              </div>
            </div>
            <div className="card-content">
              <h4 className="card-title">Upload & Grow</h4>
              <p className="card-text">
                We deliver your final video in optimized formats. Ready to upload, engage your audience, and grow your channel.
              </p>
            </div>
          </PausableAnimation>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;