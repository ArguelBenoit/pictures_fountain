import createConnection from 'tweetping-connect';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import Fountain from './fountain.jsx';
import store from './store';
import { limit } from './config';

const {connect, load} = createConnection('nutella', {
  hostname: 'hq.tweetping.net'
});

function dispatchPost(post) {
  store.dispatch({
    type: 'NEW_POST',
    post
  });
}

connect('wall', dispatchPost);
load('wall/', {
  query: {
    size: limit
  }
}).then(posts => {
  posts.forEach((post, i) => {
    setTimeout(() => {
      dispatchPost(post);
    }, i * 200);
  });
});

render(
  <Provider store={store}>
    <Fountain />
  </Provider>,
  document.getElementById('fountain')
);
