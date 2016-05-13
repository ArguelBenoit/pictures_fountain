import React, {Component, PropTypes} from 'react'; 
import Fountain from './fountain.jsx';

function random(min, max) {
  return Math.random() * (max - min) + min;
}

var animationTime = 400;
var frames = ( animationTime / 1000 ) * 60;
var lenghtX = 200;
var lenghtY = random(100,300);
var oneFrame = (animationTime / frames) / (animationTime / lenghtX);


//  x: x, t: current time, b: begInnIng value, c: change In value, d: duration
function easeOutCubic(x, t, b, c, d) {
  return c*((t=t/d-1)*t*t + 1) + b;
}
function easeInCubic(x, t, b, c, d) {
  return c*(t/=d)*t*t + b;
}

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
    var myTime = Date.now() - this.startTime;
    if (myTime < animationTime) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeOutCubic(lenghtX, myTime, 0, lenghtY, animationTime)
      });
    } else if (myTime > animationTime && myTime < animationTime*2) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeInCubic(lenghtX, myTime - animationTime, lenghtY, 0, animationTime)
      });
    }
  }


	render() {
	  const { heightContainer, widthContainer, user, pictureSize } = this.props;
	  const userUrl = `https://twitter.com/${user.name}`;
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
	    transform: 'translateX('+ this.state.x +'px) translateY('+ - this.state.y +'px)'
	  };
	  return <div style={styleTweet} className="tweet" style={styleTweet}>
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
