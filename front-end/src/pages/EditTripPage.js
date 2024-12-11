import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditTripForm from '../components/forms/EditTripForm';
import './EditTripPage.css';

const EditTripPage = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const handleTripUpdated = () => {
    navigate(`/locations/${tripId}`); // Navigate back to the trip overview page
  };

  return (
    <div className="edit-trip-page">
      <EditTripForm tripId={tripId} onTripUpdated={handleTripUpdated} />
    </div>
  );
};

export default EditTripPage;
