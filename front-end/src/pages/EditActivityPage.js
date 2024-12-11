import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditActivityForm from '../components/forms/EditActivityForm';
import './EditActivityPage.css';

const EditActivityPage = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(-1); // Navigate back on successful creation
  };

  return (
    <div className="edit-activity-page">
      <EditActivityForm activityId={activityId} onActivityEdited={handleSuccess} />
    </div>
  );
};

export default EditActivityPage;