import React from "react";
import WebsiteBackgroundWrapper from "../components/WebsiteBackgroundWrapper";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import "./Services.css";

const ServicesPage: React.FC = () => {
  return (
    <WebsiteBackgroundWrapper>
      <div className="services-page">
        {/* Page Hero Header */}
        <div className="container services-page-header">
          <h1 className="services-main-title anim-services-title delay-100">
            Expert <span className="text-accent">Solutions</span>
          </h1>
          <p className="services-main-subtitle anim-services-fade delay-200">
            From concept to final cut, we provide end-to-end video production
            services designed to elevate your brand and engage your audience.
          </p>
        </div>

        {/* Components */}
        <div className="anim-services-fade delay-300">
          <Services />
        </div>

        <div className="anim-services-fade delay-300">
          <HowItWorks />
        </div>

        <div className="anim-services-fade delay-300">
          <Pricing />
        </div>

        <div className="services-contact-wrapper anim-services-fade delay-300">
          <Contact />
        </div>
      </div>
    </WebsiteBackgroundWrapper>
  );
};

export default ServicesPage;
