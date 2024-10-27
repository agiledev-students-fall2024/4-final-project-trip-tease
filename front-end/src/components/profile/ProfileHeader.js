// ProfileHeader.js
import React from 'react';
//import './ProfileHeader.css';

const ProfileHeader = ({ name }) => {
  return (
    <div className="profile-header">
      <div className="profile-picture">
        <span>Profile Picture</span>
      </div>
      <h1 className="profile-welcome">Welcome, {name}</h1>
      <h2 className="profile-settings-title">Profile Settings</h2>
    </div>
  );
};

export default ProfileHeader;
