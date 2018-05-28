import rootReducer from './index';
import * as actions from '../actions/types';

describe('rootReducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer({}, {})).toEqual({ auth: null, form: {} });
  });

  it('fetches the currently auth\'d user', () => {
    const user = 'user';

    expect(
      rootReducer({}, { type: actions.FETCH_USER, payload: user })
    ).toEqual({ auth: user, form: {} });
  });

  // it('fetches a poll', () => {
  //   expect(rootReducer({}, { type: actions.FETCH_POLL, payload: 'user' }))
  //     .toEqual({ auth: null, form: {} });
  // });
});
