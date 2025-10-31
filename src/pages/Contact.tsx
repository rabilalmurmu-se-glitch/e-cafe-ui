import React, { useState } from "react";
import "./css/contact.css";
import { useShopStore } from "../store/useShopStore";
import { createLead } from "../controllers/shop";
import { notifyError, notifySuccess } from "../utils/Notify";

const Contact: React.FC = () => {
  const { shopInfo } = useShopStore();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, message } = await createLead(formData);
    if (error) {
      notifyError("Failed to send message: " + message);
      return;
    }
    notifySuccess("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
          <p>Email: {!shopInfo ? "Loading...." : shopInfo.email}</p>
          <p>Phone: {!shopInfo ? "Loading...." : shopInfo.phone}</p>
          <p>Address: {!shopInfo ? "Loading...." : shopInfo.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
