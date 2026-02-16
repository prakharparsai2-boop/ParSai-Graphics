import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  Briefcase,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import Player from "@vimeo/player";
import { projects } from "../data/projects";
import WebsiteBackgroundWrapper from "../components/WebsiteBackgroundWrapper";
import Contact from "../components/Contact";
import "./ProjectDetail.css";

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  // Player State
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Initialize Vimeo Player
  useEffect(() => {
    if (!project || !containerRef.current || !project.vimeoId) return;

    // Reset previous player if any
    if (playerRef.current) {
      playerRef.current.destroy().catch(() => {});
      playerRef.current = null;
    }

    containerRef.current.innerHTML = "";

    const player = new Player(containerRef.current, {
      id: parseInt(project.vimeoId),
      controls: false,
      responsive: true,
      title: false,
      byline: false,
      portrait: false,
      dnt: true,
      muted: false,
      autoplay: false,
    });

    playerRef.current = player;

    // Listen for events
    player.on("loaded", async () => {
      const d = await player.getDuration();
      setDuration(d);
      const m = await player.getMuted();
      const v = await player.getVolume();
      setIsMuted(m || v === 0);
    });

    player.on("play", () => setIsPlaying(true));
    player.on("playing", () => setIsPlaying(true));
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
      setCurrentTime(0);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
      }
    };
  }, [project]);

  // Listen for fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  if (!project) {
    return (
      <WebsiteBackgroundWrapper>
        <div className="project-not-found-container">
          <div className="container">
            <h2>Project not found</h2>
            <Link to="/work" className="back-link">
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </WebsiteBackgroundWrapper>
    );
  }

  // Controls Logic
  const togglePlay = () => {
    if (!playerRef.current) return;
    playerRef.current.getPaused().then((paused) => {
      if (paused) {
        playerRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        playerRef.current
          ?.pause()
          .then(() => setIsPlaying(false))
          .catch(() => setIsPlaying(true));
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isVertical = project.aspectRatio === "9:16";

  // Custom Controls Component (Scoped for this page)
  const ProjectControls = ({ isMobile = false }) => (
    <div
      className={`project-custom-controls ${isMobile ? "mobile-mode" : "desktop-mode"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Play/Pause */}
      <button
        className="p-control-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={isMobile ? 20 : 24} fill="currentColor" />
        ) : (
          <Play size={isMobile ? 20 : 24} fill="currentColor" />
        )}
      </button>

      <div className="p-time-display">
        <span>{formatTime(currentTime)}</span> /{" "}
        <span>{formatTime(duration)}</span>
      </div>

      {/* Seek Bar */}
      <div className="p-progress-bar-container" onClick={handleSeek}>
        <div className="p-progress-track">
          <div
            className="p-progress-fill"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="p-controls-right">
        <button
          className="p-control-btn"
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
          className="p-control-btn"
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
    <WebsiteBackgroundWrapper>
      <div className="project-detail-page">
        <div className="container">
          {/* Nav */}
          <Link to="/work" className="back-nav">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          {/* Header */}
          <header className="project-header">
            <div className="header-content">
              <span className="project-category-badge">{project.category}</span>
              <h1 className="project-title-main">{project.title}</h1>
              <div className="project-meta-row">
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{project.year}</span>
                </div>
                {project.client && (
                  <div className="meta-item">
                    <Briefcase size={16} />
                    <span>{project.client}</span>
                  </div>
                )}
                {project.role && (
                  <div className="meta-item">
                    <User size={16} />
                    <span>{project.role}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Layout Grid */}
          <div
            className={`project-content-grid ${isVertical ? "with-vertical-video" : ""}`}
          >
            {/* Custom Video Player */}
            <div
              className={`video-container-wrapper ${isVertical ? "vertical-mode" : ""}`}
            >
              <div
                ref={videoWrapperRef}
                className={`project-video-player-container aspect-${project.aspectRatio.replace(":", "-")}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Fallback to legacy video if no vimeoId */}
                {project.vimeoId ? (
                  <>
                    <div
                      ref={containerRef}
                      className="project-vimeo-embed"
                    ></div>
                    <div
                      className="project-video-click-surface"
                      onClick={togglePlay}
                    ></div>

                    {/* Desktop Overlay */}
                    <div
                      className={`project-desktop-overlay ${isHovering || !isPlaying ? "visible" : ""}`}
                    >
                      {!isPlaying && (
                        <div
                          className="project-center-play"
                          onClick={togglePlay}
                        >
                          <Play
                            size={40}
                            fill="currentColor"
                            className="ml-1"
                          />
                        </div>
                      )}
                      <div className="project-controls-bar">
                        <ProjectControls isMobile={false} />
                      </div>
                    </div>
                  </>
                ) : (
                  <video
                    src={project.videoUrl}
                    controls
                    poster={project.image}
                    className="project-video-legacy"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Mobile Controls (External) */}
              {project.vimeoId && (
                <div className="project-mobile-controls">
                  <ProjectControls isMobile={true} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="project-info-section">
              <div className="info-grid">
                <div className="info-main">
                  <h3 className="info-label">About the Project</h3>
                  <p className="info-description">{project.description}</p>
                </div>
                <div className="info-sidebar">
                  <h3 className="info-label">Tools Used</h3>
                  <div className="tools-list">
                    <span className="tool-tag">Premiere Pro</span>
                    <span className="tool-tag">After Effects</span>
                    <span className="tool-tag">DaVinci Resolve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-contact-wrapper">
            <Contact />
          </div>
        </div>
      </div>
    </WebsiteBackgroundWrapper>
  );
};

export default ProjectDetail;
