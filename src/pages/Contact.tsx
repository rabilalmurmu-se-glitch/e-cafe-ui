import React, { useEffect, useState } from "react";
import "./css/contact.css";
import { notifyError } from "../utils/Notify";
import { getShopDetails } from "../controllers/shop";

const Contact: React.FC = () => {
  const [shop, setShop] = useState<any>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    (async () => {
      const { error, message, data } = await getShopDetails();
      if (error) {
        notifyError(message);
        return;
      }
      console.log(data);
      setShop(data.data);
    })();
  }, []);

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-intro">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <div className="contact-container">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
            ></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: {!shop ? "Loading...." : shop.email}</p>
          <p>Phone: {!shop ? "Loading...." : shop.phone}</p>
          <p>Address: {!shop ? "Loading...." : shop.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
