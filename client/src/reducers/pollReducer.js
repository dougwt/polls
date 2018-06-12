import {
  CREATE_POLL_RESET,
  CREATE_POLL_REQUEST,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAILURE
} from '../actions/types';

const initialState = {
  waiting: false,
  polls: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
  case CREATE_POLL_RESET:
    return { ...state, waiting: false, error: null };
  case CREATE_POLL_REQUEST:
    return { ...state, waiting: true, error: null };
  case CREATE_POLL_SUCCESS:
    return {
      ...state,
      waiting: false,
      error: null,
      polls: [...(state.polls ? state.polls : []), action.payload]
    };
  case CREATE_POLL_FAILURE:
    return { ...state, waiting: false, error: action.payload };
  default:
    return state;
  }
}
