import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

export default function wrapWithProvider({ children, initialState = {} }) {
  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  return <Provider store={store}>{children}</Provider>;
}
