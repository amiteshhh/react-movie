import React from 'react';
import { render } from '../test-utils';
import configureMockStore from 'redux-mock-store';
import EditMovie from './Edit';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import * as selectors from '../redux/selectors';

describe('Edit Movie component', () => {
  const mock = jest.spyOn(selectors, 'getMovieById'); // spy on otherFn
  mock.mockReturnValue({ title: 'Underworld 3', id: 337167 }); // mock the return value

  const route = '/movie/337167';
  const history = createMemoryHistory({ initialEntries: [route] });
  test('renders title', () => {
    const intitalState = {};
    const { getByDisplayValue } = render(
      <Router history={history}>
        <Switch>
          <Route path="/movie/:id" component={EditMovie} />
        </Switch>
      </Router>,
      { intitalState }
    );
    const titleElement = getByDisplayValue('Underworld 3');
    expect(titleElement).toBeInTheDocument();
  });
});
