import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditActivityForm from '../components/forms/EditActivityForm';
import { deleteActivity } from '../api/apiUtils';

import './EditActivityPage.css';

const EditActivityPage = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(-1); // Navigate back on successful creation
  };

const handleDeleteActivity = async () => {
    try {
        await deleteActivity(activityId);
        handleSuccess();
    } catch (error) {
        console.error('Error deleting activity:', error);
        alert('Failed to delete activity. Please try again.');
    }
};
  

  return (
    <div className="edit-activity-page">
        <EditActivityForm activityId={activityId} onActivityEdited={handleSuccess} />
        <button
            type="button"
            className="form-delete-button"
            onClick={handleDeleteActivity}
        >
            Delete Activity
        </button>
    </div>
  );
};

export default EditActivityPage;