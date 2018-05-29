import { CREATE_POLL } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
  case CREATE_POLL:
    return { ...state, polls: [...state.polls, action.payload] };
  default:
    return state;
  }
}
