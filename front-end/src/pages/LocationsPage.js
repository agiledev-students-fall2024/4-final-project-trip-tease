import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LocationsList from '../components/lists/LocationsList';
import TripMembersList from '../components/lists/TripMembersList';
import { fetchTripDetails, fetchLocationsForTrip, updateTripStatus } from '../api/apiUtils';
import './LocationsPage.css';

const LocationsPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({});
  const [locations, setLocations] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdateError, setStatusUpdateError] = useState('');

  const fetchData = async () => {
    try {
      const trip = await fetchTripDetails(tripId);
      const locationData = await fetchLocationsForTrip(tripId);
      setTripDetails(trip);
      setLocations(locationData);
    } catch (err) {
      setError('Failed to fetch trip details or locations.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdateError('');
      await updateTripStatus(tripId, newStatus);
      // Navigate back to the homepage after updating the status
      navigate('/');
    } catch (err) {
      setStatusUpdateError(err.message || 'Failed to update trip status.');
    }
  };

  const toggleMembersList = () => setShowMembers((prev) => !prev);

  useEffect(() => {
    fetchData();
  }, [tripId]);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="locations-page">
      <div className="locations-header">
        <div className="header-left">
          <h2 className="locations-title">{tripDetails.name}</h2>
          <p className="locations-description">
            {tripDetails.status === 'completed'
              ? 'View past trip locations'
              : 'Explore your trip locations!'}
          </p>
        </div>
        <div className="header-right">
          {tripDetails.status !== 'completed' && (
            <Link to={`/add-location/${tripId}`} className="add-location-link">
              Add Location
            </Link>
          )}
          <button onClick={toggleMembersList} className="toggle-members-button">
            {showMembers ? 'Hide Members' : 'Show Members'}
          </button>
          <select
            className="status-dropdown"
            value={tripDetails.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>
      {statusUpdateError && <p className="error-message">{statusUpdateError}</p>}
      {showMembers && <TripMembersList participants={tripDetails.participants || []} />}
      <LocationsList locations={locations} tripStatus={tripDetails.status} />
    </div>
  );
};

export default LocationsPage;
