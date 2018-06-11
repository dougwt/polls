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

  const wrapper = render(<PollField {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains a label', () => {
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('label').text()).toEqual(props.label);
  });

  it('contains an input', () => {
    expect(wrapper.find('input').length).toBe(1);
  });
});
