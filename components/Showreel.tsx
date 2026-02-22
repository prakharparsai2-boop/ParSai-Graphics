import React, { useRef, useState, useEffect } from "react";
import Player from "@vimeo/player";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Showreel.css";

const VIDEOS = [
  {
    id: "1165342236",
    title: "Your Brand Presence Matters",
    subtitle: "Our work in motion",
    desc: "We help brands build a strong digital presence through clean visuals, sharp edits, and motion that grabs attention. This video shows what we do in motion.",
  },
  {
    id: "1158807299", // Replaced invalid ID with a working one
    title: "loreum upsum",
    subtitle: "loreum ipsum jipsum ipsum tipsum",
    desc: "High-impact commercial edits focused on conversion, retention, and brand storytelling for global clients.",
  },
];

const Showreel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentVideo = VIDEOS[currentVideoIndex];

  // Initialize Player
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = ""; // Clear previous

    const player = new Player(containerRef.current, {
      id: parseInt(currentVideo.id),
      controls: false,
      responsive: true,
      title: false,
      byline: false,
      portrait: false,
      dnt: true,
      muted: false,
    });

    playerRef.current = player;

    // Listen for events
    player.on("loaded", async () => {
      const d = await player.getDuration();
      setDuration(d);
      const v = await player.getVolume();
      const m = await player.getMuted();
      setIsMuted(m || v === 0);
    });

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("timeupdate", (data) => {
      setCurrentTime(data.seconds);
      if (data.duration && data.duration !== duration) {
        setDuration(data.duration);
      }
    });

    player.on("volumechange", (data) => {
      setIsMuted(data.muted || data.volume === 0);
    });

    player.on("ended", () => {
      setIsPlaying(false);
      handleNextVideo();
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
      }
    };
  }, [currentVideoIndex]);

  // Controls Handlers
  const togglePlay = () => {
    if (!playerRef.current) return;
    playerRef.current.getPaused().then((paused) => {
      if (paused) {
        playerRef.current?.play().catch(() => {});
      } else {
        playerRef.current?.pause().catch(() => {});
      }
    });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    playerRef.current.setCurrentTime(newTime);
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    playerRef.current.getMuted().then((muted) => {
      playerRef.current?.setMuted(!muted);
      setIsMuted(!muted);
    });
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;

    if (!document.fullscreenElement) {
      videoWrapperRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`,
          );
        });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Listen for fullscreen change via Esc key
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Helper for formatting time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Custom Controls Component
  const Controls = ({ isMobile = false }) => (
    <div
      className={`custom-controls ${isMobile ? "mobile-mode" : "desktop-mode"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Navigation Buttons */}
      <div className="controls-nav-group">
        <button
          className="control-btn nav-btn"
          onClick={handlePrevVideo}
          aria-label="Previous"
        >
          <ChevronLeft size={isMobile ? 18 : 20} />
        </button>
        <button
          className="control-btn play-pause-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={isMobile ? 20 : 24} fill="currentColor" />
          ) : (
            <Play size={isMobile ? 20 : 24} fill="currentColor" />
          )}
        </button>
        <button
          className="control-btn nav-btn"
          onClick={handleNextVideo}
          aria-label="Next"
        >
          <ChevronRight size={isMobile ? 18 : 20} />
        </button>
      </div>

      <div className="time-display">
        <span>{formatTime(currentTime)}</span> /{" "}
        <span>{formatTime(duration)}</span>
      </div>

      <div className="progress-bar-container" onClick={handleSeek}>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="controls-right-group">
        <button
          className="control-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX size={isMobile ? 18 : 20} />
          ) : (
            <Volume2 size={isMobile ? 18 : 20} />
          )}
        </button>

        <button
          className="control-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize size={isMobile ? 18 : 20} />
          ) : (
            <Maximize size={isMobile ? 18 : 20} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <section className="showreel-section">
      <div className="container showreel-container relative-z">
        <div className="showreel-content">
          {/* Video Player Area */}
          <div
            ref={videoWrapperRef}
            className="video-wrapper"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Vimeo Iframe Container */}
            <div ref={containerRef} className="vimeo-embed-container"></div>

            {/* Click to play/pause overlay */}
            <div className="video-click-surface" onClick={togglePlay}></div>

            {/* Desktop Hover Controls */}
            <div
              className={`desktop-overlay ${isHovering || !isPlaying ? "visible" : ""}`}
            >
              {/* Center Play Button (Only shows when paused) */}
              {!isPlaying && (
                <div className="center-play-button" onClick={togglePlay}>
                  <Play size={40} fill="currentColor" className="ml-1" />
                </div>
              )}

              {/* Bottom Control Bar */}
              <div className="desktop-controls-bar">
                <Controls isMobile={false} />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Controls (Visible below video) */}
          <div className="mobile-controls-wrapper">
            <Controls isMobile={true} />
          </div>

          {/* Bottom Info */}
          <div className="showreel-bottom-bar">
            <div className="showreel-info-left">
              <div className="title-nav-row">
                <h2 className="showreel-title">{currentVideo.title}</h2>
                <span className="video-count-badge">
                  {currentVideoIndex + 1} / {VIDEOS.length}
                </span>
              </div>

              <span className="showreel-subtitle">{currentVideo.subtitle}</span>
            </div>

            <div className="showreel-info-right">
              <p className="showreel-description">{currentVideo.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showreel;
