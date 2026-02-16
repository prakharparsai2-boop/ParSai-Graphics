import React from "react";
import Hero from "../components/Hero";
import Showreel from "../components/Showreel";
import Services from "../components/Services";
import Work from "../components/Work";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import WebsiteBackgroundWrapper from "../components/WebsiteBackgroundWrapper";
import HeroBackgroundWrapper from "../components/HeroBackgroundWrapper";

const Home: React.FC = () => {
  return (
    <>
      <HeroBackgroundWrapper>
        <Hero />
        <Showreel />
      </HeroBackgroundWrapper>
      <WebsiteBackgroundWrapper>
        <Services />
        <Work />
        <HowItWorks />
        <Pricing />
        <Contact />
      </WebsiteBackgroundWrapper>
    </>
  );
};

export default Home;
