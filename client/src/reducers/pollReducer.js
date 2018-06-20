import _ from 'lodash';
import {
  FETCH_POLLS,
  SAVE_POLL_RESET,
  SAVE_POLL_REQUEST,
  SAVE_POLL_SUCCESS,
  SAVE_POLL_FAILURE
} from '../actions/types';

const initialState = {
  waiting: false,
  polls: {},
  fetched: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
  case FETCH_POLLS: {
    return {
      ...state,
      polls: _.keyBy(action.payload.data, '_id'),
      fetched: true
    };
  }
  case SAVE_POLL_RESET:
    return { ...state, waiting: false, error: null };
  case SAVE_POLL_REQUEST:
    return { ...state, waiting: true, error: null };
  case SAVE_POLL_SUCCESS:
    return {
      ...state,
      waiting: false,
      error: null,
      polls: {
        ...state.polls,
        [action.payload.data._id]: action.payload.data
      }
    };
  case SAVE_POLL_FAILURE:
    return { ...state, waiting: false, error: action.payload };

  default:
    return state;
  }
}
