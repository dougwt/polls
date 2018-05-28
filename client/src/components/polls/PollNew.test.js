import React from 'react';
import { shallow } from 'enzyme';
import { PollNew } from './PollNew';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';

describe('PollNew', () => {
  let wrapper = shallow(<PollNew />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when the form is initially loaded', () => {
    it('shows the PollNewForm component', () => {
      expect(wrapper.find(PollForm).exists()).toBe(true);
    });
  });

  describe('when the form has been submitted for review', () => {
    beforeEach(() => {
      wrapper.setState({ showReview: true });
    });

    it('shows the PollNewFormReview component', () => {
      expect(wrapper.find(PollFormReview).exists()).toBe(true);
    });
  });
});
