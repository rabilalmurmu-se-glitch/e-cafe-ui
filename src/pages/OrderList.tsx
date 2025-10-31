import React, { useCallback, useEffect } from "react";
import TeaList from "./TeaList";
import "./css/orderList.css";
import { useUserStore } from "../store/useUserStore";
import {
  formatItemArray,
  getOrderListItems,
  PlaceOrder,
  removeItemFromList,
} from "../controllers/order";
import { notifyError, notifySuccess } from "../utils/Notify";
import { useShopStore } from "../store/useShopStore";

const OrderList: React.FC = () => {
  const { user } = useUserStore();
  const { items, subTotal, updateItems, shopInfo } = useShopStore();

  const fetchOrderItems = useCallback(
    async (userId: number) => {
      const { error, message, data } = await getOrderListItems(userId);
      if (error) return notifyError(message);
      const { total, listItems } = await formatItemArray(data.data);
      updateItems({ data: listItems, total });
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
    console.log("first");
  }, [user, fetchOrderItems]);

  const handlePlaceOrder = async (type: string) => {
    if (!user?.id)
      return alert(
        "Oops! 🫢, You haven't login yet, to place an order you have to login first."
      );
    if (items?.length === 0)
      return alert("Ahh haa 🙄, Your list is empty, add items first.");

    const tableNumber = prompt("Enter your table number (for dine-in orders):");
    if (!tableNumber) {
      alert("🙄 Table number is required to place the order.");
      return;
    }
    if (
      tableNumber.trim() === "" ||
      isNaN(Number(tableNumber)) ||
      Number(tableNumber) <= 0 ||
      Number(tableNumber) > (shopInfo?.max_table || 100)
    ) {
      alert(
        `🙄 Table number must be a valid number between 1 and ${
          shopInfo?.max_table || 100
        }.`
      );
      return;
    }

    const result = await PlaceOrder(
      items[0].listId,
      type,
      user.id,
      tableNumber
    );
    if (!result) return;
    if (result.error) return notifyError(result.message);
    console.log(result.data);
    if (result.success)
      return notifySuccess("😊 Your order has been placed succefully!");
  };
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
              <button onClick={() => handlePlaceOrder("POSTPAID")}>
                Pay on Delivery
              </button>
              <button onClick={() => handlePlaceOrder("PREPAID")}>
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
