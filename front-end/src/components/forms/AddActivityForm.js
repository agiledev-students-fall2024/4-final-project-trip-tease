import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createActivity, fetchLocationDetails, fetchUserProfile } from '../../api/apiUtils';
import './AddActivityForm.css';

const AddActivityForm = ({ locationId, onActivityCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    type: 'food', // Default type
    tripId: '',
    createdBy: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const locationData = await fetchLocationDetails(locationId);
        const userData = await fetchUserProfile();
        setFormData((prev) => ({
          ...prev,
          tripId: locationData.tripId,
          createdBy: userData._id,
        }));
      } catch (err) {
        setError('Failed to initialize form');
        console.error(err.message);
      }
    };
    initializeForm();
  }, [locationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newActivity = await createActivity({ ...formData, locationId });
      onActivityCreated(newActivity);
      setFormData({ name: '', description: '', price: 0, type: 'food', tripId: '', createdBy: '' });
    } catch (err) {
      setError('Failed to create activity');
      console.error('Error creating activity:', err.message);
    }
  };

  return (
    <form className="add-activity-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <h2>Create Activity</h2>

      <div className="form-group">
        <label htmlFor="activity-name">Activity Name:</label>
        <input
          id="activity-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="E.g., Walk in the park"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="E.g., A relaxing stroll through the park with friends"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <select id="price" name="price" value={formData.price} onChange={handleChange}>
          <option value={0}>Free</option>
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="food">🍔 Food</option>
          <option value="activities">🎉 Activities</option>
          <option value="stay">🏨 Stay</option>
        </select>
      </div>

      <button type="submit" className="form-submit-button">
        Create Activity
      </button>
    </form>
  );
};

AddActivityForm.propTypes = {
  locationId: PropTypes.string.isRequired,
  onActivityCreated: PropTypes.func.isRequired,
};

export default AddActivityForm;
