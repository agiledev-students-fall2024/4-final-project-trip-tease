import React, { useState, useEffect } from 'react';
// import { fetchTripDetails } from '../../api/apiUtils'; // Assuming an API utility exists for fetching trip details
import './GroupTripPictureCard.css';

const GroupTripPictureCard = ({ tripName, tripId }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch trip details or randomize an image URL
    const randomImage = `https://picsum.photos/200/100?random=${tripId}`;
    setImageUrl(randomImage);
  }, [tripId]);

  return (
    <div className="group-trip-picture-card">
      <div className="trip-image-container">
        <img src={imageUrl} alt={`Group trip to ${tripName}`} />
      </div>
      <h1>{tripName}</h1>
    </div>
  );
};

export default GroupTripPictureCard;
