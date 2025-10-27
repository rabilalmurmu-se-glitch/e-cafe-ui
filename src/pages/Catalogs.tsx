import React, { useEffect, useState } from "react";
import Catalog from "../components/Catalog";
import "./css/catalogs.css";
import withBanner from "../HOC/WithBanner";
import { getShopCategories } from "../controllers/shop";
import { notifyError } from "../utils/Notify";

const Catalogs: React.FC = () => {
  const [categories, setCategories] = useState<Record<string, any[]> | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { error, message, data } = await getShopCategories();
      if (error) {
        notifyError(message || "Failed to load categories");
        return;
      }
      setCategories(data);
    })();
  }, []);

  const renderCategories = (data: Record<string, any[]>) => {
    return Object.keys(data).map((key) => (
      <div key={key}>
        <div className="heading">{key}</div>
        <div className="catalogs-container">
          {data[key].map((item, index) => (
            <div key={index} className="catalog">
              <Catalog
                title={item.name}
                image={item.photo}
                linkTo={`/tea/${item.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="catalogs-root">
      {!categories ? (
        <div className="loading">Loading categories...</div>
      ) : (
        renderCategories(categories)
      )}
    </div>
  );
};

export default withBanner(Catalogs);
