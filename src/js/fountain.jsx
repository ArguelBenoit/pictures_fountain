import { widthContainer, heightContainer } from './config';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tweet from './tweet.jsx';

function Fountain(props) {
  const tweets = props.wall;
  const styleContainer = {
    width: widthContainer,
    height: heightContainer
  };
  return <div className="container" style={styleContainer}>
    {tweets.map((item, i) => <Tweet key={item._id} index={i} {...item} />)}
  </div>;
}

Fountain.propTypes = {
  wall: PropTypes.any,
  attributes: PropTypes.any
};
export default connect(wall => {
  return {
    wall
  };
})(Fountain);
