import React, { useEffect, useState } from "react";
import "./css/profile.css";
import defaultAvatar from "../assets/roast-coffee.jpg";
import { useUserStore } from "../store/useUserStore";
import { getUserById, UpdateProfileInfo } from "../controllers/user";
import { notifyError, notifySuccess } from "../utils/Notify";
import { formatDate } from "../utils/formatDate";

const Profile: React.FC = () => {
  const { user } = useUserStore();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempAbout, setTempAbout] = useState("");

  const isGuest = !user; // true when no logged-in user

  useEffect(() => {
    if (!user) return; // guest user → skip fetching

    (async () => {
      try {
        const { error, message, data } = await getUserById(
          user.id || user.userId
        );
        if (error) {
          notifyError(message || "Failed to load profile");
          return;
        }

        setUserData(data.data);
        setTempAbout(data.data.about || "");
        notifySuccess("Profile loaded successfully");
      } catch (err) {
        console.error(err);
        notifyError("Something went wrong while loading profile");
      }
    })();
  }, [user]); // re-fetch when logged-in user changes

  const handleSave = async () => {
    if (isGuest || !userData) return;

    try {
      const { error, message, data } = await UpdateProfileInfo(
        { about: tempAbout },
        userData.userId || userData.id
      );

      if (error) {
        notifyError(message || "Failed to update profile");
        return;
      }

      notifySuccess("Profile updated successfully");
      setUserData(data.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      notifyError("Something went wrong while updating profile");
    }
  };

  const handleCancel = () => {
    setTempAbout(userData?.about || "");
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <img src={defaultAvatar} alt="Profile" className="profile-img" />
          <h2 className="profile-name">
            {isGuest ? "Guest User" : userData?.name || "Loading..."}
          </h2>
          <p className="profile-role">
            {isGuest ? "Visitor" : `${userData?.role || "Member"}, E-Cafe`}
          </p>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <h3>Account Details</h3>
          <ul>
            {isGuest ? (
              <>
                <li>
                  <strong>Email:</strong> Not logged in
                </li>
                <li>
                  <strong>Status:</strong> Guest Mode
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Email:</strong> {userData?.email}
                </li>
                <li>
                  <strong>Joined:</strong> {formatDate(userData?.createdAt)}
                </li>
                <li>
                  <strong>Location:</strong>{" "}
                  {userData?.address || "Kolkata, India"}
                </li>
              </>
            )}
          </ul>
        </div>

        {/* About Section */}
        <div className="profile-about">
          <h3>About Me</h3>

          {isGuest ? (
            <p>
              Welcome to E-Cafe! Please sign in to personalize your profile.
            </p>
          ) : isEditing ? (
            <>
              <textarea
                value={tempAbout}
                onChange={(e) => setTempAbout(e.target.value)}
                placeholder="Write something about yourself..."
              />
              <div className="btn-group">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{userData?.about || "No description yet."}</p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </>
          )}
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat">
            <h4>{isGuest ? "—" : userData?.ordersCount ?? 52}</h4>
            <p>Orders</p>
          </div>
          <div className="stat">
            <h4>{isGuest ? "—" : userData?.favoritesCount ?? 12}</h4>
            <p>Favorites</p>
          </div>
          <div className="stat">
            <h4>{isGuest ? "—" : userData?.rating ?? "4.9★"}</h4>
            <p>Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
