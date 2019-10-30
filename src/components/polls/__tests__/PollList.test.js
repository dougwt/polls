import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { PollList } from '../PollList';

describe('PollList', () => {
  let props = { title: 'Test Title' };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Router>
        <PollList {...props} />
      </Router>
    );
    wrapper = wrapper.find('PollList').dive();
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
      props = { title: 'Test Title', polls: [], fetched: true };
      wrapper = shallow(
        <Router>
          <PollList {...props} />
        </Router>
      );
      wrapper = wrapper.find('PollList').dive();
    });

    it('shows empty list message', () => {
      expect(wrapper.find('Collection').html()).toContain(
        'There are no polls to show. Why don&#x27;t you create one?'
      );
    });

    it('shows a pagination with 1 item', () => {
      expect(wrapper.find('Pagination').props().items).toEqual(1);
    });

    it('sets pagination items to 1000 while polls are being fetched', () => {
      props = { ...props, fetched: false };
      wrapper = shallow(
        <Router>
          <PollList {...props} />
        </Router>
      );
      wrapper = wrapper.find('PollList').dive();
      expect(wrapper.find('Pagination').props().items).toEqual(1000);
    });
  });

  describe('1 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [{ _id: 1, question: 'Question 1' }],
        itemsPerPage: 15,
        maxButtons: 7,
        fetched: true
      };
      wrapper = shallow(
        <Router>
          <PollList {...props} />
        </Router>
      );
      wrapper = wrapper.find('PollList').dive();
    });

    it('shows a single poll', () => {
      expect(wrapper.find('.collection-item').length).toEqual(1);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach(poll => {
        expect(wrapper.find('.collection-item').debug()).toContain(
          poll.question
        );
      });
    });

    it('shows a pagination with 1 item', () => {
      expect(wrapper.find('Pagination').props().items).toEqual(1);
    });
  });

  describe('2 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [
          { _id: 1, question: 'Question 1' },
          { _id: 2, question: 'Question 2' }
        ],
        itemsPerPage: 15,
        maxButtons: 7,
        fetched: true
      };
      wrapper = shallow(
        <Router>
          <PollList {...props} />
        </Router>
      );
      wrapper = wrapper.find('PollList').dive();
    });

    it('shows two polls', () => {
      expect(wrapper.find('.collection-item').length).toEqual(2);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('.collection-item')
            .at(i)
            .debug()
        ).toContain(poll.question);
      });
    });

    it('shows a link to view each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('.collection-item')
            .at(i)
            .find('Link')
            .props().to
        ).toContain(`/polls/${poll._id}`);
      });
    });

    it('shows a pagination with 1 item', () => {
      expect(wrapper.find('Pagination').props().items).toEqual(1);
    });
  });

  describe('10 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [
          { _id: 1, question: 'Question 1' },
          { _id: 2, question: 'Question 2' },
          { _id: 3, question: 'Question 3' },
          { _id: 4, question: 'Question 4' },
          { _id: 5, question: 'Question 5' },
          { _id: 6, question: 'Question 6' },
          { _id: 7, question: 'Question 7' },
          { _id: 8, question: 'Question 8' },
          { _id: 9, question: 'Question 9' },
          { _id: 10, question: 'Question 10' }
        ],
        itemsPerPage: 15,
        maxButtons: 7,
        fetched: true
      };
      wrapper = shallow(
        <Router>
          <PollList {...props} />
        </Router>
      );
      wrapper = wrapper.find('PollList').dive();
    });

    it('shows ten polls', () => {
      expect(wrapper.find('.collection-item').length).toEqual(10);
    });

    it('shows the title of each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('.collection-item')
            .at(i)
            .debug()
        ).toContain(poll.question);
      });
    });

    it('shows a link to view each poll', () => {
      props.polls.forEach((poll, i) => {
        expect(
          wrapper
            .find('.collection-item')
            .at(i)
            .find('Link')
            .props().to
        ).toContain(`/polls/${poll._id}`);
      });
    });

    it('shows a pagination with 1 item', () => {
      expect(wrapper.find('Pagination').props().items).toEqual(1);
    });
  });

  describe('20 polls', () => {
    beforeEach(() => {
      props = {
        title: 'Test Title',
        polls: [
          { _id: 1, question: 'Question 1' },
          { _id: 2, question: 'Question 2' },
          { _id: 3, question: 'Question 3' },
          { _id: 4, question: 'Question 4' },
          { _id: 5, question: 'Question 5' },
          { _id: 6, question: 'Question 6' },
          { _id: 7, question: 'Question 7' },
          { _id: 8, question: 'Question 8' },
          { _id: 9, question: 'Question 9' },
          { _id: 10, question: 'Question 10' },
          { _id: 11, question: 'Question 11' },
          { _id: 12, question: 'Question 12' },
          { _id: 13, question: 'Question 13' },
          { _id: 14, question: 'Question 14' },
          { _id: 15, question: 'Question 15' },
          { _id: 16, question: 'Question 16' },
          { _id: 17, question: 'Question 17' },
          { _id: 18, question: 'Question 18' },
          { _id: 19, question: 'Question 19' },
          { _id: 20, question: 'Question 20' }
        ],
        itemsPerPage: 15,
        maxButtons: 7,
        fetched: true
      };
      wrapper = shallow(
        <Router>
          <PollList {...props} />
        </Router>
      );
      wrapper = wrapper.find('PollList').dive();
    });

    it('shows a limited number of polls', () => {
      expect(wrapper.find('.collection-item').length).toEqual(15);
    });

    it('shows the title of each poll', () => {
      props.polls.slice(0, 15).forEach((poll, i) => {
        expect(
          wrapper
            .find('.collection-item')
            .at(i)
            .debug()
        ).toContain(poll.question);
      });
    });

    it('shows a link to view each poll', () => {
      props.polls.slice(0, 15).forEach((poll, i) => {
        expect(
          wrapper
            .find('.collection-item')
            .at(i)
            .find('Link')
            .props().to
        ).toContain(`/polls/${poll._id}`);
      });
    });

    it('shows a pagination with 2 items', () => {
      expect(wrapper.find('Pagination').props().items).toEqual(2);
    });

    it('can display a pagination with an activePage other than 1', () => {
      wrapper.setState({ activePage: 2 });
      expect(wrapper.find('Pagination').props().activePage).toEqual(2);
    });
  });
});
