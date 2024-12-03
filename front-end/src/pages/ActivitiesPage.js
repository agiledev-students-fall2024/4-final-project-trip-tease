import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ActivitiesList from '../components/lists/ActivitiesList';
import { fetchLocationDetails } from '../api/apiUtils'; // API function for location details
import './ActivitiesPage.css';

const ActivitiesPage = () => {
  const { locationId } = useParams();
  const [locationDetails, setLocationDetails] = useState({});
  const [selectedType, setSelectedType] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    const loadLocationDetails = async () => {
      try {
        const details = await fetchLocationDetails(locationId);
        setLocationDetails(details);
      } catch (err) {
        setError('Failed to fetch location details');
      }
    };

    loadLocationDetails();
  }, [locationId]);

  const handleFilterChange = (event) => {
    setSelectedType(event.target.value);
=======
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
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
      <GroupTripPictureCard tripName={locationName} tripId={locationId} />

      <div className="tabs">
        {/* <button>Food</button>
        <button>Activities</button>
        <button>Stay</button> */}
        <Link to={`/add-activity/${locationId}`} className="add-activity-link">
          Create Activity
        </Link>
      </div>

>>>>>>> origin/master
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
<<<<<<< HEAD
        <>
          <div className="activities-header">
            <div className="header-left">
              <div className="location-info">
                <h2 className="location-name">{locationDetails.name}</h2>
                <p className="location-description">{locationDetails.description || 'Explore activities for this location!'}</p>
              </div>
            </div>
            <div className="header-right">
              <Link to={`/add-activity/${locationId}`} className="create-activity-link">
                Create Activity
              </Link>
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
=======
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
>>>>>>> origin/master
      )}
    </div>
  );
};

export default ActivitiesPage;
