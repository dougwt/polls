import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  return <Provider store={store}>{children}</Provider>;
};
Root.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Root;
