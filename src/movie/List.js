import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MovieCard } from './Card';
import { GENRES, MOVIE_SORT_CRITERIA, DEFAULT_GENRE } from '../consts/MovieConst';

import { getMoviesByFilter } from '../redux/selectors';
import {
  deleteMovie,
  filterMoviesByGenre,
  filterMoviesByQuery,
  sortMovies,
} from '../redux/actions';

const mapStateToProps = (state) => ({
  movies: getMoviesByFilter(state),
  activeGenre: state.activeGenre,
  sortKey: state.sortKey,
});
const mapDispatchToProps = {
  filterMoviesByGenre,
  sortMovies,
  filterMoviesByQuery,
  deleteMovie,
};

class _MovieList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.handleQueryChange();
    }
  }

  /** Filter movie by given query text, then reset the genre to `All` and finally sort it */
  handleQueryChange() {
    this.props.filterMoviesByQuery(this.props.query);
  }

  /**
   * Filter as per genre and sort
   * @param {string} genre All, Horror, Comedy etc
   */
  handleGenreClick(genre) {
    this.props.filterMoviesByGenre(genre);
  }

  /** Handles sorting event */
  handleSortChange = (event) => {
    this.props.sortMovies(event.target.value);
  };

  handleDeleteClick = (movieToDelete) => {
    this.props.deleteMovie(movieToDelete);
  };

  handleDetailsClick = (movieParam) => {
    this.props.onDetailsClick(movieParam);
  };

  render() {
    return (
      <div className="content-container movie-list-wrapper">
        <div className="flex-center-v text-white movie-list-toolbar">
          {[DEFAULT_GENRE, ...GENRES].map((genre) => (
            <button
              onClick={this.handleGenreClick.bind(this, genre)}
              className={classnames({
                'btn text-white text-uppercase movie-list-toolbar-item': true,
                'btn-active': this.props.activeGenre === genre,
              })}
              key={genre}
            >
              {genre}
            </button>
          ))}
          <span className="extra-spacer movie-list-toolbar-item">&nbsp;</span>
          <label
            className="text-dim-white movie-list-toolbar-item"
            htmlFor="movieSortDropdown"
          >
            SORT BY
          </label>
          <select
            className="form-control sort-dropdown text-white movie-list-toolbar-item"
            id="movieSortDropdown"
            onChange={this.handleSortChange}
          >
            {MOVIE_SORT_CRITERIA.map((sortCriteria) => (
              <option key={sortCriteria.code} value={sortCriteria.code}>
                {sortCriteria.label}
              </option>
            ))}
          </select>
        </div>
        <div className="container-side-margin text-white">
          <strong>{this.props.movies.length}</strong> movies found.
        </div>
        <div className="flex-grid movie-grid">
          {this.props.movies.map((movie, i) => (
            <MovieCard
              movie={movie}
              key={i}
              onDeleteClick={this.handleDeleteClick}
              onDetailsClick={this.handleDetailsClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

_MovieList.propTypes = {
  query: PropTypes.string,
  onDetailsClick: PropTypes.func,
};

export const MovieList = connect(mapStateToProps, mapDispatchToProps)(_MovieList);
