import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../api/apiUtils';
import './AddTripPage.css';

const AddTrip = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTrip(tripData);
      navigate(-1);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div className="add-trip-page">
      <h2>Create New Trip</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Trip Name:
          <input
            type="text"
            name="name"
            value={tripData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>Start Date:
          <input
            type="date"
            name="startDate"
            value={tripData.startDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>End Date:
          <input
            type="date"
            name="endDate"
            value={tripData.endDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>Description:
          <textarea
            name="description"
            value={tripData.description}
            onChange={handleInputChange}
            placeholder="Describe your trip..."
            rows="4"
          />
        </label>

        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
};

export default AddTrip;
