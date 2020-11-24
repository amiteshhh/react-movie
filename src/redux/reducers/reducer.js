import {
  DEFAULT_GENRE,
  MOVIE_LIST,
  MOVIE_SORT_CRITERIA,
} from '../../consts/MovieConst';

import {
  FILTER_MOVIES_BY_GENRE,
  FILTER_MOVIES_BY_QUERY,
  SORT_MOVIES,
  DELETE_MOVIE,
} from '../actionTypes';

export const initialState = {
  allMovies: MOVIE_LIST,
  movies: MOVIE_LIST,
  activeGenre: DEFAULT_GENRE,
  sortKey: MOVIE_SORT_CRITERIA[0].code,
  query: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_MOVIES_BY_GENRE:
    case FILTER_MOVIES_BY_QUERY:
    case SORT_MOVIES:
      return { ...state, ...action.payload };
    case DELETE_MOVIE:
      const movieToDelete = action.payload;
      const { movies } = state;
      const index = movies.findIndex((movie) => movie === movieToDelete);
      movies.splice(index, 1);
      return { ...state };
    default:
      return state;
  }
};
