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
  dispatch({ type: types.CREATE_POLL_REQUEST });

  axios
    .post('/api/polls/new', poll)
    .then(res => {
      dispatch({ type: types.CREATE_POLL_SUCCESS, payload: res.data });
      callback();
    })
    .catch(err => {
      dispatch({ type: types.CREATE_POLL_FAILURE, payload: err });
    });
};
