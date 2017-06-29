import React,{Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableNativeFeedback,
	Alert
} from 'react-native';

import Svg,{Circle} from 'react-native-svg';

export default class Detail extends Component{
	
	
	
	
	render(){
		return  <Svg style={styles.svg}>
					<Circle r={width/4} stroke='red' cx={width/2} cy={height/4} strokeWidth={2} fill='yellow'></Circle>
				</Svg>
	}
}

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
	svg:{
		width,
		height:height/2,
		backgroundColor:'#000'
	}
})
