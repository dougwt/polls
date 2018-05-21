import React from 'react';
import { shallow } from 'enzyme';
import PollDetail from './PollDetail';

const polLDetail = shallow(<PollDetail />);
describe('PollDetail', () => {

  it('renders correctly', () => {
    expect(polLDetail).toMatchSnapshot();
  });

  xit('contains a PollDetailForm', () => {
    console.log(polLDetail.find('PollDetailForm').debug());
    expect(polLDetail.find('PollDetailForm').exists()).toBe(true);
  });

});
