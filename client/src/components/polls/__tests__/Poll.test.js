import React from 'react';
import { shallow, mount } from 'enzyme';
import { Poll } from '../Poll';
import PollDetail from '../PollDetail';
import PollEdit from '../PollEdit';
import Root from '../../../Root';
import { poll as pollFixture } from '../../../data/fixtures';

describe('Poll', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      polls: {},
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

    it('shows a Loading message', () => {
      expect(wrapper.render().text()).toContain('Loading...');
    });

    it('does not show the PollDetail component', () => {
      expect(wrapper.find(PollDetail).length).toEqual(0);
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

  describe('when the users request has been fetched', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Poll
          {...props}
          fetched={true}
          polls={{ 1: { _id: 1, ...pollFixture } }}
        />
      );
    });

    it('shows the PollDetail component', () => {
      expect(wrapper.find(PollDetail).length).toEqual(1);
    });

    describe('when the poll is owned by someone else', () => {
      wrapper = shallow(
        <Poll
          {...props}
          match={{ params: { pollId: 1 } }}
          fetched={true}
          auth={{ _id: 'someone' }}
          polls={{ 1: { _id: 1, owner: 'someone', ...pollFixture } }}
        />
      );

      it('does not show the Edit button', () => {
        expect(wrapper.find('#edit').length).toEqual(0);
      });
    });

    describe('when the poll is owned by the auth\'ed user', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Poll
            {...props}
            fetched={true}
            auth={{ _id: 'user' }}
            polls={{ 1: { _id: 1, owner: 'user', ...pollFixture } }}
          />
        );
      });

      it('shows the Edit button', () => {
        expect(wrapper.find('#edit').length).toEqual(1);
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
  });
});
