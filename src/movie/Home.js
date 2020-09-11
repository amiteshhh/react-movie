import React, { Component } from 'react';
import { MovieSearchBanner, MovieList, MovieDetails } from '.';

export class Home extends Component {
  constructor() {
    super();
    this.state = { query: '', movie: null };
  }

  handleQueryChange = (query) => {
    query = query.toLowerCase();
    this.setState({ query: query });
  };

  handleDetailsClick = (movie) => {
    setTimeout(() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }), 10);
    this.setState({ movie: movie });
  };

  handleSearchIconClick = () => {
    this.setState({ movie: null });
  };

  render() {
    return (
      <div className="router-page home-page">
        {this.state.movie ? (
          <MovieDetails
            movie={this.state.movie}
            onSearchIconClick={this.handleSearchIconClick}
          />
        ) : (
          <MovieSearchBanner onQueryChange={this.handleQueryChange} />
        )}
        }
        <MovieList
          query={this.state.query}
          onDetailsClick={this.handleDetailsClick}
        />
      </div>
    );
  }
}
