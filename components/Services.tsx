import React from "react";
import { Clapperboard, Wand2, Palette, Box } from "lucide-react";
import "./Services.css";

const services = [
  {
    title: "Video Editing",
    description:
      "Expert storytelling through pacing, cuts, and narrative structure for commercials, documentaries, and social content.",
    icon: <Clapperboard className="service-icon text-yellow" />,
  },
  {
    title: "Motion Graphics",
    description:
      "Dynamic 2D/3D animations, kinetic typography, and visual effects that add polish and engagement to your videos.",
    icon: <Wand2 className="service-icon text-purple" />,
  },
  {
    title: "Color Grading",
    description:
      "Cinematic color correction and grading to establish mood, style, and visual consistency across all footage.",
    icon: <Palette className="service-icon text-blue" />,
  },
  {
    title: "3D Animation",
    description:
      "3D modeling, texturing, animation, and rendering for product showcases, immersive environments, and visualizations.",
    icon: <Box className="service-icon text-green" />,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="services-section">
      <div className="container services-container">
        <div className="services-header">
          <div className="services-header-left">
            <h2 className="section-label">What We Do</h2>
            <h3 className="section-title">
              Crafting visual narratives that captivate audiences.
            </h3>
          </div>
          <div className="services-header-right">
            We combine technical precision with creative storytelling to deliver
            high-impact video content that drives engagement and results.
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-wrapper">{service.icon}</div>
              <h4 className="service-title">{service.title}</h4>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
