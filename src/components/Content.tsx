import React from "react";
import "./css/style.css";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Content;
