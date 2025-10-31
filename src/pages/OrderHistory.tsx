import React, { useEffect, useState } from "react";
import "./css/orderHistory.css";
import { getUserOrders } from "../controllers/order";
import { useUserStore } from "../store/useUserStore";
import { notifyError } from "../utils/Notify";
import { Link } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const { user } = useUserStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.id) return setLoading(false);
    (async () => {
      try {
        const result = await getUserOrders(user.id);
        if (result?.error) return notifyError(result.message);
        console.log(result.data);
        setOrders(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleDetails = (id: number) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  if (loading)
    return (
      <div className="orders-loader">
        <div className="spinner"></div>
        <span>Loading orders...</span>
      </div>
    );

  const currentOrders = orders.filter((o) => o.status !== "DELIVERED");
  const previousOrders = orders.filter((o) => o.status == "DELIVERED");

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {/* Current Order */}
      {currentOrders.length > 0 &&
        currentOrders.map((currentOrder, index) => (
          <div key={index} className="order-card current-order">
            <div className="order-header">
              <h2>Order yet to be delivered</h2>
              <span className="order-id">#{currentOrder.id}</span>
            </div>

            <div className="order-meta">
              <span className={`status ${currentOrder.status}`}>
                {currentOrder.status}
              </span>
              <span
                className={`payment-status ${currentOrder.paymentStatus?.toLowerCase()}`}
              >
                {currentOrder.paymentStatus || "unpaid"}
              </span>
            </div>
            <div className="order-items">
              {currentOrder.items.map((item: any) => (
                <Link to={`/tea/${item.category}`} key={item.id}>
                  <div className="order-item">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <img src={item.picture} alt={item.name} />
                    <div>
                      {item.price} x {item.quantity}
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="order-total">
              <span>Total:</span>
              <strong>₹{currentOrder.total}</strong>
            </div>
            <button
              className="btn-primary"
              onClick={() => toggleDetails(currentOrder.id)}
            >
              {expandedOrderId === currentOrder.id
                ? "Hide Details"
                : "View Details"}
            </button>

            {/* Collapsible section */}
            {expandedOrderId === currentOrder.id && (
              <div className="order-details">
                <p>
                  <strong>Order ID:</strong> #{currentOrder.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(currentOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  {currentOrder.paymentStatus || "unpaid"}
                </p>
                <p>
                  <strong>Table No:</strong> {currentOrder.address || "N/A"}
                </p>
              </div>
            )}
          </div>
        ))}

      {/* Previous Orders */}
      <div className="previous-orders">
        <h2>Previous Orders</h2>
        {previousOrders.length === 0 ? (
          <p className="no-orders">No previous orders yet.</p>
        ) : (
          previousOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>

              <div className="order-meta">
                <span
                  className={`payment-status ${order.paymentStatus?.toLowerCase()}`}
                >
                  {order.paymentStatus || "unpaid"}
                </span>
              </div>

              <p className="order-date">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="order-footer">
                <span>{order.items.length} items</span>
                <strong>₹{order.total}</strong>
              </div>

              <button
                className="btn-secondary"
                onClick={() => toggleDetails(order.id)}
              >
                {expandedOrderId === order.id ? "Hide Details" : "View Details"}
              </button>

              {/* Collapsible */}
              {expandedOrderId === order.id && (
                <div className="order-details">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="detail-item">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <img src={item.picture} alt={item.name} />
                      <div>
                        {item.price} x {item.quantity}
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <p>
                    <strong>Payment:</strong> {order.paymentStatus || "unpaid"}
                  </p>
                  <p>
                    <strong>Table:</strong> {order.address || "N/A"}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
