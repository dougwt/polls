import React from 'react';
import { shallow } from 'enzyme';
import { PollFormReview } from '../PollFormReview';

describe('PollFormReview', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      error: null,
      formValues: {
        choices: [0, 1, undefined, undefined, undefined, undefined],
        question: 'Who is your favorite Starfleet captain?'
      },
      history: {},
      onCancel: jest.fn(),
      onSave: jest.fn(),
      waiting: false
    };

    wrapper = shallow(<PollFormReview {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a PollDetail', () => {
    expect(wrapper.find('PollDetail').length).toBe(1);
  });

  it('shows a `Create` button', () => {
    expect(wrapper.find('Button.btn-next').length).toBe(1);
  });

  it('shows a `Back` button', () => {
    expect(wrapper.find('Button.btn-back').length).toBe(1);
  });

  describe('when the Next button is clicked', () => {
    it('submits the form', () => {
      wrapper.find('Button.btn-next').simulate('click');
      expect(props.onSave).toHaveBeenCalled();
    });
  });

  describe('when the Back button is clicked', () => {
    it('returns to the previous screen of the form', () => {
      wrapper.find('Button.btn-back').simulate('click');
      expect(props.onCancel).toHaveBeenCalled();
    });
  });
});
