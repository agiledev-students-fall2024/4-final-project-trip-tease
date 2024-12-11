import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchLocationDetails, updateLocationDetails } from '../../api/apiUtils';
import './EditLocationForm.css';

const EditLocationForm = ({ locationId, onLocationUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadLocationDetails = async () => {
      try {
        const locationDetails = await fetchLocationDetails(locationId);
        setFormData({
          name: locationDetails.name || '',
          address: locationDetails.address || '',
          image: locationDetails.image || 'https://picsum.photos/200',
        });
      } catch (err) {
        setError('Failed to load location details. Please try again.');
      }
    };

    loadLocationDetails();
  }, [locationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLocationDetails(locationId, formData);
      setSuccessMessage('Location details updated successfully!');
      setTimeout(() => {
        onLocationUpdated();
      }, 10);
    } catch (err) {
      setError('Failed to update location. Please try again.');
    }
  };

  return (
    <form className="edit-location-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit Location</h2>
      {error && <p className="form-error">{error}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

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
        Update Location
      </button>
    </form>
  );
};

EditLocationForm.propTypes = {
  locationId: PropTypes.string.isRequired,
  onLocationUpdated: PropTypes.func.isRequired,
};

export default EditLocationForm;
