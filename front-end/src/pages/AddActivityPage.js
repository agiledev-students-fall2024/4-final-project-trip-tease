import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddActivityForm from '../components/forms/AddActivityForm';
import './AddActivityPage.css';

const AddActivity = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(-1); // Navigate back on successful creation
  };

  return (
    <div className="add-activity-page">
      <AddActivityForm locationId={locationId} onActivityCreated={handleSuccess} />
    </div>
  );
};

export default AddActivity;
