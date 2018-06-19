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

  it('shows a Back button', () => {
    expect(wrapper.find('Button.btn-back').length).toBe(1);
  });

  it('shows a Next button', () => {
    expect(wrapper.find('Button.btn-next').length).toBe(1);
  });

  it('does not show a loading spinner initially', () => {
    expect(wrapper.find('ProgressBar').length).toEqual(0);
  });

  it('does not show an error message initially', () => {
    expect(wrapper.find('Row.error').length).toEqual(0);
  });

  describe('when the Back button is clicked', () => {
    it('executes the `onCancel` callback in props', () => {
      wrapper.find('Button.btn-back').simulate('click');
      expect(props.onCancel).toHaveBeenCalled();
    });
  });

  describe('when the Next button is clicked', () => {
    it('executes the `onSave` callback in props', () => {
      wrapper.find('Button.btn-next').simulate('click');
      expect(props.onSave).toHaveBeenCalled();
    });

    describe('when the save operation is waiting', () => {
      beforeEach(() => {
        wrapper = shallow(<PollFormReview {...props} waiting={true} />);
      });

      it('can show a loading spinner during save', () => {
        expect(wrapper.find('ProgressBar').length).toEqual(1);
      });
    });

    describe('when the save operation fails', () => {
      beforeEach(() => {
        wrapper = shallow(
          <PollFormReview
            {...props}
            error={{ response: { data: { error: 'owch!' } } }}
          />
        );
      });

      it('can show an error message', () => {
        expect(wrapper.find('Row.error').length).toEqual(1);
      });
    });
  });
});
