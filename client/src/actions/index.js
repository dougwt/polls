import axios from 'axios';
import * as types from './types';

export const fetchUser = () => {
  const res = axios.get('/api/current_user');

  return { type: types.FETCH_USER, payload: res };
};

export const createPoll = (poll, history) => dispatch => {
  dispatch({ type: types.CREATE_POLL_REQUEST });

  axios
    .post('/api/polls/new', poll)
    .then(res => {
      dispatch({ type: types.CREATE_POLL_SUCCESS, payload: res.data });
      history.push('/polls');
    })
    .catch(err => {
      dispatch({ type: types.CREATE_POLL_FAILURE, payload: err });
    });
};
