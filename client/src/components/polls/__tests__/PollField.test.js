import React from 'react';
import { render } from 'enzyme';
import PollField from '../PollField';

describe('PollField', () => {
  const props = {
    input: true,
    label: 'Sample label',
    icon: null,
    meta: {
      active: null,
      error: null,
      touched: null
    }
  };

  const pollField = render(<PollField {...props} />);

  it('renders properly', () => {
    expect(pollField).toMatchSnapshot();
  });

  it('contains a label', () => {
    expect(pollField.find('label').length).toBe(1);
    expect(pollField.find('label').text()).toEqual(props.label);
  });

  it('contains an input', () => {
    expect(pollField.find('input').length).toBe(1);
  });
});
