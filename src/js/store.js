import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const limit = 500;

function wall(state = [], action) {
  const {post, type} = action;
  switch(type){
    case 'NEW_POST':
      return [...state, post].slice(0,limit);
    default: 
      return state;
  }
}

const store = createStore(wall, [], compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
