import React, { useState } from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/Notify";
import { signup } from "../controllers/user";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      notifyError("Passwords do not match!");
      return;
    }
    const { confirmPassword, ...data } = formData;
    const response = await signup(data);
    if (response.error) {
      notifyError(response.message);
      return;
    }

    notifySuccess("Registration successfull");
    setTimeout(() => (location.href = "/login"), 1000);
  };

  return (
    <div className="signup-page">
      {/* Left Section */}
      <div className="signup-left">
        <div className="signup-overlay">
          <h1>Join Us 🚀</h1>
          <p>Create an account to start your journey with us.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <div className="signup-content">
          <h2>Create Account</h2>
          <p className="subtitle">Fill in your details to get started</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-radio">
              <label className="radio-label">Gender</label>
              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="gender"
                    value="MALE"
                  />
                  <span>Male</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="gender"
                    value="FEMALE"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>

            <p className="footer-text">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
