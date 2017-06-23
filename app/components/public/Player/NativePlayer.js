
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Foundation';
import Video from 'react-native-video'; 
import  * as Animatable from 'react-native-animatable';
import {Grid,Row,Col} from 'react-native-easy-grid';
import {connect} from 'react-redux';

const {width,height} = Dimensions.get('window');
const ratio = 9/16;

class Player extends Component{
	
	constructor(props){
		super(props)
		this.state={
			isStarting: this.props.autoplay,  //--是否开始
			paused: this.props.fullscreen ? true : false, //--是否暂停
			currentTime: 0, //--当前播放时间；
			volume:true,  //--音量
		};
		this.duration = 0;
		this.timelineWidth = 0;
		this.changeFullscreen = false;
		this.showControls = true;
		this.videoInited = false;  //--是否初始化了video组件
		this.initPaused = false;   //---针对初次全屏屏幕切换时，普通屏传过来的暂停状态；
		this.exitFullscreenHandler = this.exitFullscreen.bind(this)
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
  	
  	onStartPress(){ //--开始按钮点击
  		this.setState({isStarting:true})
  	}
  	
  	onLoaded(ev){ //--视频加载完成
  		this.duration = ev.duration;
  		if(this.props.fullscreen && this.props.player.isFullscreen){
  			this.refs.player && this.refs.player.seek(this.state.currentTime);
  			
  			setTimeout(()=>{
  				this.setState({
  					paused: this.initPaused,   //---处理视频初次加载时不能暂停bug
  				})
  			},50)
  		}
  	}
  	
  	onEnd(){ //--视频播放完成
  		this.setState({
  			isStarting:false,
  			paused:false,
  			currentTime:0,
  			volume:true,
  		})
  	}
  	
  	onProgress(ev){
  		this.setState({
  			currentTime:ev.currentTime,
  		});
  	}
  	
	onSeekStartResponder() { //--触控响应者
	    return true;
	}
	
	onSeekMoveResponder() {  //--触控响应者
	    return true;
	}
	
	onSeekGrant(e) { //--滑动开始
	    this.seekStartY = e.nativeEvent.pageY; //--滑动开始位置
	    this.seekStartX = e.nativeEvent.pageX; //--滑动开始位置
	    
	    this.seekStartPercent = this.state.currentTime / this.duration ; //--滑动开始百分比;
	    this.isPausedBeforeSeek = this.state.paused; //--滑动前是否暂定
	    this.setState({ //--滑动时暂停视频播放
	      paused: true,
	    });
	}
	
	onSeekRelease(){ //--滑动取消
		this.setState({
			paused:this.isPausedBeforeSeek
		})
	}
	
	onSeek(e) { //--滑动中
	    let diffY = this.seekStartY-e.nativeEvent.pageY ; //---滑动的距离Y
	    let diffX = e.nativeEvent.pageX-this.seekStartX; //---滑动的距离X
	    
	    let percent = this.props.fullscreen
	    				? (this.seekStartPercent+(diffY / this.timelineWidth))
	    				: (this.seekStartPercent+(diffX / this.timelineWidth))
	    				
	    if(percent<=0){
	    	percent = 0;
	    }
	    
	    if(percent>=1){
	    	percent = 1
	    }
	    let time = this.duration * percent;
	  
	    this.setState({
	      currentTime:time ,
	    });
	
	    this.refs.player.seek(time);
	}  
	
  	change(){
  		this.setState({
  			paused: !this.state.paused
  		})
  	}
 
 	changeVolume(){
   		this.setState({
  			volume: !this.state.volume
  		})		
 	}
 	
 	changeScreen(){  //--全屏和退出全屏
 		let type = this.props.fullscreen ? 'exitFullscreen' : 'fullscreen'
 		
		this.props.dispatch({
			type,
			...this.state
		});		
 	}
 	
 	exitFullscreen(){  //---android回退键
 		this.changeScreen();
		BackHandler.removeEventListener('hardwareBackPress',this.exitFullscreenHandler)//--注销android回退键
 		return true;
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
	
 	componentWillReceiveProps(nextProps){  //---接受新属性
		let current = this.props.player;
		let next = nextProps.player;
 		if(next.isFullscreen!= current.isFullscreen){ //--全屏切换
 			this.changeFullscreen = true;
 			if(next.isFullscreen){ //---切换到全屏
				if(this.props.fullscreen){ //--全屏组件				
	 				this.setState({
	 					currentTime:next.currentTime,
	 					paused: this.videoInited ? next.paused : false,
	 					isStarting: next.isStarting,
	 					volume : next.volume
	 				}); 
	 				
	 				this.initPaused = next.paused;
	 				
				}else{ //--普通屏组件
	 				this.setState({paused: true}); 				
				}
			}else{ //--切换到普通屏
				if(this.props.fullscreen){ //--全屏组件				
	 				this.setState({paused: true});
				}else{ //--普通屏组件
	 				this.setState({
	 					currentTime:next.currentTime,
	 					paused: next.paused,
	 					isStarting: next.isStarting,
	 					volume : next.volume
	 				}); 		
				}
			}
 		}
 	}
 	
	shouldComponentUpdate(nextProps,nextState){  //---优化性能
		if(nextProps.player == this.props.palyer && nextState == this.state){
			return false;
		}
		return true
	}
	
 	componentDidUpdate(){  //---组件更新完成
		let {width} = Dimensions.get('window');
	
 		if(this.changeFullscreen){ //--全屏和普通屏切换
			if(this.props.player.isFullscreen){ //---切换到全屏
				if(this.props.fullscreen){
					this.refs.player && this.refs.player.seek(this.state.currentTime);
					this.refs.fullscreenBox && this.refs.fullscreenBox.transitionTo({left: 0},100,'linear')				
					BackHandler.addEventListener('hardwareBackPress',this.exitFullscreenHandler) //--注册android回退键
				}
			}else{ //--切换到普通屏
				if(this.props.fullscreen){ //--全屏组件						
	 				this.refs.fullscreenBox && this.refs.fullscreenBox.transitionTo({left: -1.2 * width},100,'linear');
				}else{ //--普通屏组件	
	 				this.refs.player && this.refs.player.seek(this.state.currentTime);
				}
			};
			
			this.changeFullscreen = false;
		}	
 	}
 	
 	renderTopBar(){ //--全屏模式下显示，上部控制条
 		let {width} = this.getSizeStyles();
 		return  <Animatable.View style={[styles.topBar,{width}]}>
 						<Grid>
 							<Row>
 								<Col size={1}>
 									<TouchableNativeFeedback>
 										<View style={[{flex:1},global.styles.center]}>
	 										<Icon name='chevron-left' size={36} color='#fff'/>
 										</View>
 									</TouchableNativeFeedback>
 								</Col>
 								<Col size={9}></Col>
 							</Row>
 						</Grid>
 				</Animatable.View>
 	}

	renderLeftIcon(){  //--绘制开始暂停按钮
		let name = this.state.paused ? 'play-arrow' : 'pause';
		return	<TouchableNativeFeedback onPress={this.change.bind(this)}>
		  			<View style={[global.styles.center,{flex:1}]}>
						<Icon name={name} color='#fff' size={30}/>
					</View>
				</TouchableNativeFeedback>
		
	}

	renderTimeline(){
		let {width,height} = this.getSizeStyles();
		let w = width * 0.7;
		let percent = this.state.currentTime / this.duration 
		let aw = w * percent;
		
		this.timelineWidth = w;
		
		return <View style={[styles.propgressBar]}>
					<View style={[styles.timeline,{width:w,height:6}]}></View>
					<View style={[styles.activeTimeline,{width:aw,height:6}]}></View>
					<View 
			            onStartShouldSetResponder={this.onSeekStartResponder.bind(this)}
			            onMoveShouldSetPanResponder={this.onSeekMoveResponder.bind(this)}
			            onResponderGrant={this.onSeekGrant.bind(this)}
			            onResponderMove={this.onSeek.bind(this)}
			            onResponderRelease={this.onSeekRelease.bind(this)}
			            onResponderTerminate={this.onSeekRelease.bind(this)}						
						style={[styles.sliderBar,{left:aw-2}]}>
					</View>
		      </View>
	}
	
	renderVolumeIcon(){
		let name = this.state.volume ? 'volume-up' : 'volume-off';
		return	<TouchableNativeFeedback onPress={this.changeVolume.bind(this)}>
		  			<View style={styles.volume}>
						<Icon name={name} color='#fff' size={24}/>
					</View>
				</TouchableNativeFeedback>
	}

	renderFullscreenIcon(){
		let name = this.props.fullscreen ? 'arrows-in' : 'arrows-out';
		return	<TouchableNativeFeedback onPress={this.changeScreen.bind(this)}>
		  			<View style={[global.styles.center,{flex:1}]}>
						<IconF name={name} color='#fff' size={20}/>
					</View>
				</TouchableNativeFeedback>
	}
	
 	renderMainBar(){
  		let {width} = this.getSizeStyles();
 		return  <Animatable.View ref='controls' style={[styles.bottomBar,{width}]}>
 					<Grid>
 						<Row>
 							<Col size={1}>{this.renderLeftIcon()}</Col>
 							<Col size={7}>{this.renderTimeline()}</Col>
 							<Col size={1}>{this.renderVolumeIcon()}</Col>
 							<Col size={1}>{this.renderFullscreenIcon()}</Col>
 						</Row>
 					</Grid>
 				</Animatable.View>	 		
 	}
 	
 	renderBottomBar(){
		return null
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
  	
	renderVideo(){  //渲染视频
		let bar = this.renderMainBar();
		let bar1 = this.props.fullscreen ? null : this.renderBottomBar();
		this.videoInited = true;
		
		return 	<View style={{flex:1}}>
					<TouchableNativeFeedback onPress={this.toggleControls.bind(this)}>
						<Video ref='player' style={this.getSizeStyles()}
							source={this.props.src}
							paused={this.state.paused}
							volume={this.state.volume ? 1.0 : 0}
							resizeMode='contain'
							onLoad={this.onLoaded.bind(this)}
							onEnd={this.onEnd.bind(this)}
							onProgress={this.onProgress.bind(this)}
						/>
					</TouchableNativeFeedback>
					{bar}
					{bar1}
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
						<StatusBar hidden={this.props.player.isFullscreen}/>
					</Animatable.View>	  			
  		}else{
  			return <View style={[styles.normalBox,this.getSizeStyles()]}>{result}</View>
  		}
	}
};

export default connect((state)=>{
	return {
		player:state.player
	}
})(Player)



const styles = StyleSheet.create({
	fullscreen:{ //--全屏
		position:'absolute',
		left:-1.2 * width,
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
  	
  	bottomBar:{
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
