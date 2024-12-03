import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddLocationForm from '../components/forms/AddLocationForm';
import './AddLocationPage.css';

const AddLocationPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const handleLocationCreated = () => {
    navigate(-1); // Navigate back after successfully creating the location
  };

  return (
    <div className="add-location-page">
      <h1>Add New Location</h1>
      <AddLocationForm tripId={tripId} onLocationCreated={handleLocationCreated} />
    </div>
  );
};

export default AddLocationPage;
