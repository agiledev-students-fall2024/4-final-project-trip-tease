import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchTripDetails, updateTripDetails } from '../../api/apiUtils';
import './EditTripForm.css';

const EditTripForm = ({ tripId, onTripUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    image: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadTripDetails = async () => {
      try {
        const tripDetails = await fetchTripDetails(tripId);
        setFormData({
          name: tripDetails.name || '',
          description: tripDetails.description || '',
          startDate: tripDetails.startDate ? tripDetails.startDate.split('T')[0] : '',
          endDate: tripDetails.endDate ? tripDetails.endDate.split('T')[0] : '',
          image: tripDetails.image || '',
        });
      } catch (err) {
        setError('Failed to load trip details. Please try again.');
      }
    };

    loadTripDetails();
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTripDetails(tripId, formData);
      setSuccessMessage('Trip details updated successfully!');
      setTimeout(() => {
        onTripUpdated();
      }, 10);
    } catch (err) {
      setError('Failed to update trip details. Please try again.');
    }
  };

  return (
    <form className="edit-trip-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit Trip</h2>
      {error && <p className="form-error">{error}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

      <div className="form-group">
        <label htmlFor="name">Trip Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="E.g., California Road Trip"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your trip..."
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          id="image"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="E.g., https://example.com/image.jpg"
        />
      </div>

      <button type="submit" className="form-submit-button">
        Update Trip
      </button>
    </form>
  );
};

EditTripForm.propTypes = {
  tripId: PropTypes.string.isRequired,
  onTripUpdated: PropTypes.func.isRequired,
};

export default EditTripForm;
