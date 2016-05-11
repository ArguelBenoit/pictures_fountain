import connect from 'tweetping-connect';
import { render } from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import wallReducer from 'redux-ping/lib/reducers/wall';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { setSize, fetchHistory, aggregate } from 'redux-ping/lib/actions/wall'
import Fountain from './fountain.jsx';

const widthContainer = 800;
const heightContainer = 300;

const reducers = {
  wall: wallReducer
};

const store = createStore(combineReducers(reducers), undefined, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(setSize(5));

setTimeout(() => {
  store.dispatch(fetchHistory('nutella', {
    hostname: 'hq.tweetping.net'
  }));
});

connect('nutella', 'wall', (data) => {
  store.dispatch(aggregate(data));
}, 'wss://tweetping.net/'); 

render(
  <Fountain store={store} widthContainer={widthContainer} heightContainer={heightContainer} />,
  document.getElementById('fountain')
);
