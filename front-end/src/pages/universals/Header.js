// src/pages/universals/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      <Link to="/home" className="logo">
        TripTease
      </Link>
      <button className="profile-button" onClick={handleProfileClick}>
        🧑
      </button>
    </header>
  );
};

export default Header;
