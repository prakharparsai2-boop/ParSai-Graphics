import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './Work.css';

const Work: React.FC = () => {
  // Show only first 4 projects on homepage
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="work" className="work-section">
      <div className="container">
        <div className="work-header">
          <div>
            <h2 className="section-label">Selected Work</h2>
            <h3 className="section-title">Featured Projects</h3>
          </div>
          <Link to="/work" className="view-all-btn desktop-only">
            View All Projects <ArrowUpRight className="btn-icon" />
          </Link>
        </div>

        <div className="work-grid">
          {featuredProjects.map((project) => (
            <Link to={`/work/${project.slug}`} key={project.id} className="project-card group-link">
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

                {/* Content Container (Below Image) */}
                <div className="project-content">
                   <div className="project-row-top">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-arrow-btn">
                         <ArrowUpRight size={20} />
                      </div>
                   </div>
                   <div className="project-row-bottom">
                      <span className="project-category">{project.category}</span>
                      <span className="project-dot">•</span>
                      <span className="project-year">{project.year}</span>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="work-footer-mobile">
          <Link to="/work" className="view-all-btn">
            View All Projects <ArrowUpRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;
