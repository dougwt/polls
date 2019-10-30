import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('Footer', () => {
  const wrapper = shallow(<Footer />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains a copyright', () => {
    expect(wrapper.find('.footer-copyright').length).toEqual(1);
  });
});
