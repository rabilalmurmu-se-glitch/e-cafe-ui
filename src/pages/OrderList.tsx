import React, { useEffect, useState } from "react";
import TeaList from "./TeaList";
import "./css/orderList.css";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { getOrderListItems } from "../controllers/order";
import { notifyError } from "../utils/Notify";

const OrderList: React.FC = () => {
  const { user } = useUserStore();
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [totalAmount, seTotalAmount] = useState<number>(0);

  const handleRemove = (id: string) => {
    console.log("Removed item ID:", id);
  };

  useEffect(() => {
    async function fetchOrderItems(userId: number) {
      const { error, message, data } = await getOrderListItems(userId);
      if (error) {
        notifyError(message);
        return;
      }

      const listItems = data.data.map((d: any) => ({
        ...d.item,
        quantity: d.quantity,
        total: +d.item.price * +d.quantity,
      }));
      console.log(listItems);
      const total = listItems.reduce(
        (sum: any, item: any) => sum + item.total,
        0
      );
      seTotalAmount(total);
      setOrderItems(listItems);
    }

    if (user?.id) fetchOrderItems(user.id);
  }, [user]);

  return (
    <div className="Order-root">
      <div className="heading">Order List</div>

      <div className="order-list-container">
        {/* Left Section - Tea Items */}
        <div className="list">
          {orderItems?.length > 0 ? (
            <TeaList
              btnTitle="Remove"
              teas={orderItems}
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
                <span>{orderItems?.length}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>₹{orderItems?.length > 0 ? 40 : 0}</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="total-order-amount">
              <span>Total:</span>
              <span>₹{orderItems?.length > 0 ? totalAmount + 40 : 0}</span>
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
