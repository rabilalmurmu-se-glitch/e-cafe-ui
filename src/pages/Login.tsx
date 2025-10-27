import React, { useState } from "react";
import "./css/login.css";
import { Link } from "react-router-dom";
import { login } from "../controllers/user";
import { notifyError, notifySuccess } from "../utils/Notify";
import { useUserStore } from "../store/useUserStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
    const { error, data, message } = await login({ email, password });
    if (error) {
      notifyError(message);
      return;
    }
    console.log(data.data);
    notifySuccess("Login success!");
    setUser(data.data);
    setTimeout(() => (location.href = "/"), 1000);
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <div className="login-overlay">
          <h1>Welcome Back 👋</h1>
          <p>
            Manage your projects and collaborate with your team — all in one
            place.
          </p>
        </div>
      </div>

      {/* Right Section (No Card) */}
      <div className="login-right">
        <div className="login-content">
          <h2>Sign In</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <p className="footer-text">
              Don’t have an account? <Link to={"/sign-up"}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
