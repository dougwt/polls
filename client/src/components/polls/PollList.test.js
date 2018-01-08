import React from 'react';
import { shallow } from 'enzyme';
import PollList from './PollList';

describe('PollList', () => {

  const pollList = shallow(<PollList />);

  it('renders properly', () => {
    expect(pollList).toMatchSnapshot();
  });

  it('contains a section title', () => {
    expect(pollList.find('.section-title').exists()).toBe(true);
  });

  it('contains a list of polls', () => {
    expect(pollList.find('Collection').exists()).toBe(true);
  });

  it('contains a Pagination', () => {
    expect(pollList.find('Pagination').exists()).toBe(true);
  });

});
