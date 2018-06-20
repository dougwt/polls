import React from 'react';
import { mount, shallow } from 'enzyme';
import { Dashboard } from '../Dashboard';
import Root from '../../Root';

describe('Dashboard', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      polls: {},
      fetchPolls: jest.fn()
    };
    wrapper = shallow(<Dashboard {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains a page title', () => {
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  it('contains a `My Polls` PollList', () => {
    expect(wrapper.find('#my > Connect(PollList)').length).toEqual(1);
  });

  it('contains a `Other Polls` PollList', () => {
    expect(wrapper.find('#other > Connect(PollList)').length).toEqual(1);
  });

  it('calls the fetchPolls action creator', () => {
    global.$ = () => {
      return {
        tabs: jest.fn()
      };
    };
    wrapper = mount(
      <Root>
        <Dashboard {...props} />
      </Root>
    );

    expect(props.fetchPolls).toHaveBeenCalled();
  });
});
