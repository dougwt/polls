import React from 'react';
import { shallow } from 'enzyme';
import PollDetail from '../PollDetail';

const wrapper = shallow(<PollDetail />);
describe('PollDetail', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // xit('contains a PollDetailForm', () => {
  //   // console.log(wrapper.debug());
  //   expect(wrapper.find('PollDetailForm').exists()).toBe(true);
  // });
});
