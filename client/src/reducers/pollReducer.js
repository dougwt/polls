import { FETCH_POLL } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_POLL:
      return action.payload || true;
    default:
      return state;
  }
};
