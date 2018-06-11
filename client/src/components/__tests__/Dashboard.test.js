import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  const wrapper = shallow(<Dashboard />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains a page title', () => {
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  it('contains a `My Polls` PollList', () => {
    expect(wrapper.find('#my > PollList').length).toEqual(1);
  });

  it('contains a `Other Polls` PollList', () => {
    expect(wrapper.find('#other > PollList').length).toEqual(1);
  });
});
