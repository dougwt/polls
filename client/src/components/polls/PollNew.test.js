import React from 'react';
import { shallow } from 'enzyme';
import { PollNew } from './PollNew';

describe('PollNew', () => {

  let props = {
    handleSubmit: () => {}
  }

  let wrapper = shallow(<PollNew {...props} />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('when the form is initially loaded', () => {
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

      wrapper = shallow(<PollNew {...props} />)
    });

    xit('shows the PollNewForm component', () => {

    })

    xit('can be completed and submitted', () => {

    });
  });

  describe('when the form has been submitted for review', () => {
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

      wrapper = shallow(<PollNew {...props} />)
    });

    xit('shows the PollNewFormReview component', () => {

    })

    xit('can be approved for creation', () => {

    });
  });

});
