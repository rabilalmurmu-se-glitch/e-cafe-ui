import React from "react";
import { Link } from "react-router-dom";

interface CatalogCardProps {
  title: string;
  image: string;
  linkTo: string;
  buttonText?: string;
}

const CatalogCard: React.FC<CatalogCardProps> = ({
  title,
  image,
  linkTo,
  buttonText = "Explore",
}) => {
  return (
    <div className="catalog-card">
      <img src={image} alt={`${title} image`} className="catalog-image" />
      <div className="card-title">{title}</div>
      <Link to={linkTo}>
        <button className="catalog-btn">{buttonText}</button>
      </Link>
    </div>
  );
};

export default CatalogCard;
