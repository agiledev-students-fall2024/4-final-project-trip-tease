import React from 'react';
import PropTypes from 'prop-types';
import LocationCard from '../cards/LocationCard';
import './LocationsList.css';

const LocationsList = ({ locations }) => {
  if (!locations.length) return <p>No locations found for this trip.</p>;

  return (
    <div className="locations-list">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

LocationsList.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default LocationsList;
