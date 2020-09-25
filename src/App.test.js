import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App component', () => {

  test('renders hello message', () => {
    const { getByText } = render(<App />);
    const helloElement = getByText(/hello react/i);
    expect(helloElement).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const component = renderer
      .create(<App />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

});
