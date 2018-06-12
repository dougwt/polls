import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../index';
import * as types from '../types';
import { poll } from '../../data/fixtures';

const getAsyncAction = async (actionCreator, args = []) => {
  const dispatch = jest.fn();

  await actionCreator(...args)(dispatch);
  const action = dispatch.mock.calls[0][0];

  return action;
};

describe('actions', () => {
  it('creates an action to fetch the currently auth\'d user', () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/api/current_user').reply(200, 'PAYLOAD');

    const expectedAction = { type: types.FETCH_USER, payload: 'PAYLOAD' };

    getAsyncAction(actions.fetchUser).then(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  // TODO: Expand tests for updated createPoll thunk
  describe('createPoll', () => {
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
