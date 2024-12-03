import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createLocation } from '../../api/apiUtils';
import './AddLocationForm.css';

const AddLocationForm = ({ tripId, onLocationCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLocation = await createLocation({ ...formData, tripId });
      onLocationCreated(newLocation); // Notify parent about the new location
      setFormData({ name: '', address: '' }); // Clear form
    } catch (err) {
      setError('Failed to create location. Please try again.');
      console.error('Error creating location:', err.message);
    }
  };

  return (
    <form className="add-location-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="name">Location Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="E.g., Golden Gate Bridge"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="E.g., San Francisco, CA"
          required
        />
      </div>

      <button type="submit" className="form-submit-button">
        Create Location
      </button>
    </form>
  );
};

AddLocationForm.propTypes = {
  tripId: PropTypes.string.isRequired,
  onLocationCreated: PropTypes.func.isRequired,
};

export default AddLocationForm;
