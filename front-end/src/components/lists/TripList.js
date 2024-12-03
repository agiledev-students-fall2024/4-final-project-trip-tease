import React, { useEffect, useState } from 'react';
import TripCard from '../cards/TripCard';
import './TripList.css';
import { fetchTripsForUser } from '../../api/apiUtils';

const TripList = ({ userId, activeTab }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        setLoading(true);
        const allTrips = await fetchTripsForUser(userId);

        // Filter trips based on the active tab
        const filteredTrips = allTrips.filter((trip) =>
          activeTab === 'current' ? trip.status !== 'completed' : trip.status === 'completed'
        );

        setTrips(filteredTrips);
        setError(null); // Clear previous errors
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError('Failed to fetch trips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [userId, activeTab]);

  if (loading) return <p>Loading trips...</p>;

  if (error) return <p className="error-message">{error}</p>;

  if (trips.length === 0) {
    return (
      <p className="empty-state">
        {activeTab === 'current'
          ? 'You have no current trips. Start by creating one!'
          : "You haven't completed any trips yet. Keep exploring!"}
      </p>
    );
  }

  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
