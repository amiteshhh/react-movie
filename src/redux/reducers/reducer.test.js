import reducer, { initialState } from './reducer';
import {
  FILTER_MOVIES_BY_GENRE,
  FILTER_MOVIES_BY_QUERY,
  DELETE_MOVIE,
} from './../actionTypes';

describe('movie reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FILTER_MOVIES_BY_GENRE', () => {
    const activeGenre = 'Documentry';
    const state = reducer(initialState, {
      type: FILTER_MOVIES_BY_GENRE,
      payload: { activeGenre },
    });
    expect(state.activeGenre).toEqual(activeGenre);
  });

  it('should handle FILTER_MOVIES_BY_QUERY', () => {
    const query = 'coco';
    const state = reducer(initialState, {
      type: FILTER_MOVIES_BY_QUERY,
      payload: { query },
    });
    expect(state.query).toEqual(query);
  });

  it('should handle DELETE_MOVIE', () => {
    const { movies } = initialState;
    const moviesLengthAfterDelete = movies.length - 1;
    const movieToDelete = movies[0];
    const state = reducer(initialState, {
      type: DELETE_MOVIE,
      payload: movieToDelete,
    });
    expect(state.movies.length).toEqual(moviesLengthAfterDelete);
  });
});
