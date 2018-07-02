import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const localAuth = JSON.parse(localStorage.getItem('auth') || null);

const Root = ({
  children,
  initialState = { auth: localAuth ? localAuth : false }
}) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk, promiseMiddleware))
  );

  return <Provider store={store}>{children}</Provider>;
};
Root.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Root;
