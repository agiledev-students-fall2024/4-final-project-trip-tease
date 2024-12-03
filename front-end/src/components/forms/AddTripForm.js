import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTrip } from '../../api/apiUtils';
import './AddTripForm.css';

const AddTripForm = ({ onTripCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTrip = await createTrip(formData);
      onTripCreated(newTrip); // Notify parent of the new trip
      setFormData({ name: '', description: '', startDate: '', endDate: '' }); // Reset form
    } catch (err) {
      setError('Failed to create trip. Please try again.');
      console.error('Error creating trip:', err.message);
    }
  };

  return (
    <form className="add-trip-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Trip</h2>
      {error && <p className="form-error">{error}</p>}

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

      <button type="submit" className="form-submit-button">
        Create Trip
      </button>
    </form>
  );
};

AddTripForm.propTypes = {
  onTripCreated: PropTypes.func.isRequired,
};

export default AddTripForm;
