import React from 'react';
import { shallow } from 'enzyme';
import { PollNewForm } from './PollNewForm';

describe('PollNewForm', () => {
  let props = {
    handleSubmit: () => {}
  }

  let wrapper = shallow(<PollNewForm {...props} />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  xit('should ask for a question', () => {

  });

  xit('should ask for choice 1', () => {

  });

  xit('should ask for choice 2', () => {

  });

  xit('shows a `Preview` button', () => {

  });

  xit('shows a `Cancel` button', () => {

  });

  xit('submits the form when Preview button is clicked', () => {

  });

  xit('returns to the Dashboard when Back button is clicked', () => {

  });

  describe('when there are 2 choices', () => {
    xit('allows the user to add an additional choice', () => {

    });

    xit('prevents the user from removing an existing choice', () => {

    })
  });

  describe('when there are 3 choices', () => {
    xit('allows the user to add an additional choice', () => {

    });

    xit('allows the user to remove an existing choice', () => {

    })
  });

  describe('when there are 4 choices', () => {
    xit('allows the user to add an additional choice', () => {

    });

    xit('allows the user to remove an existing choice', () => {

    })
  });

  describe('when there are 5 choices', () => {
    xit('allows the user to add an additional choice', () => {

    });

    xit('allows the user to remove an existing choice', () => {

    })
  });

  describe('when there are 6 choices', () => {
    xit('prevents the user from adding an additional choice', () => {

    });

    xit('allows the user to remove an existing choice', () => {

    })
  });

});
