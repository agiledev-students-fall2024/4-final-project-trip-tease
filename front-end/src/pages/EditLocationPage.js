import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditLocationForm from '../components/forms/EditLocationForm';
import './EditLocationPage.css';

const EditLocationPage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();

  const handleLocationUpdated = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="edit-location-page">
      <EditLocationForm locationId={locationId} onLocationUpdated={handleLocationUpdated} />
    </div>
  );
};

export default EditLocationPage;
