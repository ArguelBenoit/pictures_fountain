import connect from 'tweetping-connect';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { setSize, fetchHistory, aggregate } from 'redux-ping/lib/actions/wall';
import Fountain from './fountain.jsx';

const widthContainer = 1200;
const heightContainer = 300;

const reducers = {
  wall: wallReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(setSize(3));

setTimeout(() => {
  store.dispatch(fetchHistory('nutella', {
    hostname: 'hq.tweetping.net'
  }));
});

connect('nutella', 'wall', (post) => {
  store.dispatch(aggregate(post));
}, 'wss://hq.tweetping.net/'); 

const attributes = {
  widthContainer,
  heightContainer
};

render(
  <Provider store={store}>
    <Fountain {...attributes} />
  </Provider>,
  document.getElementById('fountain')
);
