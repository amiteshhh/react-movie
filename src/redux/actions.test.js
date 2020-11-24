import { saveMovie, filterMoviesByQuery } from './actions';
import { FILTER_MOVIES_BY_QUERY, SAVE_MOVIE } from './actionTypes';

describe('actions', () => {
  it('should create an action to save a movie', () => {
    const movie = { id: 1, title: 'Underworld III' };
    const payload = movie;
    const expectedAction = {
      type: SAVE_MOVIE,
      payload,
    };
    expect(saveMovie(movie)).toEqual(expectedAction);
  });

  it('should create an action to save a movie', () => {
    const query = 'Under';
    const payload = { query };
    const expectedAction = {
      type: FILTER_MOVIES_BY_QUERY,
      payload,
    };
    expect(filterMoviesByQuery(query)).toEqual(expectedAction);
  });
});
