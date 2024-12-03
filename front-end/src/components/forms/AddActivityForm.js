import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createActivity } from '../../api/apiUtils';
import './AddActivityForm.css';

const AddActivityForm = ({ locationId, onActivityCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const activityData = { name, description, price, locationId };
      const newActivity = await createActivity(activityData);
      onActivityCreated(newActivity); // Notify parent about the new activity
      setName('');
      setDescription('');
      setPrice('');
    } catch (err) {
      setError('Failed to create activity');
      console.error('Error creating activity:', err);
    }
  };

  return (
    <form className="add-activity-form" onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <h2>Create Activity</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

AddActivityForm.propTypes = {
  locationId: PropTypes.string.isRequired,
  onActivityCreated: PropTypes.func.isRequired,
};

export default AddActivityForm;
