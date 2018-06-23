import _ from 'lodash';
import {
  FETCH_POLLS,
  SAVE_POLL_RESET,
  SAVE_POLL_REQUEST,
  SAVE_POLL_SUCCESS,
  SAVE_POLL_FAILURE,
  DELETE_POLL_RESET,
  DELETE_POLL_REQUEST,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE,
  VOTE_POLL_RESET,
  VOTE_POLL_REQUEST,
  VOTE_POLL_SUCCESS,
  VOTE_POLL_FAILURE
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
  case DELETE_POLL_RESET:
  case VOTE_POLL_RESET:
    return { ...state, waiting: false, error: null };
  case SAVE_POLL_REQUEST:
  case DELETE_POLL_REQUEST:
  case VOTE_POLL_REQUEST:
    return { ...state, waiting: true, error: null };
  case SAVE_POLL_SUCCESS:
  case VOTE_POLL_SUCCESS: {
    return {
      ...state,
      waiting: false,
      error: null,
      polls: {
        ...state.polls,
        [action.payload._id]: action.payload
      }
    };
  }
  case DELETE_POLL_SUCCESS: {
    return {
      ...state,
      waiting: false,
      error: null,
      polls: _.omit(state.polls, action.payload._id)
    };
  }
  case SAVE_POLL_FAILURE:
  case DELETE_POLL_FAILURE:
  case VOTE_POLL_FAILURE: {
    return { ...state, waiting: false, error: action.payload };
  }
  default:
    return state;
  }
}
