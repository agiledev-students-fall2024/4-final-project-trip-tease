import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditLocationForm from '../components/forms/EditLocationForm';
import { deleteLocation, fetchLocationDetails} from '../api/apiUtils';
import './EditLocationPage.css';

const EditLocationPage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();

  const handleLocationUpdated = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleDeleteLocation = async () => {
      try {
          //get the tripId for navigation
          const { tripId } = await fetchLocationDetails(locationId);

          await deleteLocation(locationId);
          navigate(`/locations/${tripId}`); //this navigates to trip page
      } catch (error) {
          console.error('Error deleting location:', error);
          alert('Failed to delete location. Please try again.');
      }
  };

  return (
    <div className="edit-location-page">
      <EditLocationForm locationId={locationId} onLocationUpdated={handleLocationUpdated} />
      <button
            type="button"
            className="form-delete-button"
            onClick={handleDeleteLocation}
        >
            Delete Location
        </button>
    </div>
  );
};

export default EditLocationPage;
