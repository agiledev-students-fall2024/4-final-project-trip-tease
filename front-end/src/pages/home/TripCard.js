import React from 'react';
import './TripCard.css';

const TripCard = ({ trip }) => {
  const handleClick = () => {
    alert(`Go to ${trip.name} page!`);
  };

  return (
    <div className="trip-card" onClick={handleClick}>
      <div className="trip-emoji">{trip.emoji}</div>
      <h2>{trip.name}</h2>
    </div>
  );
};

export default TripCard;



