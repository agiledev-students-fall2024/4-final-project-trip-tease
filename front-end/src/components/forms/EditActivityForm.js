import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { editActivity, fetchActivityDetails } from '../../api/apiUtils';
import './EditActivityForm.css';

const EditActivityForm = ({ activityId, onActivityEdited }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    type: 'food', // Default type
    isCompleted: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const activityData = await fetchActivityDetails(activityId);
        setFormData({
          name: activityData.name,
          description: activityData.description,
          price: activityData.price,
          type: activityData.type,
          isCompleted: activityData.isCompleted
        });
      } catch (err) {
        setError('Failed to load activity details');
        console.error(err.message);
      }
    };

    if (activityId) {
      initializeForm();
    }
  }, [activityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedActivity = await editActivity(activityId, formData);
      onActivityEdited(updatedActivity);
    } catch (err) {
      setError('Failed to update activity');
      console.error('Error updating activity:', err.message);
    }
  };

  return (
    <form className="edit-activity-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <h2>Edit Activity</h2>

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

        <div className="form-group">
            <label htmlFor="isCompleted">Status:</label>
            <select
                id="isCompleted"
                name="isCompleted"
                value={formData.isCompleted}
                onChange={(e) =>
                setFormData((prev) => ({
                    ...prev,
                    isCompleted: e.target.value === 'true', // workaround to convert string to boolean
                }))
                }
            >
                <option value="false">Ongoing</option>
                <option value="true">Completed</option>
            </select>
        </div>

      <button type="submit" className="form-submit-button">
        Update Activity
      </button>
    </form>
  );
};

EditActivityForm.propTypes = {
  activityId: PropTypes.string.isRequired,
  onActivityEdited: PropTypes.func.isRequired,
};

export default EditActivityForm;
