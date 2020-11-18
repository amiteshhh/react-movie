import React from 'react';
import { render } from './test-utils';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  test('renders movie banner', () => {
    const intitalState = {};
    const { getByText } = render(<App />, { intitalState });
    const findYourMovieElement = getByText(/Find Your Movie/i);
    expect(findYourMovieElement).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
