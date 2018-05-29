import axios from 'axios';
import * as types from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const createPoll = poll => async dispatch => {
  const res = await axios.post('/api/polls/new', poll);

  dispatch({ type: types.CREATE_POLL, payload: res.data });
};
