import React, {Component, PropTypes} from 'react'; 
import Fountain from './fountain.jsx';
import TWEEN from 'tween.js';
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
    var animationTime = 500;
    var frames = ( animationTime / 1000 ) * 60;
    var lenghtX = 300;
    var xOneFrame = (animationTime / frames) / (animationTime / lenghtX);
    if (myTime < animationTime) {
      this.setState({
        x: this.state.x + xOneFrame
      });
    }

    var lenghtY = 300;
    var yOneFrame = ((animationTime / frames) / (animationTime / lenghtY));

    if (myTime < animationTime) {
      console.log(yOneFrame);
      this.setState({
        y: this.state.y - (yOneFrame * 0.8)
      });
    }

    // var currentPos = 0;
    // var incrementer = .01;
     
    // function test() {
    //   incrementer += .0035;
    //   currentPos += (1 / incrementer);
    //   // console.log(currentPos);
    //   if (Math.abs(currentPos) >= lenghtY) {
    //     currentPos = 0;
    //     incrementer = .01;
    //   }
    //   requestAnimationFrame(test);
    // }
    // test();    
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
	    transform: 'translateX('+ this.state.x +'px) translateY('+ this.state.y +'px)'
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
