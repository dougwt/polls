import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Root from './Root';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
);
