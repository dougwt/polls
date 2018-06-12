import pollReducer from '../pollReducer';
import {
  CREATE_POLL_RESET,
  CREATE_POLL_REQUEST,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAILURE
} from '../../actions/types';
import { poll } from '../../data/fixtures';

describe('pollReducer', () => {
  it('returns the initial state', () => {
    expect(pollReducer({}, {})).toEqual({});
  });

  it('resets a Poll form submission', () => {
    const state = pollReducer({}, { type: CREATE_POLL_RESET });
    expect(state.waiting).toEqual(false);
    expect(state.error).toEqual(null);
  });

  it('can initialize a Poll form submission', () => {
    const state = pollReducer(
      {},
      {
        type: CREATE_POLL_REQUEST,
        payload: poll
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
        type: CREATE_POLL_FAILURE,
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
        type: CREATE_POLL_SUCCESS,
        payload: poll
      }
    );
    expect(state.waiting).toEqual(false);
    expect(state.error).toEqual(null);
    expect(state.polls.length).toEqual(1);
    expect(state.polls[0].question).toEqual(poll.question);
    expect(state.polls[0].choices).toEqual(poll.choices);
    expect(state.polls[0].respondents).toEqual(poll.respondents);
  });

  // it('fetches a poll', () => {
  //   expect(rootReducer({}, { type: actions.FETCH_POLL, payload: 'user' }))
  //     .toEqual({ auth: null, form: {} });
  // });
});
