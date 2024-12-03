import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, profileAvatar }) => {
  return (
    <div className="profile-header">
      <div className="profile-avatar-wrapper">
        <span className="profile-avatar">{profileAvatar}</span>
      </div>
      <h1 className="profile-name">Welcome, {name}</h1>
      <h2 className="profile-settings-title">Profile Settings</h2>
    </div>
  );
};

export default ProfileHeader;
