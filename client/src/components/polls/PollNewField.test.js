import React from 'react';
import { render } from 'enzyme';
import PollNewField from './PollNewField';

describe('PollNewField', () => {
  const props = {
    input: true,
    label: 'Sample label',
    icon: null,
    meta: {
      active: null,
      error: null,
      touched: null
    }
  }

  const pollNewField = render(<PollNewField {...props} />);

  it('renders properly', () => {
    expect(pollNewField).toMatchSnapshot();
  });

  it('contains an input with a label', () => {
    expect(pollNewField.find('label').length).toBe(1);
  });

  it('contains an input', () => {
    expect(pollNewField.find('input').length).toBe(1);
  });

});
