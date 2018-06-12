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

  it('shows the question', () => {
    expect(
      wrapper.find('Card[title="Who is your favorite Starfleet captain?"]')
        .length
    ).toBe(1);
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

  describe('with two choices', () => {
    beforeEach(() => {
      props = {
        ...props,
        formValues: {
          choices: [0, 1, undefined, undefined, undefined, undefined],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)'
        }
      };

      wrapper = shallow(<PollFormReview {...props} />);
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(2);
    });
  });

  describe('with three choices', () => {
    beforeEach(() => {
      props = {
        ...props,
        formValues: {
          choices: [0, 1, undefined, undefined, undefined, undefined],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)'
        }
      };

      wrapper = shallow(<PollFormReview {...props} />);
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(3);
    });
  });

  describe('with four choices', () => {
    beforeEach(() => {
      props = {
        ...props,
        formValues: {
          choices: [0, 1, undefined, undefined, undefined, undefined],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)',
          choice_4: 'Janeway (Voyager)'
        }
      };

      wrapper = shallow(<PollFormReview {...props} />);
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(4);
    });

    it('shows the appropriate text for choice 1', () => {
      expect(wrapper.find('Input[value="1"]').props().label).toBe('Kirk (TOS)');
    });

    it('shows the appropriate text for choice 2', () => {
      expect(wrapper.find('Input[value="2"]').props().label).toBe(
        'Picard (TNG)'
      );
    });
  });

  describe('with five choices', () => {
    beforeEach(() => {
      props = {
        ...props,
        formValues: {
          choices: [0, 1, undefined, undefined, undefined, undefined],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)',
          choice_4: 'Janeway (Voyager)',
          choice_5: 'Archer (Enterprise)'
        }
      };

      wrapper = shallow(<PollFormReview {...props} />);
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(5);
    });

    it('shows the appropriate text for choice 1', () => {
      expect(wrapper.find('Input[value="1"]').props().label).toBe('Kirk (TOS)');
    });

    it('shows the appropriate text for choice 2', () => {
      expect(wrapper.find('Input[value="2"]').props().label).toBe(
        'Picard (TNG)'
      );
    });

    it('shows the appropriate text for choice 3', () => {
      expect(wrapper.find('Input[value="3"]').props().label).toBe(
        'Sisko (DS9)'
      );
    });
  });

  describe('with six choices', () => {
    beforeEach(() => {
      props = {
        ...props,
        formValues: {
          choices: [0, 1, undefined, undefined, undefined, undefined],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)',
          choice_4: 'Janeway (Voyager)',
          choice_5: 'Archer (Enterprise)',
          choice_6: 'Lorca (Discovery)'
        }
      };

      wrapper = shallow(<PollFormReview {...props} />);
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(6);
    });

    it('shows the appropriate text for choice 1', () => {
      expect(wrapper.find('Input[value="1"]').props().label).toBe('Kirk (TOS)');
    });

    it('shows the appropriate text for choice 2', () => {
      expect(wrapper.find('Input[value="2"]').props().label).toBe(
        'Picard (TNG)'
      );
    });

    it('shows the appropriate text for choice 3', () => {
      expect(wrapper.find('Input[value="3"]').props().label).toBe(
        'Sisko (DS9)'
      );
    });

    it('shows the appropriate text for choice 4', () => {
      expect(wrapper.find('Input[value="4"]').props().label).toBe(
        'Janeway (Voyager)'
      );
    });

    it('shows the appropriate text for choice 5', () => {
      expect(wrapper.find('Input[value="5"]').props().label).toBe(
        'Archer (Enterprise)'
      );
    });

    it('shows the appropriate text for choice 6', () => {
      expect(wrapper.find('Input[value="6"]').props().label).toBe(
        'Lorca (Discovery)'
      );
    });
  });
});
