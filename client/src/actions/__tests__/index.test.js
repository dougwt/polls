import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import * as actions from '../index';
import * as types from '../types';
import { poll } from '../../data/fixtures';

const middlewares = [reduxThunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);

const getAsyncActions = async (actionCreator, args = [], state = {}) => {
  const store = mockStore(state);
  await store.dispatch(actionCreator(...args));
  return store.getActions();
};

describe('actions', () => {
  describe('fetchUser', () => {
    let action;

    beforeEach(async done => {
      const mock = new MockAdapter(axios);
      mock.onGet('/api/current_user').reply(200, 'PAYLOAD');

      action = await getAsyncActions(actions.fetchUser);
      done();
    });

    it('creates an action to fetch the currently auth\'d user', () => {
      expect(action[0].type).toEqual(types.FETCH_USER);
      expect(action[0].payload.data).toEqual('PAYLOAD');
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

  describe('createPoll', () => {
    let callback;
    let action;

    describe('failure', () => {
      beforeEach(async done => {
        const mock = new MockAdapter(axios);
        mock.onPost('/api/polls/new').reply(400, { error: 'ERROR MESSAGE ' });

        callback = jest.fn();

        action = await getAsyncActions(actions.createPoll, [{}, callback]);
        done();
      });

      it('creates an action on request', () => {
        const expectedAction = {
          type: types.CREATE_POLL_REQUEST
        };
        expect(action[0]).toEqual(expectedAction);
      });

      it('does NOT execute the callback function', () => {
        expect(callback).toHaveBeenCalledTimes(0);
      });

      it('creates an action on failure', () => {
        expect(action[1].type).toEqual(types.CREATE_POLL_FAILURE);
        expect(action[1].payload.response.status).toEqual(400);
        expect(action[1].payload.response.data).toEqual({
          error: 'ERROR MESSAGE '
        });
      });
    });

    describe('success', () => {
      beforeEach(async done => {
        const mock = new MockAdapter(axios);
        mock.onPost('/api/polls/new').reply(200, poll);

        callback = jest.fn();

        action = await getAsyncActions(actions.createPoll, [{}, callback]);
        done();
      });

      it('creates an action on request', () => {
        const expectedAction = {
          type: types.CREATE_POLL_REQUEST
        };
        expect(action[0]).toEqual(expectedAction);
      });

      it('executes the callback function', () => {
        expect(callback).toHaveBeenCalledWith();
      });

      it('creates an action on success', () => {
        const expectedAction = {
          type: types.CREATE_POLL_SUCCESS,
          payload: poll
        };
        expect(action[1]).toEqual(expectedAction);
      });
    });
  });
});
