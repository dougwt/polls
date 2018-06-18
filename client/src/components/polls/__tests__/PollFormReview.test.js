import React from 'react';
import { shallow } from 'enzyme';
import { PollFormReview } from '../PollFormReview';

describe('PollFormReview', () => {
  let props = {
    waiting: false,
    error: null,
    formValues: {
      choices: [0, 1, undefined, undefined, undefined, undefined],
      question: 'Who is your favorite Starfleet captain?'
    },
    onCancel: jest.fn(),
    createPoll: jest.fn(),
    history: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PollFormReview {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a PollDetail', () => {
    expect(wrapper.find('PollDetail').length).toBe(1);
  });

  it('shows a `Create` button', () => {
    expect(wrapper.find('Button.btn-create').length).toBe(1);
  });

  it('shows a `Back` button', () => {
    expect(wrapper.find('Button.btn-back').length).toBe(1);
  });

  describe('when the Next button is clicked', () => {
    it('submits the form', () => {
      wrapper.find('Button.btn-create').simulate('click');
      expect(props.createPoll).toHaveBeenCalled();
    });
  });

  describe('when the Back button is clicked', () => {
    it('returns to the previous screen of the form', () => {
      wrapper.find('Button.btn-back').simulate('click');
      expect(props.onCancel).toHaveBeenCalled();
    });
  });
});
