import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import Header from './Header';
import Footer from './Footer';

describe('App', () => {
  let props = {};

  let app = shallow(<App {...props} />);

  it('renders properly', () => {
    expect(app).toMatchSnapshot();
  });

  it('shows a Header', () => {
    expect(app.find(Header).exists()).toBe(true);
  });

  it('shows a Footer', () => {
    expect(app.find(Footer).exists()).toBe(true);
  });
});
