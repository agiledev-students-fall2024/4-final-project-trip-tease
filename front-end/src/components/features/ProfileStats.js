import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import './ProfileStats.css';

const ProfileStats = ({ trips, createdAt }) => {
  let daysMember = 'N/A'; // Default fallback

  if (createdAt) {
    try {
      daysMember = formatDistanceToNow(parseISO(createdAt), { unit: 'day' }).split(' ')[0];
    } catch (error) {
      console.error('Error parsing date:', error.message);
      daysMember = 'N/A'; // Fallback if date parsing fails
    }
  }

  return (
    <div className="profile-stats">
      <div className="profile-stats-item">
        <span className="profile-stats-value">{trips.length}</span>
        <span className="profile-stats-label">Trips</span>
      </div>
      <div className="profile-stats-item">
        <span className="profile-stats-value">{daysMember}</span>
        <span className="profile-stats-label">Member Days</span>
      </div>
    </div>
  );
};

export default ProfileStats;