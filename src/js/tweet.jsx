import React, { Component, PropTypes } from 'react';
import raf from 'raf';
import { 
  fontSizeHashtag,
  colorHashtag,
  widthContainer,
  heightContainer,
  animationTime,
  tiltHashtag,
  degMin,
  degMax
} from './config';

var width = widthContainer;
var frames = ( animationTime / 1000 ) * 50;
var oneFrame;
var marginLeft = ( width / 2 ) - 24;
if(window.innerWidth < width) {
  width = window.innerWidth - 20;
  marginLeft = ( window.innerWidth / 2 ) - 24;
}
function reSize() {
  if(window.innerWidth < width) {
    width = window.innerWidth - 20;
    marginLeft = ( window.innerWidth / 2 ) - 24;
  } else {
    width = widthContainer;
    marginLeft = ( widthContainer / 2 ) - 24;
  }
}
window.addEventListener('resize', reSize);
function random(min, max) {
  return Math.random() * (max - min) + min;
}
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
      y: 0,
      randomDeg: random(degMin, degMax),
      lenghtX: ( Math.random() < 0.5 ? -1 : 1 ) * ( random((width/24)*1.5, (width/24)*2) ),
      lenghtY: random ( heightContainer/4, heightContainer - 100),
      deg: 0,
      // opacity: 1,
      scale: 0,
      xP: 0,
      yP: 0
    };
  }
  componentDidMount(){
    this._mounted = true;
  }
  componentWillUnmount(){
    this._mounted = false;
  }
  updatePosition(){
    if(!this.startTime){
      this.startTime = Date.now();
    }
    if(!this._mounted){
      return;
    }
    var myTime = Date.now() - this.startTime;
    oneFrame = ( animationTime / frames ) / ( animationTime / this.state.lenghtX );
    if (myTime < animationTime) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeOutCubic(myTime, 0, this.state.lenghtY, animationTime),
        yP: easeOutCubic(myTime, 0, this.state.lenghtY, animationTime),
        xP: ( Math.random() < 0.5 ? -1 : 1 ) * ( easeOutCubic(myTime, 0, this.state.lenghtY, animationTime) ),
        deg: this.state.deg + this.state.randomDeg,
        scale: this.state.scale + 0.04
      });
    } else if (myTime > animationTime*1 && myTime < animationTime*2) {
      this.setState({
        x: this.state.x + oneFrame,
        y: easeInCubic(myTime - animationTime*1, this.state.lenghtY, -this.state.lenghtY, animationTime),
        deg: this.state.deg + this.state.randomDeg,
        // opacity: this.state.opacity - 0.05
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
    raf(() => this.updatePosition());
  }
  render() {
    const { text, user, pictureSize } = this.props;
    const profilePicture = pictureSize ?
      user.profile_picture.replace('_normal', '_' + pictureSize) :
      user.profile_picture;
    var hashtag = text.match(/#[a-z]+/gi);
    var styleTweet = {
      position: 'absolute',
      height: heightContainer,
      width: width
    };
    var styleImg = {
      position: 'absolute',
      transform: 'translateX('+ this.state.x +'px) translateY('+ -this.state.y +'px) rotate('+ this.state.deg +'deg)',
      marginTop: heightContainer - 48,
      marginLeft: marginLeft
    };
    var styleP = {
      position: 'absolute',
      transform: 'scale('+ this.state.scale +') translateX('+ this.state.xP +'px) translateY('+ -this.state.yP +'px) rotate('+ tiltHashtag +'deg)',
      marginTop: heightContainer,
      marginLeft: marginLeft,
      color: colorHashtag,
      fontSize: fontSizeHashtag,
      // opacity: this.state.opacity
    };
    return <div style={styleTweet} className="tweet">
      <img src={profilePicture} style={styleImg} onLoad={() => this.updatePosition()} />
      <p style={styleP}>{hashtag}</p>
    </div>;
  }
}

Tweet.propTypes = {
  index: PropTypes.number,
  pictureSize: PropTypes.string,
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};
export default Tweet;