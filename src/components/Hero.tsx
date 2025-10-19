import React from "react";
import hero from "../assets/black-tea.jpg";

const Hero: React.FC = () => {
  return (
    <div className="hero-root">
      <img src={hero} alt="Banner image" />
      <div className='card-title fancy-text'>“Bringing tea and coffee lovers together, one sip at a time.”</div>
    </div>
  );
};

export default Hero;
