import React, { useCallback, useState } from "react";
import "./css/tea.css";
import {
  formatItemArray,
  getOrderListItems,
  updateItemToOrderList,
} from "../controllers/order";
import { notifyError } from "../utils/Notify";
import { useUserStore } from "../store/useUserStore";
import { useListItems } from "../store/useShopStore";

interface TeaProps {
  itemId: number | string;
  name: string;
  description: string;
  price: number;
  image: string;
  btnTitle: string;
  initialQuantity?: number;
  rowId?: number;
  onOrder?: (details: { itemId: number | string; quantity: number }) => void;
  onRemove?: (id: number) => void;
}

const Tea: React.FC<TeaProps> = ({
  itemId,
  name,
  description,
  price,
  image,
  btnTitle,
  initialQuantity = 1,
  rowId,
  onOrder,
  onRemove,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { user } = useUserStore();
  const { updateItems } = useListItems();

  const refreshOrderList = useCallback(async () => {
    const { error, message, data } = await getOrderListItems(user.id);
    if (error) return notifyError(message);
    const { total, listItems } = await formatItemArray(data.data);
    updateItems(listItems, total);
  }, [user?.id, updateItems]);

  const handleListItemUpdate = useCallback(
    async (newQuantity: number) => {
      const { error, message } = await updateItemToOrderList({
        quantity: newQuantity,
        id: rowId as number,
      });
      if (error) return notifyError(message);
      await refreshOrderList();
    },
    [rowId, refreshOrderList]
  );

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (rowId) await handleListItemUpdate(newQuantity);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (rowId) await handleListItemUpdate(newQuantity);
    }
  };

  const handleOrder = () => {
    onOrder?.({ itemId, quantity });
    onRemove?.(Number(rowId));
  };

  return (
    <div className="tea-root">
      {/* Left section - image */}
      <div className="tea-left">
        <img src={image} alt={name} loading="lazy" />
      </div>

      {/* Right section - details */}
      <div className="tea-right">
        <div className="tea-title">{name}</div>
        <div className="tea-description">{description}</div>

        {/* Quantity selector */}
        <div className="tea-quantity">
          <button
            className="qty-btn"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-value">{quantity}</span>
          <button
            className="qty-btn"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Price display */}
        <div className="tea-price">
          ₹{Number.isFinite(price) ? price * quantity : 0} / {quantity} cup
          {quantity > 1 ? "s" : ""}
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
