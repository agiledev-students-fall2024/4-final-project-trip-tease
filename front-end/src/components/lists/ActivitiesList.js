import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchActivitiesForLocation } from '../../api/apiUtils';
import ActivityCard from '../cards/ActivityCard';
import './ActivitiesList.css';

const ActivitiesList = ({ locationId }) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const loadActivities = async () => {
    try {
      const activities = await fetchActivitiesForLocation(locationId);
      setActivities(activities.sort((a, b) => b.votes - a.votes));
    } catch (err) {
      setError('Failed to fetch activities');
    }
  };

  useEffect(() => {
    loadActivities();
  }, [locationId]);

  return (
    <div className="activity-list">
      {error ? (
        <p>{error}</p>
      ) : (
        activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            refreshActivities={loadActivities} // Pass `loadActivities` as a prop
          />
        ))
      )}
    </div>
  );
};

ActivitiesList.propTypes = {
  locationId: PropTypes.string.isRequired,
};

export default ActivitiesList;
