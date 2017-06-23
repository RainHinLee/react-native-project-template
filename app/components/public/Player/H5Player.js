/*---使用webview中的h5 video 来实现video的播放；
		
		<H5Player 
			src={require('../../../../assets/media/Jeff.mp4')} 
			poster={require('../../../../assets/images/lilian.jpg')}
			autoplay={true}
			fullscreen={true}
		/>

*/

import React, { Component, PropTypes } from 'react';
import {
	View,
	StyleSheet, 
	Image, 
	TouchableNativeFeedback, 
	Platform,
	Dimensions,
	Alert,
	StatusBar,
	Text,
	BackHandler,
	WebView,
	Slider,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Foundation';
import  * as Animatable from 'react-native-animatable';
import {Grid,Row,Col} from 'react-native-easy-grid';
import {connect} from 'react-redux';

import parseHtml from './html.js'

const {width,height} = Dimensions.get('window');
const ratio = 9/16;

class H5Player extends Component{
	constructor(props){
		super(props)
		this.state={
			isStarting: this.props.autoplay,  //--是否开始
			paused: !this.props.autoplay,  //--是否自动播放
			currentTime: 0, //--当前播放时间；
			volume:true,  //--音量
			h5Time:0,
		};
		
		this.duration = 0;
		this.timelineWidth = 0;
		this.changeFullscreen = false;
		this.seekingBeforePaused= false;
		this.seekStarting = false;
		this.showControls = true;
		//this.exitFullscreenHandler = this.exitFullscreen.bind(this)		
	}	
	
  	getSizeStyles() { //--获取尺寸
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
  	
	getHtml(){
		return parseHtml(this.props,this.getSizeStyles());
	}
	
	onStartPress(){
		Alert.alert('start')
	}
	
	onMessage(ev){  //--接受webview侧的通信信息
		let data = JSON.parse(ev.nativeEvent.data);
		let type = data.type;
		
		switch(type){
			case 'duration':
				this.duration = data.time;
				break;
			Alert.alert('update');
				this.setState({
					h5Time:data.time
				})
		};
		
	}
	
	toggleControls(){ //--显示控制条
		clearTimeout(this.timer);
		if(this.showControls){
			this.refs.controls.transitionTo({bottom: 0},100,'linear');
			this.timer = setTimeout(()=>{
				this.refs.controls.transitionTo({bottom: -60},100,'linear');
				this.showControls = true;
			},5000)
		}else{
			this.refs.controls.transitionTo({bottom: -60},100,'linear')	
		};
		
		this.showControls = !this.showControls;
	}	
	
  	togglePaused(){
  		let type = this.state.paused ? 'play' : 'pause';
  		this.setState({
  			paused: !this.state.paused
  		});
  		this.refs.webview.postMessage(JSON.stringify({type}));
  	}	
  	
 	toggleVolume(){
 		let type = this.state.volume ? 'muted' : 'volume';
   		this.setState({
  			volume: !this.state.volume
  		});

  		this.refs.webview.postMessage(JSON.stringify({type}));

 	}

  	seeking(value){  //--时间轴滑动中
  		let data={
  			type:'seeking',
  			time: this.duration * value
  		};
  		
  		if(!this.seekStarting){
  			this.seekStarting = true;
  			this.seekingBeforePaused = this.state.paused;
  		}
  		
  		this.setState({
  			paused:true
  		})
  		this.refs.webview.postMessage(JSON.stringify(data));
  	}
  	
  	seeked(value){  //--时间轴滑动结束
  		let data={
  			type:'seeked',
  			time: this.duration * value,
  			paused: this.seekingBeforePaused,
  		}
  		
  		this.seekStarting = false;
  		
   		this.setState({
  			paused:this.seekingBeforePaused,
  		})
  		this.refs.webview.postMessage(JSON.stringify(data));
  	}
  	
	renderLeftIcon(){  //--绘制开始暂停按钮
		let name = this.state.paused ? 'play-arrow' : 'pause';
		return	<TouchableNativeFeedback onPress={this.togglePaused.bind(this)}>
		  			<View style={[global.styles.center,{flex:1}]}>
						<Icon name={name} color='#fff' size={30}/>
					</View>
				</TouchableNativeFeedback>
		
	}
	
	renderTimeline(){  //--绘制时间轴滑块
		let percent = this.duration ? (this.state.currenTime / this.duration) : 0;
	
		return  <View style={[styles.propgressBar]}>
					<Slider 
						maximumTrackTintColor='#FE4A4B'
						minimumTrackTintColor ='#fff'
						thumbTintColor="#FE4A4B"
						step ={0.01}
						value={percent}
						onValueChange ={this.seeking.bind(this)}
						onSlidingComplete ={this.seeked.bind(this)}
					/>
				</View>
	}
	
	renderVolumeIcon(){ //--绘制音量
		let name = this.state.volume ? 'volume-up' : 'volume-off';
		return	<TouchableNativeFeedback onPress={this.toggleVolume.bind(this)}>
		  			<View style={styles.volume}>
						<Icon name={name} color='#fff' size={24}/>
					</View>
				</TouchableNativeFeedback>
	}	
	
 	renderMainBar(){
  		let {width} = this.getSizeStyles();
 		return  <Animatable.View ref='controls' style={[styles.mainBar,{width}]}>
 					<Grid>
 						<Row>
 							<Col size={1}>{this.renderLeftIcon()}</Col>
 							<Col size={7}>{this.renderTimeline()}</Col>
 							<Col size={1}>{this.renderVolumeIcon()}</Col>
 							<Col size={1}></Col>
 						</Row>
 					</Grid>
 				</Animatable.View>	
 				
 	}
 	
	renderVideo(){
		let HTML = this.getHtml();
		let {width,height} = this.getSizeStyles();
		
		let mainBar = this.renderMainBar();
		
		return 	<TouchableNativeFeedback onPress={this.toggleControls.bind(this)}>
					<View style={{flex:1}}>
						<WebView 
							ref='webview'
							source={{html:HTML}} 
							mediaPlaybackRequiresUserAction={false}
							javaScriptEnabled={true}
							domStorageEnabled ={true}
							automaticallyAdjustContentInsets={true}
							onMessage={this.onMessage.bind(this)}
							style={{width,height}}
						/>
						{mainBar}
					</View>
				</TouchableNativeFeedback>
	}
	
  	renderStartButton() { //--开始按钮
	    return  <View style={[{flex:1},global.styles.center]}>
		    		<TouchableNativeFeedback onPress={this.onStartPress.bind(this)}>
		    			<View style={styles.playButton}>
			        		<Icon style={styles.playArrow} name="play-arrow" size={42} />
		    			</View>
	      			</TouchableNativeFeedback>
	      		</View>
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
  			result = this.renderVideo()
  		}		
		
  		if(this.props.fullscreen){
			return <Animatable.View ref='fullscreenBox' style={styles.fullscreen}>
						<View style={styles.rotateBox}>
							{result}
						</View>
						<StatusBar hidden={true}/>
					</Animatable.View>	  			
  		}else{
  			return <View style={[styles.normalBox,this.getSizeStyles()]}>{result}</View>
  		}
	}
}


export default connect((state)=>{
	return {
		player:state.player
	}
})(H5Player)


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
		backgroundColor:'yellow'
	},
	
	normalBox:{  //--竖屏容器
		position:'relative',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'black',
	},
	
	webview:{
		overflow:'hidden',
		backgroundColor:'yellow'
	},
	
  	thumbnail: { //--封面
  		justifyContent: 'center',
  		alignItems: 'center',
		flexDirection:'row',
  	},	
  	
  	playButton: { //--播放按钮
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
  	
  	mainBar:{
  		position:'absolute',
  		left:0,
  		bottom:0,
  		height:50,
  		backgroundColor:'rgba(0,0,0,0.5)',
  	},
  	
  	topBar:{
   		position:'absolute',
  		left:0,
  		top:0,
  		height:50,
  		backgroundColor:'rgba(0,0,0,0.5)', 	
  	},
  	
  	propgressBar:{
  		flex:1,
  		justifyContent:'center',
  	},
  	
  	timeline:{
  		backgroundColor:'#fff',
  	},
  	
  	activeTimeline:{
  		position:'absolute',
  		backgroundColor:'#FE4A4B',	
  	},
  	
  	sliderBar:{
  		width:20,
  		height:20,
  		position:'absolute',
  		borderRadius:10,
  		backgroundColor:'#FE4A4B'
  	},
  	
  	volume:{
		flex:1,
		justifyContent:'center',
		alignItems:'flex-end'
  	}
})
