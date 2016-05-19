import React, { Component, PropTypes } from 'react'; 

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const widthContainer = 800;
const heightContainer = 300;

var animationTime = 200;
var frames = ( animationTime / 1000 ) * 120;
var lenghtX = random(-widthContainer/6, widthContainer/6);
var lenghtY = random(heightContainer/3,heightContainer);
var oneFrame = (animationTime / frames) / (animationTime / lenghtX);

function easeOutCubic(time, value, changeValue, duration) {
  return changeValue*((time=time/duration-1)*time*time + 1) + value;
}
function easeInCubic(time, value, changeValue, duration) {
  return changeValue*(time/=duration)*time*time + value;
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
    this.animationInterval = setInterval(() => this.updatePosition(), 1000 / 120);
  }
  componentWillUnmoun(){
    clearInterval(this.animationInterval);
  }
  updatePosition(){
    var myTime = Date.now() - this.startTime;
    if (myTime < animationTime) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeOutCubic(myTime, 0, lenghtY, animationTime)
      });
    } else if (myTime > animationTime*1 && myTime < animationTime*2) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeInCubic(myTime - animationTime*1, lenghtY, -lenghtY, animationTime)
      });
    } else if (myTime > animationTime*2 && myTime < animationTime*3) {
      this.setState({
        x: this.state.x + (oneFrame * 0.8),
        y: (easeOutCubic(myTime - animationTime*2, 0, lenghtY, animationTime)) * 0.8
      });
    } else if (myTime > animationTime*3 && myTime < animationTime*4) {
      this.setState({
        x: this.state.x + (oneFrame * 0.8),
        y: (easeInCubic(myTime - animationTime*3, lenghtY, -lenghtY, animationTime)) * 0.8
      });
    } else if (myTime > animationTime*4 && myTime < animationTime*5) {
      this.setState({
        x: this.state.x + (oneFrame * 0.6),
        y: (easeOutCubic(myTime - animationTime*4, 0, lenghtY, animationTime)) * 0.6
      });
    } else if (myTime > animationTime*5 && myTime < animationTime*6) {
      this.setState({
        x: this.state.x + (oneFrame * 0.6),
        y: (easeInCubic(myTime - animationTime*5, lenghtY, -lenghtY, animationTime)) * 0.6
      });
    }
  }

	render() {
    const { heightContainer, widthContainer, user, pictureSize } = this.props;
    const profilePicture = pictureSize ?
      user.profile_picture.replace('_normal', '_' + pictureSize) :
      user.profile_picture;

    const styleTweet = {
      position: 'absolute',
      height: heightContainer,
      width: widthContainer
    };
    var styleImg = {
      position: 'absolute',
      marginTop: heightContainer,
      marginLeft: ( widthContainer / 2 ) - 24,
      transform: 'translateX('+ this.state.x +'px) translateY('+ -this.state.y +'px)'
    };
    return <div style={styleTweet} className="tweet">
      <img src={profilePicture} style={styleImg} />
    </div>;
	}
}

Tweet.propTypes = {
  index: PropTypes.number,
  pictureSize: PropTypes.string,
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  text: PropTypes.string,
  heightContainer: PropTypes.number,
  widthContainer: PropTypes.number
};
export default Tweet;
