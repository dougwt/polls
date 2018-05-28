import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './index';
import * as types from './types';

describe('actions', () => {
  it('creates an action to fetch the currently auth\'d user', () => {
    // Mock axios request to `/api/current_user
    const mock = new MockAdapter(axios);
    mock.onGet('/api/current_user').reply(200, 'PAYLOAD');

    const expectedAction = { type: types.FETCH_USER, payload: 'PAYLOAD' };

    // Process async action creator
    const dispatch = jest.fn();
    actions
      .fetchUser()(dispatch)
      .then(() => dispatch.mock.calls[0][0])
      .then(action => {
        expect(action).toEqual(expectedAction);
      });
  });
});
