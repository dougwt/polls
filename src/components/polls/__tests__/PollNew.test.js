import React from 'react';
import { shallow } from 'enzyme';
import { PollNew } from '../PollNew';
import PollForm from '../PollForm';
import PollFormReview from '../PollFormReview';

describe('PollNew', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      auth: {},
      resetCreatePoll: jest.fn(),
      createPoll: jest.fn(),
      formValues: {},
      history: {}
    };

    wrapper = shallow(<PollNew {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when the form is initially loaded', () => {
    it('contains the proper component state', () => {
      expect(wrapper.state('showReview')).toEqual(false);
    });

    it('shows the PollForm component', () => {
      expect(wrapper.find(PollForm).length).toEqual(1);
    });

    it('does not show the PollFormReview component', () => {
      expect(wrapper.find(PollFormReview).length).toEqual(0);
    });
  });

  describe('when the form has been submitted for review', () => {
    beforeEach(() => {
      wrapper.setState({ showReview: true });
    });

    it('shows the PollFormReview component', () => {
      expect(wrapper.find(PollFormReview).length).toEqual(1);
    });

    it('does not show the PollForm component', () => {
      expect(wrapper.find(PollForm).length).toEqual(0);
    });
  });
});
