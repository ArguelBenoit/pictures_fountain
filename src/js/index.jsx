import createConnection from 'tweetping-connect';
import { render } from 'react-dom';
import React from 'react';
import Fountain from './fountain.jsx';
import store from './store';

const widthContainer = 1200;
const heightContainer = 300;

console.log(store);

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
  <Fountain store={store} widthContainer={widthContainer} heightContainer={heightContainer} />,
  document.getElementById('fountain')
);
