import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Breadcrumb.css';

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <nav className="breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <span key={index} className="breadcrumb-item">
          {crumb.path ? (
            <Link to={crumb.path} className="breadcrumb-link">
              {crumb.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{crumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && <span className="breadcrumb-separator">/</span>}
        </span>
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Display name of the breadcrumb
      path: PropTypes.string, // Route path; if not provided, the item is the current page
    })
  ).isRequired,
};

export default Breadcrumb;
