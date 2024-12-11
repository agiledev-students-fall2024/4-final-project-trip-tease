import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchActivitiesForLocation } from '../../api/apiUtils';
import ActivityCard from '../cards/ActivityCard';
import './ActivitiesList.css';

const ActivitiesList = ({ locationId, selectedType }) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const loadActivities = async () => {
    try {
      setError(null); // Clear previous errors
      const fetchedActivities = await fetchActivitiesForLocation(locationId);
      // Sort activities by votes in descending order
      setActivities(fetchedActivities.sort((a, b) => b.votes - a.votes));
    } catch (err) {
      setError('Failed to load activities.');
    }
  };

  useEffect(() => {
    loadActivities();
  }, [locationId]);

  const filteredActivities = activities.filter((activity) =>
    selectedType === 'all' ? true : activity.type === selectedType
  );

  return (
    <div className="activities-list">
      {error ? (
        <p className="error-message">{error}</p>
      ) : activities.length === 0 ? (
        <p className="no-activities-message">No activities created yet. Feel free to add one!</p>
      ) : filteredActivities.length === 0 ? (
        <p className="no-activities-message">
          No activities of this type available. Try another filter or add one!
        </p>
      ) : (
        filteredActivities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            refreshActivities={loadActivities}
          />
        ))
      )}
    </div>
  );
};

ActivitiesList.propTypes = {
  locationId: PropTypes.string.isRequired,
  selectedType: PropTypes.string.isRequired,
};

export default ActivitiesList;
