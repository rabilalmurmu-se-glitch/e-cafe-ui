import React from "react";
import { useShopStore } from "../store/useShopStore";

const Hero: React.FC = () => {
  const { shopInfo } = useShopStore();
  return (
    <div className="hero-root">
      <img src={shopInfo?.banner} alt="Banner image" />
      <div className="card-title fancy-text">
        “Bringing tea and coffee lovers together, one sip at a time.”
      </div>
    </div>
  );
};

export default Hero;
