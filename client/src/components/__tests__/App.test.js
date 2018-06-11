import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import Header from '../Header';
import Footer from '../Footer';

describe('App', () => {
  let props = { fetchUser: () => {} };

  let wrapper = shallow(<App {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a Header', () => {
    expect(wrapper.find(Header).length).toEqual(1);
  });

  it('shows a Footer', () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
});
