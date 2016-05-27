import { createStore, compose, applyMiddleware } from 'redux';
import { limit } from './config';
import thunk from 'redux-thunk';

function wall(state = [], action) {
  const {post, type} = action;
  switch(type){
    case 'NEW_POST':
      return [...state, post].slice(-limit);
    default: 
      return state;
  }
}

const store = createStore(wall, [], compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
