import React, { useState } from 'react';
import { createLocation } from '../../api/apiUtils';
import './AddLocationForm.css';

const AddLocationForm = ({ tripId, onLocationCreated }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const locationData = { name, address, tripId };
      const newLocation = await createLocation(locationData);
      onLocationCreated(newLocation); // Callback to handle the newly created location
      setName('');
      setAddress('');
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  return (
    <form className="add-location-form" onSubmit={handleSubmit}>
      <h2>Create Location</h2>
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
        Address:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddLocationForm;
