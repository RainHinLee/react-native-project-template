/*--app 引导页--*/

import React,{Component} from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	Alert,
	Button,
	StyleSheet,
	TouchableNativeFeedback
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class Intro extends Component{
	constructor(props){
		super(props)
		this.state={};	
	}
	
	render(){
		return 	<Swiper loop={false} style={styles.container} activeDotColor='#13A042'>
					<View style={styles.box}>
						<Image source={require('../../../assets/images/intro1.jpg')} style={styles.item}/>
					</View>
					
					<View style={styles.box}>
						<Image source={require('../../../assets/images/intro2.jpg')} style={styles.item}/>
					</View>
					
					<View style={styles.box}>
						<Image source={require('../../../assets/images/intro3.jpg')} style={styles.item}/>
					</View>	
					
					<View style={styles.box}>
						<Image source={require('../../../assets/images/intro4.jpg')} style={styles.item}/>
						<TouchableNativeFeedback onPress={this.props.done}>
							<View style={styles.btnBox}>
								<Text style={styles.btn}>Start</Text>
							</View>
						</TouchableNativeFeedback>
					</View>					
				</Swiper>
	}
}

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
	
	box:{
		flex:1,
	},
	
	item:{
		width,
		height,
		flex:1,
	},
	
	btnBox:{
		position:'absolute',
		bottom:60,
		left:(width-100)/2,
		width:130,
		height:35,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#13A042',
		borderRadius:3
	},
	
	btn:{
		fontSize:16,
		color:'#fff'
	}
})
