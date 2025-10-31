import React from "react";
import "./css/about.css";
import team1 from "../assets/black-tea.jpg"; // Replace with your team images
import team2 from "../assets/glass-green-tea.jpg";
import team3 from "../assets/spacial-coffee.jpg";
import { useShopStore } from "../store/useShopStore";

const About: React.FC = () => {
  const { shopInfo } = useShopStore();
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About E-Cafe</h1>
        <p>{!shopInfo ? "Loading...." : shopInfo.about_shop}</p>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>{!shopInfo ? "Loading...." : shopInfo.shop_mission}</p>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src={team1} alt="Team Member 1" />
            <h3>Rabilal Murmu</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-card">
            <img src={team2} alt="Team Member 2" />
            <h3>Jane Doe</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-card">
            <img src={team3} alt="Team Member 3" />
            <h3>John Smith</h3>
            <p>Lead Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
