import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripCard.css';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/locations/${trip.id}`);
  };

  return (
    <div className="trip-card" onClick={handleCardClick}>
      <div className="trip-card__image-wrapper">
        <img
          src={trip.image}
          alt={trip.name}
          className="trip-card__image"
        />
        <span className="trip-card__status">{trip.status}</span>
      </div>
      <h3 className="trip-card__title">{trip.name}</h3>
    </div>
  );
};

export default TripCard;
