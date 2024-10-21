import React from 'react';
import TripCard from './TripCard';
import './TripList.css';


//example trips just for show
const tripsData = {
    current: [
      { id: 1, name: 'Paris Vacation', emoji: '🗼' },
      { id: 2, name: 'Hiking in the Alps', emoji: '⛰️' },
    ],
    past: [
      { id: 3, name: 'Tokyo Adventure', emoji: '🗾' },
      { id: 4, name: 'Beach Relaxation', emoji: '🏖️' },
    ],
  };

const TripList = ({ showCurrent }) => {
  const trips = showCurrent ? tripsData.current : tripsData.past;

  return (
    <div className="trip-list">
      {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
