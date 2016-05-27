import { widthContainer, heightContainer } from './config';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tweet from './tweet.jsx';

function Fountain(props) {
  const tweets = props.wall;
  var styleContainer = {
    width: widthContainer,
    height: heightContainer,
    marginLeft: ( window.innerWidth - widthContainer ) / 2
  };
  var widthViewport = window.innerWidth;
  if(widthViewport < widthContainer) {
    styleContainer.width = widthViewport;
  }
  function reSize() {
    if(window.innerWidth < widthContainer) {
      styleContainer.width = window.innerWidth;
      styleContainer.marginLeft = 0;
    }
  }
  window.addEventListener('resize', reSize);
  return <div className="container" id="container" style={styleContainer}>
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
