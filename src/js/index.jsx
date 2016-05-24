import createConnection from 'tweetping-connect';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import Fountain from './fountain.jsx';
import store from './store';

const widthContainer = 1200;
const heightContainer = 300;
const attributes = {
  widthContainer,
  heightContainer
};
const {connect} = createConnection('nutella', {
  hostname: 'hq.tweetping.net'
});

connect('wall', post => {
  store.dispatch({
    type: 'NEW_POST',
    post
  });
});

render(
  <Provider store={store}>
    <Fountain {...attributes} />
  </Provider>,
  document.getElementById('fountain')
);
