import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header';

describe('Header', () => {
  let props = {
    auth: undefined
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows a title that links to the homepage', () => {
    expect(wrapper.find('Link.brand-logo[to="/"]').length).toBe(1);
  });

  it('shows a nav link to the `Dashboard` page', () => {
    expect(wrapper.find('NavLink[to="/polls"]').length).toBe(1);
  });

  it('shows a nav link to the `Create a Poll` page', () => {
    expect(wrapper.find('NavLink[to="/polls/new"]').length).toBe(1);
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      let props = {
        auth: true
      };

      wrapper = shallow(<Header {...props} />);
    });

    it('doesnt show a `Sign In` lin', () => {
      expect(wrapper.find('[href="/api/auth/google"]').length).toBe(0);
    });

    it('shows a `Sign Out` link', () => {
      expect(wrapper.find('[href="/api/auth/logout"]').length).toBe(1);
    });
  });

  describe('when the user is not authenticated', () => {
    beforeEach(() => {
      let props = {
        auth: false
      };

      wrapper = shallow(<Header {...props} />);
    });

    it('shows a `Sign In` link', () => {
      expect(wrapper.find('[href="/api/auth/google"]').length).toBe(1);
    });

    it('doesnt show a `Sign Out` link', () => {
      expect(wrapper.find('[href="/api/auth/logout"]').length).toBe(0);
    });
  });
});
