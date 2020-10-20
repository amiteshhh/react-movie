import {
  SAVE_MOVIE,
  DELETE_MOVIE,
  FILTER_MOVIES_BY_GENRE,
  FILTER_MOVIES_BY_QUERY,
  SORT_MOVIES,
} from './actionTypes';

export const saveMovie = (movie) => ({
  type: SAVE_MOVIE,
  payload: movie,
});

export const deleteMovie = (movie) => ({
  type: DELETE_MOVIE,
  payload: movie,
});

export const filterMoviesByGenre = (activeGenre) => ({
  type: FILTER_MOVIES_BY_GENRE,
  payload: { activeGenre },
});

export const filterMoviesByQuery = (query) => ({
  type: FILTER_MOVIES_BY_QUERY,
  payload: { query },
});

export const sortMovies = (sortKey) => ({
  type: SORT_MOVIES,
  payload: { sortKey },
});
