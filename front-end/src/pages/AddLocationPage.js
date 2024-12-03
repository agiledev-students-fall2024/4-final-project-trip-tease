import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createLocation } from '../api/apiUtils';
import AddLocationForm from '../components/forms/AddLocationForm';
import './AddLocationPage.css';

const AddLocation = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = async (location) => {
    try {
      await createLocation({ ...location, tripId });
      navigate(-1);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <div className="add-location-page">
      <AddLocationForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddLocation;
