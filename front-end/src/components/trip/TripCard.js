import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripCard.css';

const TripCard = ({ trip }) => {


  return (
    <div className="trip-card">
      <div className="trip-card__image-wrapper">
        <img
          src={`https://picsum.photos/400/300?random=${trip.id}`}
          alt={trip.title}
          className="trip-card__image"
        />
        <span className="trip-card__status">{trip.status}</span>
      </div>
      <h3 className="trip-card__title">{trip.title}</h3>
    </div>
  );
};

export default TripCard;
