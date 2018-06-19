import React from 'react';
import { shallow, mount } from 'enzyme';
import { Poll } from '../Poll';
import PollDetail from '../PollDetail';
import PollEdit from '../PollEdit';
import Root from '../../../Root';

describe('Poll', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      polls: [],
      fetched: false,
      match: { params: { pollId: 1 } },
      fetchPolls: jest.fn()
    };

    wrapper = shallow(<Poll {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when the page is initially loaded', () => {
    it('contains the proper component state', () => {
      expect(wrapper.state('showEdit')).toEqual(false);
    });

    it('shows the PollDetail component', () => {
      expect(wrapper.find(PollDetail).length).toEqual(1);
    });

    it('calls the fetchPolls action creator', () => {
      wrapper = mount(
        <Root>
          <Poll {...props} />
        </Root>
      );

      expect(props.fetchPolls).toHaveBeenCalled();
    });
  });

  describe('when the edit button is clicked', () => {
    beforeEach(() => {
      wrapper.find('#edit').simulate('click');
      wrapper.update();
    });

    it('updates the component state', () => {
      expect(wrapper.state('showEdit')).toEqual(true);
    });

    it('shows the PollEdit component', () => {
      expect(wrapper.find(PollEdit).length).toEqual(1);
    });

    it('does not show the PollDetail component', () => {
      expect(wrapper.find(PollDetail).length).toEqual(0);
    });
  });
});
