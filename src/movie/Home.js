import React, { Component } from 'react';
import { MovieSearchBanner, MovieList, MovieDetails } from '.';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { query: '', movie: null };
  }

  handleQueryChange = (query) => this.setState({ query });

  handleDetailsClick = (movie) => {
    setTimeout(() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }), 10);
    this.setState({ movie });
  };

  switchToSearchView = () => this.setState({ movie: null });

  render() {
    const { movie, query } = this.state;
    return (
      <div className="router-page home-page">
        {movie ? (
          <>
            <i
              className="fa fa-search fa-lg text-danger return-to-search-icon"
              role="button"
              title="Return to search"
              onClick={this.switchToSearchView}
              area-hidden="true"
            />
            <MovieDetails movie={movie} />
          </>
        ) : (
          <MovieSearchBanner onQueryChange={this.handleQueryChange} />
        )}
        <MovieList query={query} onDetailsClick={this.handleDetailsClick} />
      </div>
    );
  }
}
