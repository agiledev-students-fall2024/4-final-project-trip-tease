import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddTripForm from '../components/forms/AddTripForm';
import './AddTripPage.css';

const AddTripPage = () => {
  const navigate = useNavigate();

  const handleTripCreated = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="add-trip-page">
      {/* <h1>Create New Trip</h1> */}
      <AddTripForm onTripCreated={handleTripCreated} />
    </div>
  );
};

export default AddTripPage;
