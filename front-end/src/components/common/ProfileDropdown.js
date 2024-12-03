import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/apiUtils'; // API logout function
import './ProfileDropdown.css';

const ProfileDropdown = ({ onSignOut, user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout(); // Clear session from the API and local storage
      onSignOut(); // Notify parent (e.g., Header) about logout
      navigate('/log-in'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className="profile-dropdown">
      <button
        className="profile-dropdown-item"
        onClick={() => navigate('/profile')}
      >
        <span className="profile-dropdown-item-icon">{user?.profileAvatar || '👤'}</span>
        View Profile
      </button>
      <button className="profile-dropdown-item" onClick={handleSignOut}>
        <span className="profile-dropdown-item-icon">🚪</span> Sign Out
      </button>
    </div>
  );
};

export default ProfileDropdown;
