import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActivitiesForLocation } from '../api/apiUtils';
import GroupTripPictureCard from '../components/cards/GroupTripPictureCard';
import PastActivityCard from '../components/cards/PastActivityCard';
import './PastTripPage.css';

const PastTrip = () => {
  const { locationId } = useParams();
  const [activities, setActivities] = useState([]);
  const [locationName, setLocationName] = useState('Past Trip Details');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const activitiesData = await fetchActivitiesForLocation(locationId);
        setActivities(activitiesData);
        if (activitiesData.length > 0) {
          setLocationName(activitiesData[0]?.locationName || 'Past Trip Details');
        }
      } catch (err) {
        console.error('Error fetching past trip activities:', err);
        setError('Failed to load past trip data.');
      }
    };

    fetchLocationData();
  }, [locationId]);

  return (
    <div className="past-activities-page">
      <GroupTripPictureCard tripName={locationName} tripId={locationId} />

      <div className="past-tabs">
        <button>Food</button>
        <button>Activities</button>
        <button>Stay</button>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="past-activity-list">
          {activities.map((activity) => (
            <PastActivityCard
              key={activity.id}
              title={activity.name}
              description={activity.description}
              price={activity.price ? `$${activity.price}` : 'Free'}
              comments={activity.comments.map((c) => c.commentString)}
              imageUrl={activity.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PastTrip;
