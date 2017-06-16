/*--app 常用样式--*/

import {
	StyleSheet,
	Dimensions,
} from 'react-native'

const {width,height} = Dimensions.get('window');

export default StyleSheet.create({
	overlay:{
		position:'absolute',
		left:0,
		top:0,
		right:0,
		bottom:0,
		zIndex:100
	},
	
	container:{
		flex:1,
		overflow:'hidden',
	},
	
	body:{
		flex:1,
		paddingTop:50,
	},
	
	topbar:{
		position:'absolute',
		left:0,
		top:0,
		width,
		height:50,
		backgroundColor:'#FE4A4B',
		zIndex:10,
	},
	
	text:{
		fontSize:14,
		color:'#fff'
	},
	
	center:{
		alignItems:'center',
		justifyContent:'center'
	},
	
	
})


