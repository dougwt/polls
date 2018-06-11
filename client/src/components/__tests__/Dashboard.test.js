import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  const dashboard = shallow(<Dashboard />);

  it('renders properly', () => {
    expect(dashboard).toMatchSnapshot();
  });

  it('contains a page title', () => {
    expect(dashboard.find('h3').exists()).toBe(true);
  });

  it('contains a `My Polls` PollList', () => {
    expect(dashboard.find('#my > PollList').exists()).toBe(true);
  });

  it('contains a `Other Polls` PollList', () => {
    expect(dashboard.find('#other > PollList').exists()).toBe(true);
  });
});
