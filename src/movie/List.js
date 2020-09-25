import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MovieCard } from './Card';
import {
  GENRES,
  MOVIE_SORT_CRITERIA,
  MOVIE_LIST,
  DEFAULT_GENRE,
} from '../consts/MovieConst';

export class MovieList extends Component {
  constructor(props) {
    super(props);
    this.allMovies = MOVIE_LIST;

    this.sortCriteriaList = MOVIE_SORT_CRITERIA;
    this.sortKey = this.sortCriteriaList[0].code;
    const filteredMovies = this.sortMovie(this.sortKey, this.allMovies);
    this.state = { activeGenre: DEFAULT_GENRE, filteredMovies };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.filterMoviesByQuery();
    }
  }

  /** Filter movie by given query text, then reset the genre to `All` and finally sort it */
  filterMoviesByQuery() {
    const query = this.props.query.toLowerCase();
    let filteredMovies = !query
      ? this.allMovies
      : this.allMovies.filter((movie) => movie.title.toLowerCase().includes(query));
    filteredMovies = this.sortMovie(this.sortKey, filteredMovies);
    this.setState({ activeGenre: DEFAULT_GENRE, filteredMovies });
  }

  /**
   * Filter as per genre and sort
   * @param {string} genre All, Horror, Comedy etc
   */
  handleGenreClick(genre) {
    let filteredMovies =
      genre === DEFAULT_GENRE
        ? this.allMovies
        : this.allMovies.filter((movie) => movie.genres.includes(genre));
    filteredMovies = this.sortMovie(this.sortKey, filteredMovies);
    this.setState({ activeGenre: genre, filteredMovies });
  }

  /** Handles sorting event */
  handleSortChange = (event) => {
    this.sortKey = event.target.value;
    const filteredMovies = this.sortMovie(this.sortKey, [
      ...this.state.filteredMovies,
    ]);
    this.setState({ filteredMovies });
  };

  /** Sort the movie by custom comparator function */
  sortMovie(sortKey, movies) {
    return movies.sort((obj1, obj2) => {
      let val1 = obj1[sortKey] || '';
      let val2 = obj2[sortKey] || '';
      if (Array.isArray(val1)) {
        // `genres` contains array value
        val1 = val1.join();
        val2 = val2.join();
      }
      return val1.localeCompare(val2);
    });
  }

  handleDeleteClick = (movieToDelete) => {
    const filteredMovies = this.state.filteredMovies.filter(
      (movie) => movie !== movieToDelete
    );
    this.setState({ filteredMovies });
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
                'btn-active': this.state.activeGenre === genre,
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
            {this.sortCriteriaList.map((sortCriteria) => (
              <option key={sortCriteria.code} value={sortCriteria.code}>
                {sortCriteria.label}
              </option>
            ))}
          </select>
        </div>
        <div className="container-side-margin text-white">
          <strong>{this.state.filteredMovies.length}</strong> movies found.
        </div>
        <div className="flex-grid movie-grid">
          {this.state.filteredMovies.map((movie, i) => (
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

MovieList.propTypes = {
  query: PropTypes.string,
  onDetailsClick: PropTypes.func,
};
