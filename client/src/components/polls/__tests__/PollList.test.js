import React from 'react';
import { shallow } from 'enzyme';
import PollList from '../PollList';

describe('PollList', () => {
  const wrapper = shallow(<PollList />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains a section title', () => {
    expect(wrapper.find('.section-title').exists()).toBe(true);
  });

  it('contains a list of polls', () => {
    expect(wrapper.find('Collection').exists()).toBe(true);
  });

  it('contains a Pagination', () => {
    expect(wrapper.find('Pagination').exists()).toBe(true);
  });
});
