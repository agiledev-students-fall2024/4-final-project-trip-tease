import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      await joinTrip(user?.id, tripId);
      setFeedback({ type: 'success', message: 'Successfully joined the trip!' });
      // Navigate to home after showing success
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Failed to join the trip.' });
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to home
  };

  return (
    <div className="join-trip-page">
      <h2>Join a Trip</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="tripId">Trip ID:</label>
          <input
            type="text"
            id="tripId"
            value={tripId}
            onChange={handleInputChange}
            placeholder="Enter Trip ID"
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="join-button">Join Trip</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
      {feedback.message && (
        <p className={`feedback-message ${feedback.type === 'success' ? 'success' : 'error'}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
};

export default JoinTrip;
