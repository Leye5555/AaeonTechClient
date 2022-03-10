import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from "redux";
import App from './App';
import reducer from './reducers';
import './index.css';

const store = createStore(reducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

