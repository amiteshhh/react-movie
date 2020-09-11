import React, { useState, useEffect } from 'react';

import './Details.scss';

export function MovieDetails(props) {
  const [movie, setMovie] = useState(props.movie);
  useEffect(() => {
    // action here
    setMovie(props.movie);
  }, [props.movie]); // checks for changes in the values in this array

  const handleSearchIconClick = () => {
    props.onSearchIconClick();
  };

  return (
    <div className="header-search-banner text-white">
      <i
        className="fa fa-search fa-lg text-danger"
        role="button"
        title="Return to search"
        onClick={handleSearchIconClick}
        style={{ float: 'right' }}
        area-hidden="true"
      ></i>
      <div className="movie-details-card">
        <img
          className="movie-details-card-img"
          src={movie.poster_path}
          alt="Poster"
        />
        <div className="movie-details-card-body extra-spacer text-dim-white">
          <h1 className="movie-details-title">
            {movie.title} <span className="rating">{movie.vote_average}</span>
          </h1>
          <h5 className="movie-details-subtitle">{movie.tagline}</h5>
          <p className="movie-details-yr-runtime">
            <span className="text-danger mr-3">
              {movie.release_date.split('-')[0]}
            </span>
            <span className="text-danger">{movie.runtime} min</span>
          </p>
          <p className="movie-card-sub-title">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
