import React, {PropTypes} from 'react'; 
import Fountain from './fountain.jsx';

const Tweet = (props) => {
  const { heightContainer, widthContainer } = props;
  const userUrl = `https://twitter.com/${props.user.name}`;
  // const tweetUrl = userUrl + '/status/' + props.id;
  const profilePicture = props.pictureSize ?
    props.user.profile_picture.replace('_normal', '_' + props.pictureSize) :
    props.user.profile_picture;

  const styleTweet = {
    position: 'absolute',
    height: heightContainer,
    width: widthContainer
  };
  const imagePosition = {
    x: 34,
    y: 18
  };
  console.log(imagePosition.x);
  var styleImg = {
    position: 'absolute',
    marginTop: heightContainer,
    marginLeft: ( widthContainer / 2 ) - 24,
    transform: 'translateX('+ imagePosition.x +'px) translateY('+ imagePosition.y +'px)'
  };
  return <div style={styleTweet} className="tweet" style={styleTweet} >
    <img src={profilePicture} style={styleImg} />
  </div>;
};

Tweet.propTypes = {
  index: PropTypes.number,
  pictureSize: PropTypes.string,
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  text: PropTypes.string
};
export default Tweet;
