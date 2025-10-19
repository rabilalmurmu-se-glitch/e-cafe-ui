import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./css/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h2 className="footer-title">E-Cafe</h2>
          <p className="footer-text">
            Enjoy the finest teas from around the world, delivered right to your
            doorstep.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Menu</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Follow Us</h3>
          <div className="footer-social">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} E-Cafe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
