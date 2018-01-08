import React from 'react';
import { shallow } from 'enzyme';
import { PollNewFormReview } from './PollNewFormReview';

describe('PollNewFormReview', () => {
  let props = {
    formValues: {
      choices: [ 0, 1, undefined, undefined, undefined, undefined ],
      question: 'Who is your favorite Starfleet captain?',
    },
  }

  let wrapper = shallow(<PollNewFormReview {...props} />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows the question', () => {
    expect(wrapper.find('Card[title="Who is your favorite Starfleet captain?"]').length).toBe(1);
  });

  it('shows a `Create` button', () => {
    expect(wrapper.find('Button.btn-create').length).toBe(1);
  });

  it('shows a `Back` button', () => {
    expect(wrapper.find('Button.btn-back').length).toBe(1);
  });

  xit('submits the form when Create button clicked', () => {
    // TODO: mock onCancel();
  });

  xit('returns to the previous screen of the form when Back button clicked', () => {
    // TODO: mock submitPoll();
  });

  describe('with two choices', () => {
    beforeEach(() => {
      let props = {
        formValues: {
          choices: [ 0, 1, undefined, undefined, undefined, undefined ],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)'
        }
      }

      wrapper = shallow(<PollNewFormReview {...props} />)
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(2);
    });
  });

  describe('with three choices', () => {
    beforeEach(() => {
      let props = {
        formValues: {
          choices: [ 0, 1, undefined, undefined, undefined, undefined ],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)'
        }
      }

      wrapper = shallow(<PollNewFormReview {...props} />)
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(3);
    });
  });

  describe('with four choices', () => {
    beforeEach(() => {
      let props = {
        formValues: {
          choices: [ 0, 1, undefined, undefined, undefined, undefined ],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)',
          choice_4: 'Janeway (Voyager)'
        }
      }

      wrapper = shallow(<PollNewFormReview {...props} />)
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(4);
    });

    it('shows the appropriate text for choice 1', () => {
      expect(wrapper.find('Input[value="1"]').props().label).toBe('Kirk (TOS)');
    });

    it('shows the appropriate text for choice 2', () => {
      expect(wrapper.find('Input[value="2"]').props().label).toBe('Picard (TNG)');
    });
  });

  describe('with five choices', () => {
    beforeEach(() => {
      let props = {
        formValues: {
          choices: [ 0, 1, undefined, undefined, undefined, undefined ],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)',
          choice_4: 'Janeway (Voyager)',
          choice_5: 'Archer (Enterprise)'
        }
      }

      wrapper = shallow(<PollNewFormReview {...props} />)
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(5);
    });

    it('shows the appropriate text for choice 1', () => {
      expect(wrapper.find('Input[value="1"]').props().label).toBe('Kirk (TOS)');
    });

    it('shows the appropriate text for choice 2', () => {
      expect(wrapper.find('Input[value="2"]').props().label).toBe('Picard (TNG)');
    });

    it('shows the appropriate text for choice 3', () => {
      expect(wrapper.find('Input[value="3"]').props().label).toBe('Sisko (DS9)');
    });

  });

  describe('with six choices', () => {
    beforeEach(() => {
      let props = {
        formValues: {
          choices: [ 0, 1, undefined, undefined, undefined, undefined ],
          question: 'Who is your favorite Starfleet captain?',
          choice_1: 'Kirk (TOS)',
          choice_2: 'Picard (TNG)',
          choice_3: 'Sisko (DS9)',
          choice_4: 'Janeway (Voyager)',
          choice_5: 'Archer (Enterprise)',
          choice_6: 'Lorca (Discovery)'
        }
      }

      wrapper = shallow(<PollNewFormReview {...props} />)
    });

    it('shows the appropriate number of choices', () => {
      expect(wrapper.find('Input[name="choices"]').length).toBe(6);
    });

    it('shows the appropriate text for choice 1', () => {
      expect(wrapper.find('Input[value="1"]').props().label).toBe('Kirk (TOS)');
    });

    it('shows the appropriate text for choice 2', () => {
      expect(wrapper.find('Input[value="2"]').props().label).toBe('Picard (TNG)');
    });

    it('shows the appropriate text for choice 3', () => {
      expect(wrapper.find('Input[value="3"]').props().label).toBe('Sisko (DS9)');
    });

    it('shows the appropriate text for choice 4', () => {
      expect(wrapper.find('Input[value="4"]').props().label).toBe('Janeway (Voyager)');
    });

    it('shows the appropriate text for choice 5', () => {
      expect(wrapper.find('Input[value="5"]').props().label).toBe('Archer (Enterprise)');
    });

    it('shows the appropriate text for choice 6', () => {
      expect(wrapper.find('Input[value="6"]').props().label).toBe('Lorca (Discovery)');
    });
  });

});
