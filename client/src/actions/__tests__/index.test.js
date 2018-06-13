import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../index';
import * as types from '../types';
import { poll } from '../../data/fixtures';

describe('actions', () => {
  describe('fetchUser', () => {
    let mock;
    let action;

    beforeEach(() => {
      mock = new MockAdapter(axios);
      mock.onGet('/api/current_user').reply(200, 'PAYLOAD');

      action = actions.fetchUser();
    });

    it('creates an action to fetch the currently auth\'d user', () => {
      expect(action.type).toEqual(types.FETCH_USER);
      action.payload.then(payload => {
        expect(payload.data).toEqual('PAYLOAD');
      });
    });
  });

  describe('fetchPolls', () => {
    let mock;
    let action;

    beforeEach(() => {
      mock = new MockAdapter(axios);
      mock
        .onGet('/api/polls')
        .reply(200, [{ question: 'Question 1' }, { question: 'Question 2' }]);

      action = actions.fetchPolls();
    });

    it('creates an action to fetch a list of polls', () => {
      expect(action.type).toEqual(types.FETCH_POLLS);
      action.payload.then(payload => {
        expect(payload.data).toEqual([
          { question: 'Question 1' },
          { question: 'Question 2' }
        ]);
      });
    });
  });

  // TODO: Expand tests for updated createPoll thunk
  describe('createPoll', () => {
    const getAsyncAction = async (actionCreator, args = []) => {
      const dispatch = jest.fn();

      await actionCreator(...args)(dispatch);
      const action = dispatch.mock.calls[0][0];

      return action;
    };

    let history;
    let action;

    beforeEach(done => {
      const mock = new MockAdapter(axios);
      mock.onPost('/api/polls/new').reply(200, poll);

      history = { push: jest.fn() };

      getAsyncAction(actions.createPoll, [{}, history]).then(returnedAction => {
        action = returnedAction;
        done();
      });
    });

    it('redirects the user to the Dashboard page', () => {
      expect(history.push).toHaveBeenCalledWith('/polls');
    });

    xit('does something', () => {
      const expectedAction = { type: types.CREATE_POLL, payload: poll };
      expect(action).toEqual(expectedAction);
    });
  });
});
