import React from 'react';
import './TripTabs.css';

const TripTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="trip-tabs">
      <button
        className={`trip-tabs__button ${activeTab === 'current' ? 'active' : ''}`}
        onClick={() => setActiveTab('current')}
      >
        Current Trips
      </button>
      <button
        className={`trip-tabs__button ${activeTab === 'past' ? 'active' : ''}`}
        onClick={() => setActiveTab('past')}
      >
        Past Trips
      </button>
    </div>
  );
};

export default TripTabs;
