import PropTypes from 'prop-types';

export const MovieShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  tagline: PropTypes.string,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  overview: PropTypes.string,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
  runtime: PropTypes.number,
});
