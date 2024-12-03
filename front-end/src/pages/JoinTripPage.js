import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { joinTrip } from '../api/apiUtils';
import './JoinTripPage.css';

const JoinTrip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tripId, setTripId] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    setTripId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    try {
      const response = await joinTrip(user.id, tripId); // Use the imported function
      setFeedback({
        type: 'success',
        message: (
          <>
            Successfully joined the trip! <Link to={`/locations/${tripId}`}>View Trip</Link>
          </>
        ),
      });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Failed to join trip.' });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="join-trip-page">
      <h2>Join a Trip</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Trip ID:
          <input
            type="text"
            value={tripId}
            onChange={handleInputChange}
            placeholder="Enter Trip ID"
            required
          />
        </label>
        <button type="submit">Join Trip</button>
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
      </form>
      {feedback.message && (
        <p className={`join-trip-${feedback.type === 'success' ? 'success' : 'error'}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
};

export default JoinTrip;
