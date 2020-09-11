import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from './Card';
import { genres, movieSortCritera, movieList } from './Const';

export class MovieList extends Component {
  constructor(props) {
    super(props);
    this.allMovies = movieList;

    this.sortCriteriaList = movieSortCritera;
    this.sortKey = this.sortCriteriaList[0].code;
    const sortedMovies = this.sortMovie(this.sortKey, this.allMovies);
    this.state = { activeGenre: genres[0], filteredMovies: sortedMovies };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.filterMoviesByQuery();
    }
  }

  /** Filter movie by given query text, then reset the genre to `All` and finally sort it */
  filterMoviesByQuery() {
    const query = this.props.query.toLowerCase();
    const filteredMovies = !query
      ? this.allMovies
      : this.allMovies.filter((movie) => movie.title.toLowerCase().includes(query));
    const sortedMovies = this.sortMovie(this.sortKey, filteredMovies);
    this.setState({ activeGenre: 'All', filteredMovies: sortedMovies });
  }

  /**
   * Filter as per genre and sort
   * @param {string} genre All, Horror, Comedy etc
   */
  handleGenreClick(genre) {
    const filteredMovies =
      genre === 'All'
        ? this.allMovies
        : this.allMovies.filter((movie) => movie.genres.includes(genre));
    const sortedMovies = this.sortMovie(this.sortKey, filteredMovies);
    this.setState({ activeGenre: genre, filteredMovies: sortedMovies });
  }

  /** Handles sorting event */
  handleSortChange = (event) => {
    this.sortKey = event.target.value;
    const sortedMovies = this.sortMovie(this.sortKey, [
      ...this.state.filteredMovies,
    ]);
    this.setState({ filteredMovies: sortedMovies });
  };

  /** Sort the movie by custom comparator function */
  sortMovie(sortKey, movies) {
    return movies.sort((obj1, obj2) => {
      let val1 = obj1[sortKey];
      let val2 = obj2[sortKey];
      if (Array.isArray(val1)) {
        val1 = val1.join();
        val2 = val2.join();
      }
      val1 = val1 && val1.toLowerCase();
      val2 = val2 && val2.toLowerCase();
      if (val1 < val2) {
        return -1;
      }
      if (val1 > val2) {
        return 1;
      }
      return 0;
    });
  }

  handleDeleteClick = (movieParam) => {
    const filteredMovies = this.state.filteredMovies.filter(
      (movie) => movie !== movieParam
    );
    this.setState({ filteredMovies: filteredMovies });
  };

  handleDetailsClick = (movieParam) => {
    this.props.onDetailsClick(movieParam);
  };

  render() {
    return (
      <div className="content-container movie-list-wrapper">
        <div className="flex-center-v text-white movie-list-toolbar">
          {['All'].concat(genres).map((genre) => (
            <button
              onClick={this.handleGenreClick.bind(this, genre)}
              className={
                (genre === this.state.activeGenre ? 'btn-active' : '') +
                ' btn text-white text-uppercase movie-list-toolbar-item'
              }
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
};
