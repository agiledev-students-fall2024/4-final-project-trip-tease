import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ActivitiesList from '../components/lists/ActivitiesList';
import { fetchLocationDetails, fetchTripDetails } from '../api/apiUtils'; // Assume fetchTripDetails is available
import './ActivitiesPage.css';

const ActivitiesPage = () => {
  const { locationId } = useParams();
  const [locationDetails, setLocationDetails] = useState({});
  const [tripDetails, setTripDetails] = useState({});
  const [selectedType, setSelectedType] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const locationData = await fetchLocationDetails(locationId);
        setLocationDetails(locationData);
        // Assuming locationData includes tripId
        const tripData = await fetchTripDetails(locationData.tripId);
        setTripDetails(tripData);
      } catch (err) {
        setError('Failed to fetch details');
      }
    };

    loadDetails();
  }, [locationId]);

  const handleFilterChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="activities-page">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="activities-header">
            <div className="header-left">
              <div className="location-info">
                <h2 className="location-name">{locationDetails.name}</h2>
                <p className="location-description">{locationDetails.description || 'Explore activities for this location!'}</p>
              </div>
            </div>
            <div className="header-right">
              {tripDetails.status !== 'completed' && (
                <Link to={`/add-activity/${locationId}`} className="create-activity-link">
                  Create Activity
                </Link>
              )}
            </div>
          </div>
          <div className="filter-container">
            <label htmlFor="activity-filter" className="filter-label">Filter by type:</label>
            <select
              id="activity-filter"
              className="activity-filter"
              value={selectedType}
              onChange={handleFilterChange}
            >
              <option value="all">🌍 All</option>
              <option value="food">🍔 Food</option>
              <option value="activities">🎉 Activities</option>
              <option value="stay">🏨 Stay</option>
            </select>
          </div>
          <ActivitiesList locationId={locationId} selectedType={selectedType} />
        </>
      )}
    </div>
  );
};

export default ActivitiesPage;
