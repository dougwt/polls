import React from 'react';
import { shallow } from 'enzyme';
import { PollNewEdit } from './PollNewEdit';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';

describe('PollNew', () => {
  let wrapper = shallow(<PollNewEdit />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('when the form is initially loaded', () => {
    it('shows the PollNewForm component', () => {
      expect(wrapper.find(PollForm).exists()).toBe(true);
    })
  });

  describe('when the form has been submitted for review', () => {
    beforeEach(() => {
      wrapper.setState({ showFormReview: true });
    });

    it('shows the PollNewFormReview component', () => {
      expect(wrapper.find(PollFormReview).exists()).toBe(true);
    })
  });

});
