import wallSelector from 'redux-ping/lib/selectors/wall';
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Tweet from './tweet.jsx';

function Fountain(props){
  const {heightContainer, widthContainer, store} = props;
  const tweets = props.wall;
  return <div className="container">
    {tweets.map((item, i) => <Tweet key={item._id} index={i} {...item} />)}
  </div>;
}

Fountain.propTypes = {
  wall: PropTypes.any,
  heightContainer: PropTypes.Number,
  widthContainer: PropTypes.Number
};
export default connect(({ wall }) => {
  return {
    wall: wallSelector.all(wall)
  };
})(Fountain);