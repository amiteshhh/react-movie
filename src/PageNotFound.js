import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="router-page router-page-common page-not-found-container">
      <h1 className="page-not-found-heading">Page Not Foud</h1>
      <Link to="/" className="btn btn-outline-danger margin-0-auto">
        GO BACK TO HOME
      </Link>
    </div>
  );
};
export default PageNotFound;
