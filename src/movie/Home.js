import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { MovieSearchBanner, MovieList, MovieDetails } from '.';

class Home extends Component {
  constructor(props) {
    super(props);
    const { query = '' } = props.match.params;
    this.state = { query, movie: null };
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

export default withRouter(Home);
