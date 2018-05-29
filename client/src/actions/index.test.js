import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './index';
import * as types from './types';
import { poll } from '../data/fixtures';

const getAsyncAction = async actionCreator => {
  const dispatch = jest.fn();

  await actionCreator()(dispatch);
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

  it('creates an action to add a new poll', () => {
    const mock = new MockAdapter(axios);
    mock.onPost('/api/polls/new').reply(200, poll);

    const expectedAction = { type: types.CREATE_POLL, payload: poll };

    getAsyncAction(actions.createPoll).then(action => {
      expect(action).toEqual(expectedAction);
    });
  });
});
