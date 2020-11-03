import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="router-page router-page-common page-not-found-container">
      <div>
        <h1 className="page-not-found-heading">Page Not Foud</h1>
        <Link to="/" className="btn btn-outline-danger">
          GO BACK TO HOME
        </Link>
      </div>
    </div>
  );
};
