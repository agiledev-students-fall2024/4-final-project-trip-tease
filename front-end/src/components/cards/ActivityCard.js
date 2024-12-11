import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { upvoteActivity, downvoteActivity, fetchUserById } from '../../api/apiUtils'; // Ensure you have these API functions in place
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

  const toggleComments = () => setIsCommentsVisible(!isCommentsVisible);

  const handleVoteAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // Animation lasts 500ms
  };

  const handleUpvote = async () => {
    try {
      // Ensure you use correct endpoint and activity._id
      await upvoteActivity(activity._id);
      handleVoteAnimation(); // Trigger animation
      refreshActivities(); // Reload the activities
    } catch (err) {
      console.error('Error upvoting activity:', err.message);
    }
  };

  const handleDownvote = async () => {
    try {
      // Ensure you use correct endpoint and activity._id
      await downvoteActivity(activity._id);
      handleVoteAnimation(); // Trigger animation
      refreshActivities(); // Reload the activities
    } catch (err) {
      console.error('Error downvoting activity:', err.message);
    }
  };

  const activityEmoji = typeToEmoji[activity.type] || typeToEmoji.default;

  return (
    <div className="activity-card">
      <div className="activity-card-container">
        {/* Emoji Section */}
        <div className="activity-emoji">
          <span>{activityEmoji}</span>
        </div>

        {/* Details Section */}
        <div className="activity-details">
          <h3 className="activity-title">{activity.name}</h3>
          <p className="activity-description">
            {activity.description || 'No description available.'}
          </p>
          <div className="activity-meta">
            <span className="meta-item important">
              <strong>Type:</strong> {activity.type}
            </span>
            <span className="meta-item important">
              <strong>Price:</strong> {priceToDollarSigns(activity.price)}
            </span>
            <span className="meta-item important">
              <strong>Status:</strong> {activity.isCompleted ? 'Completed' : 'Ongoing'}
            </span>
            <span className="meta-item">
              <strong>Created By:</strong> {createdByUsername}
            </span>
            <span className="meta-item">
              <strong>Created At:</strong> {new Date(activity.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Link to={`/edit-activity/${activity._id}`} className="edit-activity-link">
            Edit Activity
          </Link>
        </div>

        {/* Votes Section */}
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
      </div>

      {/* Footer Section */}
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
    _id: PropTypes.string.isRequired, // Use _id instead of id for consistency
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    comments: PropTypes.array.isRequired,
    type: PropTypes.string,
    isCompleted: PropTypes.bool,
    cachedUsername: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  refreshActivities: PropTypes.func.isRequired,
};

export default ActivityCard;
