import React, { useEffect, useState } from "react";
import { notifyError } from "../utils/Notify";
import { getShopDetails } from "../controllers/shop";

const Hero: React.FC = () => {
  const [shop, setShop] = useState<any>();
  useEffect(() => {
    (async () => {
      const { error, message, data } = await getShopDetails();
      if (error) {
        notifyError(message);
        return;
      }
      console.log(data);
      setShop(data.data);
    })();
  }, []);
  return (
    <div className="hero-root">
      <img src={shop?.banner} alt="Banner image" />
      <div className="card-title fancy-text">
        “Bringing tea and coffee lovers together, one sip at a time.”
      </div>
    </div>
  );
};

export default Hero;
