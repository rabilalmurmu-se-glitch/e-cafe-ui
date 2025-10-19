import React from "react";
import "./css/orderConfirmed.css";

const OrderConfirmedPage: React.FC = () => {
  return (
    <div className="confirm-root">
      <div className="confirm-card">
        <div className="checkmark">✔</div>
        <h2>Order Confirmed!</h2>
        <p>
          Thank you for your purchase. Your delicious tea will be delivered soon ☕
        </p>
        <div className="order-details">
          <p><b>Order ID:</b> EC-20251011</p>
          <p><b>Expected Delivery:</b> 30-45 mins</p>
        </div>
        <button className="home-btn" onClick={() => (window.location.href = "/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmedPage;
