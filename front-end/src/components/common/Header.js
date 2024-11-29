import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../profile/ProfileDropdown';
import './Header.css';

const Header = ({ user, isLoggedIn, onSignOut, onLogoClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={onLogoClick}>
        <Link to="/" className="header__logo-link">TripTease</Link>
      </div>

      <div className="header__right">
        {isLoggedIn ? (
          user && user.profileAvatar ? (
            <div className="header__profile-wrapper" onClick={toggleDropdown}>
              <div className="header__profile">
                <span className="header__profile-menu-icon">☰</span>
                <span className="header__profile-icon">{user.profileAvatar}</span>
              </div>
              {isDropdownOpen && <ProfileDropdown user={user} onSignOut={onSignOut} />}
            </div>
          ) : (
            <div className="header__profile-wrapper">
              {/* Placeholder if profileAvatar is not available */}
              <span className="header__profile-icon">👤</span>
            </div>
          )
        ) : (
          <div className="header__auth">
            <Link to="/log-in" className="header__auth-link">Login</Link>
            <Link to="/sign-up" className="header__auth-button">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
