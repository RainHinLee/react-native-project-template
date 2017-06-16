/*--Loading指示器组件--*/

import React,{Component} from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import Spinner from 'react-native-spinkit';

export default class Loading extends Component{
	render(){
		let size = this.props.size || 24;
		let color = this.props.color || '#fff';

		return  <View style={[styles.loadingBox,this.props.style]}>
					<Spinner type='Circle' color={color} size={size}></Spinner>
					<Text style={[styles.loadingText,{color}]}>Loading...</Text>
				</View>
	}
}

const styles = StyleSheet.create({
	loadingBox:{
		position:'absolute',
		left:0,
		top:0,
		bottom:0,
		right:0,
		alignItems:'center',
		justifyContent:'center'		
	},
	
	loadingText:{
		color:'#fff',
		fontSize:14,
		marginTop:10,		
	}
})
