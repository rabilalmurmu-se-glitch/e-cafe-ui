import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withBanner from "../HOC/WithBanner";
import { getShopCategory, getShopItems } from "../controllers/shop";
import { notifyError, notifySuccess } from "../utils/Notify";
import TeaList from "./TeaList";
import { useUserStore } from "../store/useUserStore";
import { addItemToOrderList } from "../controllers/order";

const Item: React.FC = () => {
  const { user } = useUserStore();
  const { category_id } = useParams<{ category_id: string }>();
  const [category, setCategory] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOrder = async (order: any) => {
    if (!user?.id) {
      notifyError("Please login first then try again thankyou");
      return;
    }
    const { quantity, itemId } = order;
    const { error, message } = await addItemToOrderList({
      userId: user?.id,
      item_id: itemId,
      quantity,
    });
    if (error) {
      notifyError(message);
      return;
    }
    notifySuccess("Item added to list successfully!");
  };

  useEffect(() => {
    if (!category_id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryRes, itemsRes] = await Promise.all([
          getShopCategory(category_id),
          getShopItems(category_id),
        ]);

        if (categoryRes.error) {
          notifyError(categoryRes.message || "Failed to fetch category");
          return;
        }
        if (itemsRes.error) {
          notifyError(itemsRes.message || "Failed to fetch items");
          return;
        }

        setCategory(categoryRes.data?.data || null);
        setItems(itemsRes.data || []);
      } catch (err) {
        console.error(err);
        notifyError("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category_id]);

  if (loading) {
    return (
      <div className="catalogs-root">
        <div className="loading">Loading items...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="catalogs-root">
        <div className="error-message">Category not found</div>
      </div>
    );
  }

  return (
    <div className="catalogs-root">
      <div className="heading">{category?.name}</div>

      {items.length > 0 ? (
        <TeaList
          btnTitle="Add to list"
          teas={items}
          handleOrder={handleOrder}
        />
      ) : (
        <div className="empty-message">No items available in this category</div>
      )}
    </div>
  );
};

export default withBanner(Item);
