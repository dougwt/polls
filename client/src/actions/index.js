import axios from 'axios';
import * as types from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  if (res) {
    localStorage.setItem('auth', JSON.stringify(res.data));
  }

  dispatch({ type: types.FETCH_USER, payload: res });
};

export const fetchPolls = () => {
  const res = axios.get('/api/polls');

  return { type: types.FETCH_POLLS, payload: res };
};

export const createPoll = (poll, callback) => dispatch => {
  dispatch({ type: types.SAVE_POLL_REQUEST });

  axios
    .post('/api/polls/new', poll)
    .then(res => {
      dispatch({ type: types.SAVE_POLL_SUCCESS, payload: res.data });
      callback(res.data);
    })
    .catch(err => {
      dispatch({ type: types.SAVE_POLL_FAILURE, payload: err });
    });
};

export const resetCreatePoll = () => {
  return { type: types.SAVE_POLL_RESET };
};

export const editPoll = (pollId, poll, callback) => dispatch => {
  dispatch({ type: types.SAVE_POLL_REQUEST });

  axios
    .post(`/api/polls/${pollId}`, poll)
    .then(res => {
      dispatch({ type: types.SAVE_POLL_SUCCESS, payload: res.data });
      callback(res.data);
    })
    .catch(err => {
      dispatch({ type: types.SAVE_POLL_FAILURE, payload: err });
    });
};

export const resetEditPoll = () => {
  return { type: types.SAVE_POLL_RESET };
};

export const deletePoll = (pollId, callback) => dispatch => {
  dispatch({ type: types.DELETE_POLL_REQUEST });

  axios
    .delete(`/api/polls/${pollId}`)
    .then(res => {
      dispatch({ type: types.DELETE_POLL_SUCCESS, payload: res.data });
      callback(res.data);
    })
    .catch(err => {
      dispatch({ type: types.DELETE_POLL_FAILURE, payload: err });
    });
};

export const resetDeletePoll = () => {
  return { type: types.DELETE_POLL_RESET };
};

export const votePoll = (pollId, choiceId, callback) => dispatch => {
  dispatch({ type: types.VOTE_POLL_REQUEST });

  axios
    .post(`/api/polls/${pollId}/${choiceId}`)
    .then(res => {
      dispatch({ type: types.VOTE_POLL_SUCCESS, payload: res.data });
      callback(res.data);
    })
    .catch(err => {
      dispatch({ type: types.VOTE_POLL_FAILURE, payload: err });
    });
};

export const resetVotePoll = () => {
  return { type: types.VOTE_POLL_RESET };
};
