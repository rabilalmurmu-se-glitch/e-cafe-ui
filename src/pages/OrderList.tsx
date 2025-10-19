import React, { useState } from "react";
import TeaList from "./TeaList";
import blackTea from "../assets/black-tea.jpg";
import greenTea from "../assets/glass-green-tea.jpg";
import masalaChai from "../assets/masala-tea.jpg";
import "./css/orderList.css";
import { Link } from "react-router-dom";

interface TeaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const initialTeas: TeaItem[] = [
  {
    id: "item1",
    name: "Classic Black Tea",
    description: "A bold and rich tea with a deep aroma and refreshing finish.",
    price: 120,
    image: blackTea,
  },
  {
    id: "item2",
    name: "Green Tea",
    description:
      "Light, fresh, and full of antioxidants — perfect for a healthy start.",
    price: 150,
    image: greenTea,
  },
  {
    id: "item3",
    name: "Masala Chai",
    description:
      "An aromatic blend of tea and Indian spices that warms your soul.",
    price: 130,
    image: masalaChai,
  },
];

const OrderList: React.FC = () => {
  const [teas, setTeas] = useState<TeaItem[]>(initialTeas);

  const handleRemove = (id: string) => {
    const updatedList = teas.filter((item) => item.id !== id);
    setTeas(updatedList);
    console.log("Removed item ID:", id);
  };

  const totalAmount = teas.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="Order-root">
      <div className="heading">Order List</div>

      <div className="order-list-container">
        {/* Left Section - Tea Items */}
        <div className="list">
          {teas.length > 0 ? (
            <TeaList
              btnTitle="Remove"
              teas={teas}
              handleRemove={handleRemove}
            />
          ) : (
            <div className="empty-text">Your order list is empty ☕</div>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <div className="order-summery">
          <div className="summery-card">
            <div className="title">Order Summary</div>
            <div className="divider"></div>

            <div className="summery-details">
              <div className="summary-row">
                <span>Items:</span>
                <span>{teas.length}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>₹{teas.length > 0 ? 40 : 0}</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="total-order-amount">
              <span>Total:</span>
              <span>₹{teas.length > 0 ? totalAmount + 40 : 0}</span>
            </div>

            <div className="checkout-btn">
              <Link to={"/payment"}>
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
