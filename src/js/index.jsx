import { setSize, loadHistory, aggregate } from 'redux-ping/lib/actions/wall'
import Fountain from './fountain.jsx';
import { render } from 'react-dom';
import React from 'react';
 
store.dispatch(setSize(10)); //set wall size to 10 
store.dispatch(loadHistory(42)); //load posts from stream 42 
 
store.dispatch(aggregate(post)); //aggregate a new post manually 

const styleContainer = {
  width: 500,
  height: 400
};

render(
  <Fountain styleContainer={styleContainer} />,
  document.getElementById('fountain')
);
