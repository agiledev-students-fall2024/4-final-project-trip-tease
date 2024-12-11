import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { upvoteActivity, downvoteActivity, fetchUserById, updateActivityStatus, fetchTripDetails, fetchLocationDetails } from '../../api/apiUtils';
import ActivityComments from '../features/ActivityComments';
import './ActivityCard.css';

const typeToEmoji = {
  food: '🍔',
  activities: '🎉',
  stay: '🏨',
  default: '🎯',
};

const priceToDollarSigns = (price) => {
  if (price === 0) return 'Free';
  return '$'.repeat(price);
};

const ActivityCard = ({ activity, refreshActivities }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [createdByUsername, setCreatedByUsername] = useState('Loading...');
  const [isAnimating, setIsAnimating] = useState(false); // For vote animation
  const [activityStatus, setActivityStatus] = useState(activity.isCompleted ? 'Completed' : 'Ongoing');
  const [tripDetails, setTripDetails] = useState({});
  const [error, setError] = useState(null); // Added error handling state
  const { locationId } = useParams();

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const user = await fetchUserById(activity.createdBy);
        setCreatedByUsername(user.username || 'Unknown User');
      } catch (err) {
        console.error('Error fetching username:', err.message);
        setCreatedByUsername('Unknown User');
      }
    };

    loadUsername();
  }, [activity.createdBy]);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const locationData = await fetchLocationDetails(locationId);
        // Assuming locationData includes tripId
        const tripData = await fetchTripDetails(locationData.tripId);
        setTripDetails(tripData);
      } catch (err) {
        setError('Failed to fetch details');
      }
    };

    loadDetails();
  }, [locationId]); // Missing dependency for useEffect

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value === 'Completed';
    setActivityStatus(newStatus ? 'Completed' : 'Ongoing');

    try {
      await updateActivityStatus(activity._id, newStatus);
      refreshActivities();
    } catch (error) {
      console.error('Error updating activity status:', error);
    }
  };

  const handleVoteAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleUpvote = async () => {
    try {
      await upvoteActivity(activity._id);
      handleVoteAnimation();
      refreshActivities();
    } catch (err) {
      console.error('Error upvoting activity:', err.message);
    }
  };

  const handleDownvote = async () => {
    try {
      await downvoteActivity(activity._id);
      handleVoteAnimation();
      refreshActivities();
    } catch (err) {
      console.error('Error downvoting activity:', err.message);
    }
  };

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className="activity-card">
      <div className="activity-card-container">
        <div className="activity-emoji">
          <span>{typeToEmoji[activity.type] || typeToEmoji.default}</span>
        </div>
        <div className="activity-details">
          <h3 className="activity-title">{activity.name}</h3>
          <p className="activity-description">
            {activity.description || 'No description available.'}
          </p>
          <div className="activity-meta">
            <span className="meta-item">
              <strong>Type:</strong> {activity.type}
            </span>
            <span className="meta-item">
              <strong>Price:</strong> {priceToDollarSigns(activity.price)}
            </span>
            <span className="meta-item">
              <strong>Created By:</strong> {createdByUsername}
            </span>
            <span className="meta-item">
              <strong>Created At:</strong> {new Date(activity.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <span className="meta-item">
        {tripDetails.status !== 'completed' && (
            <div className="status-dropdown">
              <strong>Status:</strong>
              <select value={activityStatus} onChange={handleStatusChange}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>)}
            </span>
            {tripDetails.status !== 'completed' && (
              <div className="activity-votes">
                <button onClick={handleUpvote} className="vote-button upvote">
                  <span className="emoji">👍</span>
                </button>
                <span className={`vote-count ${isAnimating ? 'vote-animate' : ''}`}>
                  {activity.votes}
                </span>
                <button onClick={handleDownvote} className="vote-button downvote">
                  <span className="emoji">👎</span>
                </button>
              </div>
            )}
      </div>
      <div className="activity-footer">
        <button onClick={toggleComments} className="toggle-comments-button">
          {isCommentsVisible ? 'Hide Comments' : `Show Comments (${activity.comments.length})`}
        </button>
        {isCommentsVisible && (
          <ActivityComments
            activityId={activity._id}
            comments={activity.comments}
            refreshActivities={refreshActivities}
          />
        )}
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    comments: PropTypes.array.isRequired,
    type: PropTypes.string,
    isCompleted: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  refreshActivities: PropTypes.func.isRequired,
};

export default ActivityCard;
