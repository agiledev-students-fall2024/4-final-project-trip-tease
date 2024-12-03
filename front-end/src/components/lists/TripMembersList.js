import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchTripParticipants } from '../../api/apiUtils';
import './TripMembersList.css';

const TripMembersList = ({ participants }) => {
  return (
    <div className="trip-members-list">
      <h2>Trip Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            <span className="member-avatar">{participant.profileAvatar}</span>
            {participant.name || participant.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

TripMembersList.propTypes = {
  participants: PropTypes.array.isRequired,
};

export default TripMembersList;
