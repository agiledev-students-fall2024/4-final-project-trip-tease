import React from 'react';
import PropTypes from 'prop-types';
import { upvoteActivity, downvoteActivity } from '../../api/apiUtils';
import './ActivityCard.css';

const ActivityCard = ({ activity, refreshActivities }) => {
  const { id, name, votes, description, price } = activity;

  const handleUpvote = async () => {
    try {
      await upvoteActivity(id);
      refreshActivities();
    } catch (err) {
      console.error('Error upvoting activity:', err);
    }
  };

  const handleDownvote = async () => {
    try {
      await downvoteActivity(id);
      refreshActivities();
    } catch (err) {
      console.error('Error downvoting activity:', err);
    }
  };

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3>{name}</h3>
        <div className="vote-section">
          <button onClick={handleUpvote}>↑</button>
          <span>{votes}</span>
          <button onClick={handleDownvote}>↓</button>
        </div>
      </div>
      <p>{description}</p>
      <p>Price: {price}</p>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    description: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
  refreshActivities: PropTypes.func.isRequired,
};

export default ActivityCard;
