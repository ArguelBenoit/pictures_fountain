import React, { Component, PropTypes } from 'react';

const widthContainer = 1200;
const heightContainer = 300;
const animationTime = 310;
const degMin = -3;
const degMax = 3;

function random(min, max) {
  return Math.random() * (max - min) + min;
}
function easeOutCubic(time, value, changeValue, duration) {
  return changeValue*((time=time/duration-1)*time*time + 1) + value;
}
function easeInCubic(time, value, changeValue, duration) {
  return changeValue*(time/=duration)*time*time + value;
}

var frames = ( animationTime / 1000 ) * 180;
var oneFrame;

class Tweet extends Component { 
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      deg: 0,
      randomDeg: random(degMin, degMax),
      lenghtX: ( Math.random() < 0.5 ? -1 : 1 ) * ( random((widthContainer/24)*1.5, (widthContainer/24)*2) ),
      lenghtY: random ( heightContainer/4, heightContainer - 100)
    };
  }
  componentDidMount(){
    this.startTime = Date.now();
    this.animationInterval = setInterval(() => this.updatePosition(), 1000 / 180);
  }
  componentWillUnmoun(){
    clearInterval(this.animationInterval);
  }
  updatePosition(){
    var myTime = Date.now() - this.startTime;
    oneFrame = ( animationTime / frames ) / ( animationTime / this.state.lenghtX );
    if (myTime < animationTime) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeOutCubic(myTime, 0, this.state.lenghtY, animationTime),
        deg: this.state.deg + this.state.randomDeg
      });
    } else if (myTime > animationTime*1 && myTime < animationTime*2) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeInCubic(myTime - animationTime*1, this.state.lenghtY, -this.state.lenghtY, animationTime),
        deg: this.state.deg + this.state.randomDeg
      });
    } else if (myTime > animationTime*2 && myTime < animationTime*3) {
      this.setState({
        x: this.state.x + (oneFrame * 0.8),
        y: (easeOutCubic(myTime - animationTime*2, 0, this.state.lenghtY, animationTime)) * 0.8,
        deg: this.state.deg + this.state.randomDeg
      });
    } else if (myTime > animationTime*3 && myTime < animationTime*4) {
      this.setState({
        x: this.state.x + (oneFrame * 0.8),
        y: (easeInCubic(myTime - animationTime*3, this.state.lenghtY, -this.state.lenghtY, animationTime)) * 0.8,
        deg: this.state.deg + this.state.randomDeg
      });
    } else if (myTime > animationTime*4 && myTime < animationTime*5) {
      this.setState({
        x: this.state.x + (oneFrame * 0.5),
        y: (easeOutCubic(myTime - animationTime*4, 0, this.state.lenghtY, animationTime)) * 0.5,
        deg: this.state.deg + this.state.randomDeg
      });
    } else if (myTime > animationTime*5 && myTime < animationTime*6) {
      this.setState({
        x: this.state.x + (oneFrame * 0.5),
        y: (easeInCubic(myTime - animationTime*5, this.state.lenghtY, -this.state.lenghtY, animationTime)) * 0.5,
        deg: this.state.deg + this.state.randomDeg
      });
    } else if (myTime > animationTime*6 && myTime < animationTime*7) {
      this.setState({
        x: this.state.x + (oneFrame * 0.5),
        y: easeInCubic(myTime - animationTime*6, 0, -this.state.lenghtY, animationTime),
        deg: this.state.deg + this.state.randomDeg
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
      marginTop: heightContainer - 48,
      marginLeft: ( widthContainer / 2 ) - 24,
      transform: 'translateX('+ this.state.x +'px) translateY('+ -this.state.y +'px) rotate('+ this.state.deg +'deg)'
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
  heightContainer: PropTypes.number,
  widthContainer: PropTypes.number
};
export default Tweet;