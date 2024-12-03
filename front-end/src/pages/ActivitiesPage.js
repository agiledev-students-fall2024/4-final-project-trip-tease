import React from 'react';
import { useParams } from 'react-router-dom';
import ActivitiesList from '../components/lists/ActivitiesList';
import './ActivitiesPage.css';

const ActivitiesPage = () => {
  const { locationId } = useParams();

  return (
    <div className="activities-page">
      <ActivitiesList locationId={locationId} />
    </div>
  );
};

export default ActivitiesPage;
