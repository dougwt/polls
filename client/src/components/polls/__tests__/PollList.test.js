import React from 'react';
import { shallow } from 'enzyme';
import PollList from '../PollList';

describe('PollList', () => {
  let props = { title: 'Test Title' };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PollList {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains a section title', () => {
    expect(wrapper.find('.section-title').exists()).toBe(true);
  });

  it('contains a list of polls', () => {
    expect(wrapper.find('Collection').exists()).toBe(true);
  });

  it('contains a Pagination', () => {
    expect(wrapper.find('Pagination').exists()).toBe(true);
  });

  describe('0 polls', () => {
    beforeEach(() => {
      props = { title: 'Test Title', polls: [] };
      wrapper = shallow(<PollList {...props} />);
    });

    it('shows empty list message', () => {
      expect(wrapper.find('Collection').html()).toContain(
        'There are no polls to show. Why don&#x27;t you create one?'
      );
    });
  });

  describe('1 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [{ id: 1, question: 'Question 1' }]
      };
      wrapper = shallow(<PollList {...props} />);
    });

    it('shows a single poll', () => {
      expect(wrapper.find('CollectionItem').length).toEqual(1);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach(poll => {
        expect(wrapper.find('CollectionItem').html()).toContain(poll.question);
      });
    });
  });

  describe('2 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [
          { id: 1, question: 'Question 1' },
          { id: 2, question: 'Question 2' }
        ]
      };
      wrapper = shallow(<PollList {...props} />);
    });

    it('shows two polls', () => {
      expect(wrapper.find('CollectionItem').length).toEqual(2);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('CollectionItem')
            .at(i)
            .html()
        ).toContain(poll.question);
      });
    });

    it('shows a link to view each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('CollectionItem')
            .at(i)
            .html()
        ).toContain(`href="/polls/${poll.id}"`);
      });
    });
  });

  describe('10 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [
          { id: 1, question: 'Question 1' },
          { id: 2, question: 'Question 2' },
          { id: 3, question: 'Question 3' },
          { id: 4, question: 'Question 4' },
          { id: 5, question: 'Question 5' },
          { id: 6, question: 'Question 6' },
          { id: 7, question: 'Question 7' },
          { id: 8, question: 'Question 8' },
          { id: 9, question: 'Question 9' },
          { id: 10, question: 'Question 10' }
        ]
      };
      wrapper = shallow(<PollList {...props} />);
    });

    it('shows ten polls', () => {
      expect(wrapper.find('CollectionItem').length).toEqual(10);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('CollectionItem')
            .at(i)
            .html()
        ).toContain(poll.question);
      });
    });

    it('shows a link to view each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('CollectionItem')
            .at(i)
            .html()
        ).toContain(`href="/polls/${poll.id}"`);
      });
    });
  });

  describe('20 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [
          { id: 1, question: 'Question 1' },
          { id: 2, question: 'Question 2' },
          { id: 3, question: 'Question 3' },
          { id: 4, question: 'Question 4' },
          { id: 5, question: 'Question 5' },
          { id: 6, question: 'Question 6' },
          { id: 7, question: 'Question 7' },
          { id: 8, question: 'Question 8' },
          { id: 9, question: 'Question 9' },
          { id: 10, question: 'Question 10' },
          { id: 11, question: 'Question 11' },
          { id: 12, question: 'Question 12' },
          { id: 13, question: 'Question 13' },
          { id: 14, question: 'Question 14' },
          { id: 15, question: 'Question 15' },
          { id: 16, question: 'Question 16' },
          { id: 17, question: 'Question 17' },
          { id: 18, question: 'Question 18' },
          { id: 19, question: 'Question 19' },
          { id: 20, question: 'Question 20' }
        ]
      };
      wrapper = shallow(<PollList {...props} />);
    });

    it('shows twenty polls', () => {
      expect(wrapper.find('CollectionItem').length).toEqual(20);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('CollectionItem')
            .at(i)
            .html()
        ).toContain(poll.question);
      });
    });

    it('shows a link to view each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('CollectionItem')
            .at(i)
            .html()
        ).toContain(`href="/polls/${poll.id}"`);
      });
    });
  });
});
