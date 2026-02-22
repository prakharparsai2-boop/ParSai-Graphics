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

// Custom Controls Component
interface ProjectControlsProps {
  isMobile?: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  isFullscreen: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  handleSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (seconds: number) => string;
}

const ProjectControls: React.FC<ProjectControlsProps> = ({
  isMobile = false,
  isPlaying,
  currentTime,
  duration,
  isMuted,
  isFullscreen,
  togglePlay,
  toggleMute,
  toggleFullscreen,
  handleSeek,
  formatTime,
}) => (
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
      playerRef.current.destroy().catch(() => { });
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
      try {
        const d = await player.getDuration();
        if (d > 0) {
          setDuration(d);
        } else {
          // Fallback: poll for duration if initially 0 (common for 16:9 on first load)
          const checkDuration = setInterval(async () => {
            const currentD = await player.getDuration();
            if (currentD > 0) {
              setDuration(currentD);
              clearInterval(checkDuration);
            }
          }, 500);
          setTimeout(() => clearInterval(checkDuration), 5000); // 5s timeout
        }
      } catch (err) {
        console.error("Vimeo Error:", err);
      }
      const m = await player.getMuted();
      const v = await player.getVolume();
      setIsMuted(m || v === 0);
    });

    player.on("play", () => setIsPlaying(true));
    player.on("playing", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("timeupdate", (data) => {
      setCurrentTime(data.seconds);
      // Ensure duration is set if it was 0
      setDuration(prev => {
        if (data.duration && data.duration !== prev) return data.duration;
        return prev;
      });
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
        playerRef.current.destroy().catch(() => { });
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

                    {/* Thumbnail Overlay (Fades on play) */}
                    {!isPlaying && currentTime === 0 && (
                      <div className="project-video-thumbnail-overlay">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="video-thumb-img"
                        />
                        <div className="video-thumb-gradient"></div>
                      </div>
                    )}

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
                        <ProjectControls
                          isMobile={false}
                          isPlaying={isPlaying}
                          currentTime={currentTime}
                          duration={duration}
                          isMuted={isMuted}
                          isFullscreen={isFullscreen}
                          togglePlay={togglePlay}
                          toggleMute={toggleMute}
                          toggleFullscreen={toggleFullscreen}
                          handleSeek={handleSeek}
                          formatTime={formatTime}
                        />
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
                  <ProjectControls
                    isMobile={true}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    isMuted={isMuted}
                    isFullscreen={isFullscreen}
                    togglePlay={togglePlay}
                    toggleMute={toggleMute}
                    toggleFullscreen={toggleFullscreen}
                    handleSeek={handleSeek}
                    formatTime={formatTime}
                  />
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
                    {project.software.map((tool, index) => (
                      <span key={index} className="tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Horizontal Details Section */}
              <div className="project-details-horizontal">
                <h3 className="info-label">Project Details</h3>
                <div className="details-extra-row">
                  <div className="detail-item-small">
                    <span className="small-label">Category</span>
                    <span className="small-value">{project.category}</span>
                  </div>
                  <div className="detail-item-small">
                    <span className="small-label">Year</span>
                    <span className="small-value">{project.year}</span>
                  </div>
                  <div className="detail-item-small">
                    <span className="small-label">Role</span>
                    <span className="small-value">{project.role}</span>
                  </div>
                  <div className="detail-item-small">
                    <span className="small-label">Delivered As</span>
                    <span className="small-value">
                      {project.deliveredAs || "Freelance Project"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Detail Sections */}
              <div className="project-insights">
                <h3 className="insights-main-heading">Project Insights</h3>
                <div className="insights-grid">
                  <div className="insight-card anim-insight">
                    <h4 className="insight-title">The Challenge</h4>
                    <p className="insight-text">{project.challenge}</p>
                  </div>
                  <div className="insight-card anim-insight">
                    <h4 className="insight-title">Our Approach</h4>
                    <p className="insight-text">{project.approach}</p>
                  </div>
                  <div className="insight-card anim-insight">
                    <h4 className="insight-title">Impact & Results</h4>
                    <p className="insight-text">{project.results}</p>
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
