import React, { useEffect } from "react";
import "./css/style.css";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useShopStore } from "../store/useShopStore";
import { getShopDetails } from "../controllers/shop";
import { notifyError } from "../utils/Notify";

const Content: React.FC = () => {
  const { updateItems } = useShopStore();
  useEffect(() => {
    (async () => {
      const { error, message, data } = await getShopDetails();
      if (error) {
        notifyError(message);
        return;
      }
      updateItems({ shopInfo: data.data });
    })();
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Content;
