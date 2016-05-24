import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tweet from './tweet.jsx';

function Fountain(props) {
  const {heightContainer, widthContainer} = props;
  const tweets = props.wall;
  const styleContainer = {
    width: widthContainer,
    height: heightContainer
  };
  return <div className="container" style={styleContainer}>
    {tweets.map((item, i) => <Tweet widthContainer={widthContainer} heightContainer={heightContainer} key={item._id} index={i} {...item} />)}
  </div>;
}

Fountain.propTypes = {
  wall: PropTypes.any,
  heightContainer: PropTypes.number,
  widthContainer: PropTypes.number
};
export default connect(wall => {
  return {
    wall
  };
})(Fountain);
