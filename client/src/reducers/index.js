import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import pollReducer from './pollReducer';

export default combineReducers({
  auth: authReducer,
  poll: pollReducer,
  form: reduxForm
});
