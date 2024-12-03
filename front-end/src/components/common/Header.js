import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from '../common/ProfileDropdown';
import { useAuth } from '../../context/AuthContext'; // Auth context for user and logout
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth(); // Retrieve user state and logout from AuthContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get the current path

  // Effect to log state updates (debugging purposes)
  useEffect(() => {
    console.log('User state updated in Header:', user);
  }, [user]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">TripTease</Link>
      </div>

      <div className="header__right">
        {user ? (
          <div className="header__profile-wrapper" onClick={toggleDropdown}>
            <div className="header__profile">
              <span className="header__profile-menu-icon">☰</span>
              <span className="header__profile-icon">
                {user.profileAvatar || '👤'}
              </span>
            </div>
            {isDropdownOpen && <ProfileDropdown user={user} onSignOut={logout} />}
          </div>
        ) : (
          <div className="header__auth">
            <Link
              to="/log-in"
              className={`header__auth-link ${
                location.pathname === '/log-in' ? 'active' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className={`header__auth-button ${
                location.pathname === '/sign-up' ? 'active' : ''
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
