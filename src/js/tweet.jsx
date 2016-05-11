import React, {Component, PropTypes} from 'react'; 
import Fountain from './fountain.jsx';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//TODO: npm uninstall

class Tweet extends Component { 
	constructor(props){
		super(props);
		this.state = {
			x: 0,
			y: 0
		};
	}
	componentDidMount(){
		this.startTime = Date.now();
		this.animationInterval = setInterval(() => this.updatePosition(), 1000 / 60);
	}
	componentWillUnmoun(){
		clearInterval(this.animationInterval);
	}
	updatePosition(){

		this.setState({
			x: this.state.x + 2,
			y: this.state.y - 1
		});
	}

	render() {
	  const { heightContainer, widthContainer, user, pictureSize } = this.props;
	  const userUrl = `https://twitter.com/${user.name}`;
	  // const tweetUrl = userUrl + '/status/' + props.id;
	  const profilePicture = pictureSize ?
	    user.profile_picture.replace('_normal', '_' + pictureSize) :
	    user.profile_picture;

	  const styleTweet = {
	    position: 'absolute',
	    height: heightContainer,
	    width: widthContainer
	  };
	  var imagePosition = {
	    x: 0,
	    y: 0
	  };
	  var styleImg = {
	    position: 'absolute',
	    marginTop: heightContainer,
	    marginLeft: ( widthContainer / 2 ) - 24,
	    transform: 'translateX('+ this.state.x +'px) translateY('+ this.state.y +'px)'
	  };
	  return <div style={styleTweet} className="tweet" style={styleTweet} >
	      <img src={profilePicture} style={styleImg} />
	  </div>;
	}
}

Tweet.propTypes = {
  index: PropTypes.number,
  pictureSize: PropTypes.string,
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  text: PropTypes.string
};
export default Tweet;
