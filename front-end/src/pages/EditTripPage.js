import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditTripForm from '../components/forms/EditTripForm';
import './EditTripPage.css';
import { deleteTrip } from '../api/apiUtils';

const EditTripPage = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const handleTripUpdated = () => {
    navigate(`/locations/${tripId}`); // Navigate back to the trip overview page
  };

  const handleDeleteTrip = async () => {
    try{
      await deleteTrip(tripId);
      navigate('/'); //navigate back to user home page
    }catch(error){
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip. Please try again.');
    }
  }

  return (
    <div className="edit-trip-page">
      <EditTripForm tripId={tripId} onTripUpdated={handleTripUpdated} />
      <button
            type="button"
            className="form-delete-button"
            onClick={handleDeleteTrip}
      >
            Delete Trip
      </button>
    </div>
  );
};

export default EditTripPage;
