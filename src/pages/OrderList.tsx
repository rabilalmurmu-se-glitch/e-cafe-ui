import React, { useCallback, useEffect } from "react";
import TeaList from "./TeaList";
import "./css/orderList.css";
import { useUserStore } from "../store/useUserStore";
import {
  formatItemArray,
  getOrderListItems,
  handlePayment,
  removeItemFromList,
} from "../controllers/order";
import { notifyError } from "../utils/Notify";
import { useListItems } from "../store/useShopStore";

const OrderList: React.FC = () => {
  const { user } = useUserStore();
  const { items, subTotal, updateItems } = useListItems();

  const fetchOrderItems = useCallback(
    async (userId: number) => {
      const { error, message, data } = await getOrderListItems(userId);
      if (error) return notifyError(message);
      const { total, listItems } = await formatItemArray(data.data);
      updateItems(listItems, total);
    },
    [updateItems]
  );
  const handleRemove = async (id: number) => {
    console.log("Removed item ID:", id);
    const { error, message } = await removeItemFromList(id);
    if (error) return notifyError(message);
    fetchOrderItems(user.id);
  };
  useEffect(() => {
    if (user?.id) fetchOrderItems(user.id);
  }, [user, fetchOrderItems]);
  return (
    <div className="Order-root">
      <div className="heading">Order List</div>

      <div className="order-list-container">
        {/* Left Section - Tea Items */}
        <div className="list">
          {items?.length > 0 ? (
            <TeaList
              btnTitle="Remove"
              teas={items}
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
                <span>{items?.length}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>₹{items?.length > 0 ? 40 : 0}</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="total-order-amount">
              <span>Total:</span>
              <span>₹{items?.length > 0 ? subTotal + 40 : 0}</span>
            </div>

            <div className="checkout-btn">
              <button>Pay on Delivery</button>
              <button
                onClick={() => items?.length && handlePayment(items[0].listId)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
