// import _ from 'lodash';
import {
  FETCH_POLLS,
  SAVE_POLL_RESET,
  SAVE_POLL_REQUEST,
  SAVE_POLL_SUCCESS,
  SAVE_POLL_FAILURE
} from '../actions/types';

const initialState = {
  waiting: false,
  // TODO: replace polls with dict instead of array
  // polls: {},
  polls: [],
  fetched: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
  case FETCH_POLLS:
    return {
      ...state,
      // polls: _.keyBy(action.payload.data, '_id'),
      polls: action.payload.data,
      fetched: true
    };
  case SAVE_POLL_RESET:
    return { ...state, waiting: false, error: null };
  case SAVE_POLL_REQUEST:
    return { ...state, waiting: true, error: null };
  case SAVE_POLL_SUCCESS: {
    // const { data } = action.payload;
    return {
      ...state,
      waiting: false,
      error: null
      // polls: { ...state.polls, [data._id]: data }
    };
  }
  case SAVE_POLL_FAILURE:
    return { ...state, waiting: false, error: action.payload };

  default:
    return state;
  }
}
