import React, { useState } from "react";
import "./css/profile.css";
import defaultAvatar from "../assets/roast-coffee.jpg"; // Replace with your image

const Profile: React.FC = () => {
  const [about, setAbout] = useState(
    "Tea enthusiast and lover of cozy moments. Exploring flavors, one cup at a time."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempAbout, setTempAbout] = useState(about);

  const handleSave = () => {
    setAbout(tempAbout);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <img src={defaultAvatar} alt="Profile" className="profile-img" />
          <h2 className="profile-name">Rabilal Murmu</h2>
          <p className="profile-role">Founder & CEO, E-Cafe</p>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <h3>Account Details</h3>
          <ul>
            <li>
              <strong>Email:</strong> rabilal@example.com
            </li>
            <li>
              <strong>Joined:</strong> October 2025
            </li>
            <li>
              <strong>Location:</strong> Kolkata, India
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div className="profile-about">
          <h3>About Me</h3>
          {isEditing ? (
            <>
              <textarea
                value={tempAbout}
                onChange={(e) => setTempAbout(e.target.value)}
              />
              <div className="btn-group">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{about}</p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </>
          )}
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat">
            <h4>52</h4>
            <p>Orders</p>
          </div>
          <div className="stat">
            <h4>12</h4>
            <p>Favorites</p>
          </div>
          <div className="stat">
            <h4>4.9★</h4>
            <p>Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
