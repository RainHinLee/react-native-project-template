
import React, { Component, PropTypes } from 'react';
import {
	View,
	StyleSheet, 
	Image, 
	TouchableOpacity,
	TouchableNativeFeedback, 
	Platform,
	Dimensions,
	Alert,
	StatusBar,
	Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video'; 
import Loading from '../Loading/index.js';

const {width,height} = Dimensions.get('window');
const ratio = 9/16;

export default class Player extends Component{
	
	constructor(props){
		super(props)
		this.state={
			isStarting: this.props.autoplay,  //--是否开始
			paused: false, //--是否暂停
		};
		this.duration = 0;
	}
	
  	getSizeStyles() {
  		if(this.props.fullscreen){  
  			return {
  				height:width,
  				width:width*16/9,
  			}
  		}else{
  			return {
  			  height: width * ratio,
  			  width,
  			};
  		}
  	}	
  	
  	onStartPress(){
  		this.setState({isStarting:true})
  	}
  	
  	onLoaded(ev){ //--视频加载完成
  		this.duration = ev.duration;
  	}
  	
  	onEnd(){ //--视频播放完成
  		this.setState({
  			isStarting:false,
  			pasused:false,
  		})
  	}
  	
  	renderStartButton() {
	    return  <View style={[{flex:1},global.styles.center]}>
		    		<TouchableNativeFeedback onPress={this.onStartPress.bind(this)}>
		    			<View style={styles.playButton}>
			        		<Icon style={styles.playArrow} name="play-arrow" size={42} />
		    			</View>
	      			</TouchableNativeFeedback>
	      		</View>
  	}	
  	
	renderVideo(){  //渲染视频
		return <Video style={[styles.player,this.getSizeStyles()]}
					source={this.props.src}
					paused={this.paused}
					resizeMode='contain'
					onLoad={this.onLoaded.bind(this)}
					onEnd={this.onEnd.bind(this)}
				/>
	}

  	renderThumbnail() {
  		let {poster} = this.props;
    	return  <Image style={styles.thumbnail,this.getSizeStyles()} source={poster} resizeMode='contain'>
        			{this.renderStartButton()}
      			</Image>
  	}
  	
	render(){
  		let {poster} = this.props;
  		let result =null;
  		if(!this.state.isStarting && poster){
  			result = this.renderThumbnail();
  		}else if(!poster){
  			result = this.renderStartButton();
  		}else{
  			result = this.renderVideo();
  		}
  		
  		if(this.props.fullscreen){
			return <View style={styles.fullscreen}>
						<View style={styles.rotateBox}>
							{result}
						</View>
						<StatusBar hidden={true}/>
					</View>	  			
  		}else{
  			return <View style={[styles.normalBox,this.getSizeStyles()]}>{result}</View>
  		}
	}
	
}

const styles = StyleSheet.create({
	fullscreen:{ //--全屏
		position:'absolute',
		left:0,
		top:0,
		width,
		height,
		zIndex:1000,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgba(0,0,0,1)',
	},
	
	rotateBox:{ //---全屏旋转
		width:height,
		height:width,
		transform:[{rotateZ:'-90deg'}],
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row',
	},
	
	normalBox:{  //--竖屏容器
		position:'relative',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'black',
	},
	
  	thumbnail: { //--封面
  		justifyContent: 'center',
  		alignItems: 'center',
		flexDirection:'row',
  	},	
  	
  	playButton: {
	    backgroundColor: 'rgba(0, 0, 0, 0.6)',
	    width: 64,
	    height: 64,
	    borderRadius: 32,
	    justifyContent: 'center',
	    alignItems: 'center',
  	},	
  	
    playArrow: {
   		color: 'white',
  	},
  	
  	player:{  //--播放器
  		
  	}
})
