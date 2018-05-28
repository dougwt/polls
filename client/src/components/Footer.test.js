import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  const footer = shallow(<Footer />);

  it('renders properly', () => {
    expect(footer).toMatchSnapshot();
  });

  it('contains a copyright', () => {
    expect(footer.find('.footer-copyright').exists()).toBe(true);
  });
});
