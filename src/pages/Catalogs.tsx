import React from "react";
import Catalog from "../components/Catalog";
import "./css/catalogs.css";
import withBanner from "../HOC/WithBanner";
import blackTea from "../assets/black-tea.jpg";
import greenTea from "../assets/glass-green-tea.jpg";
import espresso from "../assets/spacial-tea.jpg";

const Catalogs: React.FC = () => {
  const catalogItems = [
    { title: "Black Tea", image: blackTea, linkTo: "/tea/black-tea" },
    { title: "Green Tea", image: greenTea, linkTo: "/tea/green-tea" },
    { title: "Espresso", image: espresso, linkTo: "/tea/espresso" },
    { title: "Espresso", image: espresso, linkTo: "/tea/espresso" },
  ];
  return (
    <div className="catalogs-root">
      <div className="heading">Teas</div>
      <div className="catalogs-container">
        {catalogItems.map((item, index) => {
          return (
            <div key={index} className="catalog">
              <Catalog
                title={item.title}
                image={item.image}
                linkTo={item.linkTo}
              />
            </div>
          );
        })}
      </div>

      <div className="heading">Coffee</div>
      <div className="catalogs-container">
        {catalogItems.map((item, index) => {
          return (
            <div key={index} className="catalog">
              <Catalog
                title={item.title}
                image={item.image}
                linkTo={item.linkTo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withBanner(Catalogs);
