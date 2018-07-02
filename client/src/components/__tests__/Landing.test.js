import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from '../Landing';

describe('Landing', () => {
  let props = {
    auth: undefined,
    history: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Landing {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows section-1', () => {
    expect(wrapper.find('.section-1').length).toBe(1);
  });

  it('shows section-2', () => {
    expect(wrapper.find('.section-2').length).toBe(1);
  });

  it('shows section-3', () => {
    expect(wrapper.find('.section-3').length).toBe(1);
  });

  it('shows section-4', () => {
    expect(wrapper.find('.section-4').length).toBe(1);
  });
});
