import React, { useState } from "react";
import "./css/tea.css";
import type { OrderType } from "../pages/Item";

interface TeaProps {
  name: string;
  description: string;
  price: number;
  image: string;
  onOrder?: (details: OrderType) => void;
  btnTitle: string;
  onRemove?: () => void;
}

const Tea: React.FC<TeaProps> = ({
  name,
  description,
  price,
  image,
  onOrder,
  btnTitle,
  onRemove,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOrder = () => {
    if (onOrder) {
      onOrder({ name, quantity, totalPrice: price * quantity });
      alert(
        `You added ${quantity} cup${
          quantity > 1 ? "s" : ""
        } of ${name} to order list! ☕`
      );
    }
    if (onRemove) {
      onRemove();
      alert(
        `You removed ${quantity} cup${
          quantity > 1 ? "s" : ""
        } of ${name} from order list! ☕`
      );
    }
  };

  return (
    <div className="tea-root">
      {/* Left section - image */}
      <div className="tea-left">
        <img src={image} alt={name} />
      </div>

      {/* Right section - details */}
      <div className="tea-right">
        <div className="tea-title">{name}</div>
        <div className="tea-description">{description}</div>

        {/* Quantity selector */}
        <div className="tea-quantity">
          <button className="qty-btn" onClick={handleDecrease}>
            −
          </button>
          <span className="qty-value">{quantity}</span>
          <button className="qty-btn" onClick={handleIncrease}>
            +
          </button>
        </div>

        {/* Price display */}
        <div className="tea-price">
          ₹{price * quantity} / {quantity} cup{quantity > 1 ? "s" : ""}
        </div>

        {/* Order button */}
        <button className="order-btn" onClick={handleOrder}>
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

export default Tea;
