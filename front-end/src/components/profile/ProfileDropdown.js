import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onSignOut, user }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-dropdown">
      <button
        className="profile-dropdown-item"
        onClick={() => navigate('/profile')}
      >
        <span className="profile-dropdown-item-icon">{user?.profileAvatar || "👤"}</span>
        View Profile
      </button>
      <button
        className="profile-dropdown-item"
        onClick={() => {
          onSignOut(); 
          setTimeout(() => navigate('/log-in'), 0); 
        }}
      >
        <span className="profile-dropdown-item-icon">🚪</span> Sign Out
      </button>
    </div>
  );
};

export default ProfileDropdown;
