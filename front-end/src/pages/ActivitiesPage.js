import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupTripPictureCard from '../components/activities/GroupTripPictureCard';
import ActivityCard from '../components/activities/ActivityCard';
import './ActivitiesPage.css';
import { Link, useParams } from 'react-router-dom';

const ActivitiesPage = () => {
  const { locationId } = useParams();
  const [activities, setActivities] = useState([]);
  const [locationName, setLocationName] = useState("Activities");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/locations/${locationId}`)
      .then((locationResponse) => {
        setLocationName(locationResponse.data.name);
        return axios.get(`/locations/activities/${locationId}`);
      })
      .then((activitiesResponse) => {
        const sortedActivities = activitiesResponse.data.sort((a, b) => b.votes - a.votes);
        setActivities(sortedActivities);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch activities or location details');
      });
  }, [locationId]);

  const toggleCompletion = (activityId) => {
    axios.put(`/activities/${activityId}/toggle-completion`)
      .then((response) => {
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === activityId
              ? { ...activity, isCompleted: response.data.isCompleted }
              : activity
          )
        );
      })
      .catch((error) => {
        console.error('Error toggling completion status:', error);
      });
  };

  const handleUpvote = (activityId) => {
    axios.post(`/activities/${activityId}/upvote`)
      .then((response) => {
        setActivities((prevActivities) => {
          const updatedActivities = prevActivities.map((activity) =>
            activity.id === activityId ? { ...activity, votes: response.data.votes } : activity
          );
          return updatedActivities.sort((a, b) => b.votes - a.votes);
        });
      })
      .catch((error) => {
        console.error('Error upvoting activity:', error);
      });
  };

  const handleDownvote = (activityId) => {
    axios.post(`/activities/${activityId}/downvote`)
      .then((response) => {
        setActivities((prevActivities) => {
          const updatedActivities = prevActivities.map((activity) =>
            activity.id === activityId ? { ...activity, votes: response.data.votes } : activity
          );
          return updatedActivities.sort((a, b) => b.votes - a.votes);
        });
      })
      .catch((error) => {
        console.error('Error downvoting activity:', error);
      });
  };

  const handleAddComment = (activityId, newComment) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, comments: [...activity.comments, newComment] }
          : activity
      )
    );
  };

  return (
    <div className="activities-page">
      <GroupTripPictureCard tripName={locationName} tripId={locationId} />

      <div className="tabs">
        {/* <button>Food</button>
        <button>Activities</button>
        <button>Stay</button> */}
        <Link to={`/add-activity/${locationId}`} className="add-activity-link">
          Create Activity
        </Link>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              title={activity.name}
              votes={activity.votes}
              description={activity.description}
              price={activity.price ? `$${activity.price}` : 'Free'}
              comments={activity.comments || []} 
              imageUrl={activity.image}
              isCompleted={activity.isCompleted}
              onUpvote={() => handleUpvote(activity.id)}
              onDownvote={() => handleDownvote(activity.id)}
              onAddComment={handleAddComment} 
              toggleCompletion={toggleCompletion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
