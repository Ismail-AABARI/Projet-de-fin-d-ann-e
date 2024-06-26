// src/components/Profile.jsx
import React from "react";
import "./profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-item">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{user.email}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Verified:</span>
          <span className="profile-value">{user.verified ? "Yes" : "No"}</span>
        </div>
        {/* Add more profile details as needed */}
      </div>
    </div>
  );
};

export default Profile;
