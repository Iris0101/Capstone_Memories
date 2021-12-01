import React from 'react';
import ReactDOM from 'react-dom';
// This allows us to access the store which stores global states from anywhere
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers'; // from src/reducers/index.js

import App from './App';
import './index.css';

// set up redux, first create a store
const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );