import React, {PropTypes} from 'react';
import Fountain from './fountain.jsx';

const Tweet = (props) => {
  const {heightContainer, widthContainer} = props;
  const userUrl = `https://twitter.com/${props.user.name}`;
  const tweetUrl = userUrl + '/status/' + props.id;
  const profilePicture = props.pictureSize ?
    props.user.profile_picture.replace('_normal', '_' + props.pictureSize) :
    props.user.profile_picture;

  const styleTweet = {
    position: 'absolute',
    marginTop: heightContainer
  }

  return <div className="tweet" style={styleTweet} >
    <a href={tweetUrl}><img src={profilePicture}/></a>
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
