import _ from 'lodash';
import pollReducer from '../pollReducer';
import {
  FETCH_POLLS,
  SAVE_POLL_RESET,
  SAVE_POLL_REQUEST,
  SAVE_POLL_SUCCESS,
  SAVE_POLL_FAILURE
} from '../../actions/types';
import { poll } from '../../data/fixtures';

describe('pollReducer', () => {
  it('returns the initial state', () => {
    expect(pollReducer({}, {})).toEqual({});
  });

  it('fetches a list of polls', () => {
    const payload = {
      data: [
        { _id: 1, question: 'Question 1' },
        { _id: 2, question: 'Question 2' }
      ]
    };

    expect(pollReducer({}, { type: FETCH_POLLS, payload }).polls).toEqual(
      _.keyBy(payload.data, '_id')
    );
  });

  describe('SAVE_POLL', () => {
    it('resets a Poll form submission', () => {
      const state = pollReducer({}, { type: SAVE_POLL_RESET });
      expect(state.waiting).toEqual(false);
      expect(state.error).toEqual(null);
    });

    it('can initialize a Poll form submission', () => {
      const state = pollReducer(
        {},
        {
          type: SAVE_POLL_REQUEST,
          payload: { data: poll }
        }
      );
      expect(state.waiting).toEqual(true);
      expect(state.error).toEqual(null);
    });

    it('can handle a Poll form submission request error', () => {
      const error = { message: 'There was an error.' };
      const state = pollReducer(
        {},
        {
          type: SAVE_POLL_FAILURE,
          payload: error
        }
      );
      expect(state.waiting).toEqual(false);
      expect(state.error).toEqual(error);
    });

    it('can handle a Poll form submission request success', () => {
      const state = pollReducer(
        {},
        {
          type: SAVE_POLL_SUCCESS,
          payload: { _id: 3, ...poll }
        }
      );
      expect(state.waiting).toEqual(false);
      expect(state.error).toEqual(null);
      expect(Object.keys(state.polls).length).toEqual(1);
      expect(state.polls[3].question).toEqual(poll.question);
      expect(state.polls[3].choices).toEqual(poll.choices);
      expect(state.polls[3].respondents).toEqual(poll.respondents);
    });
  });
});
