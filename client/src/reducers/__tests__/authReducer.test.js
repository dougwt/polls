import authReducer from '../authReducer';
import { FETCH_USER } from '../../actions/types';

describe('authReducer', () => {
  it('returns the initial state', () => {
    expect(authReducer({}, {})).toEqual({});
  });

  it('fetches the currently auth\'d user', () => {
    const user = 'user';

    expect(authReducer({}, { type: FETCH_USER, payload: user })).toEqual(user);
  });
});
