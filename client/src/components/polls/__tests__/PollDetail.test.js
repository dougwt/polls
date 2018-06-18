import React from 'react';
import { shallow } from 'enzyme';
import PollDetail from '../PollDetail';

describe('PollDetail', () => {
  let props = {
    formValues: {
      choices: [0, 1, undefined, undefined, undefined, undefined],
      question: 'Who is your favorite Starfleet captain?'
    },
    disabled: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PollDetail {...props} />);
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

      wrapper = shallow(<PollDetail {...props} />);
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

      wrapper = shallow(<PollDetail {...props} />);
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

      wrapper = shallow(<PollDetail {...props} />);
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

      wrapper = shallow(<PollDetail {...props} />);
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

      wrapper = shallow(<PollDetail {...props} />);
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
