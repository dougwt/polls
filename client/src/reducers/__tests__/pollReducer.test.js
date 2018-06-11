import pollReducer from '../pollReducer';
import { CREATE_POLL } from '../../actions/types';
import { poll } from '../../data/fixtures';

describe('pollReducer', () => {
  it('returns the initial state', () => {
    expect(pollReducer({}, {})).toEqual({});
  });

  it('adds a new Poll', () => {
    const state = pollReducer(
      { polls: [] },
      {
        type: CREATE_POLL,
        payload: poll
      }
    );
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
