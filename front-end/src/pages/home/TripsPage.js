import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TripList from './TripList';
import './TripsPage.css';

const TripsPage = () => {
  const [showCurrent, setShowCurrent] = useState(true);

  const handleToggle = () => setShowCurrent(!showCurrent);

  return (
    <div className="trips-page">
      <div className="header-row">
        <h1>My Trips</h1>
        <div className="toggle-buttons">
          <button 
            onClick={handleToggle} 
            className={showCurrent ? 'active' : ''}
          >
            Current Trips
          </button>
          <button 
            onClick={handleToggle} 
            className={!showCurrent ? 'active' : ''}
          >
            Past Trips
          </button>
        </div>
        <div className="actions">
            <Link to="/add-trip" className="action-button">
            Add Trip
            </Link>
            <Link to="/create-new-trip" className="action-button">
            Create New Trip
            </Link>
        </div>
      </div>
      <TripList showCurrent={showCurrent} />
    </div>
  );
};

export default TripsPage;