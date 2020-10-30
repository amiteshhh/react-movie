import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './SearchBanner.scss';

const MovieSearchBanner = (props) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onQueryChange(query);
  };

  return (
    <div className="header-search-banner page-padding">
      <Link to="/movie/add" className="btn btn-outline-danger btn-add-movie">
        + ADD MOVIE
      </Link>
      <h3 className="search-banner-title">Find Your Movie</h3>
      <form onSubmit={handleSubmit}>
        <div className="movie-search-bar">
          <input
            type="search"
            autoFocus
            className="form-control input-lg extra-spacer input-black"
            placeholder="What do you want to search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-danger btn-search">
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

MovieSearchBanner.propTypes = {
  onQueryChange: PropTypes.func,
};

export default MovieSearchBanner;
