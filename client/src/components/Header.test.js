import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {
  let props = {
    auth: undefined,
  }

  let header = shallow(<Header />);

  it('renders properly', () => {
    expect(header).toMatchSnapshot();
  });

  it('shows a title that links to the homepage', () => {
    expect(header.find('Link.brand-logo[to="/"]').length).toBe(1);
  });

  it('shows a nav link to the `Dashboard` page', () => {
    expect(header.find('NavLink[to="/polls"]').length).toBe(1);
  });

  it('shows a nav link to the `Create a Poll` page', () => {
    expect(header.find('NavLink[to="/polls/new"]').length).toBe(1);
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      let props = {
        auth: true,
      }

      header = shallow(<Header {...props} />);
    });

    it('doesnt show a `Sign In` lin', () => {
      expect(header.find('[href="/auth/google"]').length).toBe(0);
    })

    it('shows a `Sign Out` link', () => {
      expect(header.find('[href="/api/logout"]').length).toBe(1);
    });
  });

  describe('when the user is not authenticated', () => {
    beforeEach(() => {
      let props = {
        auth: false,
      }

      header = shallow(<Header {...props} />);
    });

    it('shows a `Sign In` link', () => {
      expect(header.find('[href="/auth/google"]').length).toBe(1);
    });

    it('doesnt show a `Sign Out` link', () => {
      expect(header.find('[href="/api/logout"]').length).toBe(0);
    });
  });
});
