import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import './ProfileStats.css';

const ProfileStats = ({ trips, createdAt }) => {
  const daysMember = formatDistanceToNow(parseISO(createdAt), { unit: 'day' });

  return (
    <div className="profile-stats">
      <div className="profile-stats-item">
        <span className="profile-stats-value">{trips.length}</span>
        <span className="profile-stats-label">Trips</span>
      </div>
      <div className="profile-stats-item">
        <span className="profile-stats-value">{daysMember.split(' ')[0]}</span>
        <span className="profile-stats-label">Member Days</span>
      </div>
    </div>
  );
};

export default ProfileStats;
