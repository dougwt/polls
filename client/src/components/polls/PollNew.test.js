import React from 'react';
import { shallow } from 'enzyme';
import { PollNew } from './PollNew';
import PollNewForm from './PollNewForm';
import PollNewFormReview from './PollNewFormReview';

describe('PollNew', () => {
  let wrapper = shallow(<PollNew />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('when the form is initially loaded', () => {
    it('shows the PollNewForm component', () => {
      expect(wrapper.find(PollNewForm).exists()).toBe(true);
    })
  });

  describe('when the form has been submitted for review', () => {
    beforeEach(() => {
      wrapper.setState({ showFormReview: true });
    });

    it('shows the PollNewFormReview component', () => {
      expect(wrapper.find(PollNewFormReview).exists()).toBe(true);
    })
  });

});
