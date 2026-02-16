import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import WebsiteBackgroundWrapper from "../components/WebsiteBackgroundWrapper";
import Contact from "../components/Contact";
import { projects } from "../data/projects";
import "../components/Work.css"; // Reusing card styles
import "./MyWork.css";

const MyWork: React.FC = () => {
  return (
    <WebsiteBackgroundWrapper>
      <div className="my-work-page">
        {/* Header */}
        <div className="container">
          <div className="my-work-header">
            <h1 className="my-work-title anim-work-title delay-100">
              Featured <span className="text-accent">Projects</span>
            </h1>
            <p className="my-work-subtitle anim-work-fade delay-200">
              A curated selection of commercial projects, documentaries, music
              videos, and creative experiments designed to leave a mark.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="container">
          <div className="work-grid">
            {projects.map((project) => (
              <Link
                to={`/work/${project.slug}`}
                key={project.id}
                className="project-card group-link anim-work-fade"
              >
                <div className="project-card-inner group">
                  {/* Image Container */}
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />

                    {/* Hover Overlay with Play Button */}
                    <div className="project-image-overlay">
                      <div className="play-circle">
                        <Play className="icon-play" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="project-content">
                    <div className="project-row-top">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-arrow-btn">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <div className="project-row-bottom">
                      <span className="project-category">
                        {project.category}
                      </span>
                      <span className="project-dot">•</span>
                      <span className="project-year">{project.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="my-work-contact-wrapper anim-work-fade">
          <Contact />
        </div>
      </div>
    </WebsiteBackgroundWrapper>
  );
};

export default MyWork;
