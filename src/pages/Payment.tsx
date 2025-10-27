import React, { useEffect, useState } from "react";
import "./css/payment.css";
import { useUserStore } from "../store/useUserStore";
import { formatItemArray, getOrderListItems } from "../controllers/order";
import { notifyError } from "../utils/Notify";

const PaymentPage: React.FC = () => {
  const { user } = useUserStore();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };
  console.log(user);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment successful! Redirecting to confirmation page...");
    window.location.href = "/order-confirmed";
  };

  async function getOrderItems() {
    const { error, message, data } = await getOrderListItems(user?.id);
    if (error) return notifyError(message);
    const formatedData = await formatItemArray(data.data);
    console.log(formatedData);
  }

  useEffect(() => {
    if (user?.id) getOrderItems();
  }, [user]);

  return (
    <div className="payment-root">
      <div className="payment-container">
        <h2>Payment Details</h2>
        <p className="payment-desc">
          Choose your payment method and complete your order securely.
        </p>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="method"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit / Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="method"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            UPI / Wallet
          </label>
          <label>
            <input
              type="radio"
              name="method"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <form className="card-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name on Card"
              name="name"
              value={cardDetails.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              name="number"
              value={cardDetails.number}
              onChange={handleChange}
              maxLength={16}
              required
            />
            <div className="row">
              <input
                type="text"
                placeholder="MM/YY"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="CVV"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleChange}
                maxLength={3}
                required
              />
            </div>
            <button type="submit" className="pay-btn">
              Pay ₹440
            </button>
          </form>
        )}

        {paymentMethod === "upi" && (
          <div className="upi-box">
            <p>
              Scan the QR code with your UPI app or enter your UPI ID below:
            </p>
            <input type="text" placeholder="example@upi" />
            <button onClick={handleSubmit} className="pay-btn">
              Pay ₹440
            </button>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="cod-box">
            <p>
              You have chosen <b>Cash on Delivery</b>. You can pay when your tea
              arrives.
            </p>
            <button onClick={handleSubmit} className="pay-btn">
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
