import {
  FETCH_POLLS,
  CREATE_POLL_RESET,
  CREATE_POLL_REQUEST,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAILURE
} from '../actions/types';

const initialState = {
  waiting: false,
  polls: [],
  fetched: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
  case FETCH_POLLS: {
    return { ...state, polls: action.payload.data, fetched: true };

    // const polls = [];
    // for (let i = 1; i <= 500; i++) {
    //   const owner = i % 2 !== 0 ? '5a3738b6499d8baa793491a5' : 'OTHER';
    //   polls.push({ _id: i, owner, question: `Question ${i}` });
    // }
    // return { ...state, polls, fetched: true };
  }
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
