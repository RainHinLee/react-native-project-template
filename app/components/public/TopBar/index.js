/*
 	头部导航条组件
 * */

import React,{Component} from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	Alert,
	TouchableNativeFeedback,
	Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Animatable from 'react-native-animatable';

const icons={
		size:20,
		color:'#fff'
}
const {width,height} = Dimensions.get('window');

class TopBar extends Component {
	isIndex(){ //--是否是首页
		return this.props.title == 'HanbridgeMandarin' ?  true : false;
	}
	
	renderLeft(){ //--渲染左侧
		if(this.isIndex()){
			return  null				
		}
		
		return <TouchableNativeFeedback onPress={this.props.naviagtion.goBack}>
					<View style={[global.styles.center,styles.iconBox]}>
						<Icon name='chevron-left' {...icons}/>
					</View>
				</TouchableNativeFeedback>
	}
	
	renderRight(){ //--渲染右侧
		if(this.isIndex()){
			let name = this.props.menu.isOpend ? 'close':'bars'
			return  <TouchableNativeFeedback onPress={this.showMenu.bind(this)}>
						<View style={[global.styles.center,styles.iconBox]}>
							<Icon name={name} {...icons}/>
						</View>
					</TouchableNativeFeedback>			
		}
		return null
	}
	
	renderCenter(){ //--渲染标题
		return  <View style={[global.styles.center,styles.iconBox]}>
					<Text style={styles.text}>{this.props.title}</Text>
				</View>
	}
	
	showMenu(){
		this.props.dispatch({type:'menuShow'});
	}

	render(){
		return  <Animatable.View ref='box' style={global.styles.topbar}>
					<Grid >
						<Row>
							<Col size={15}>{this.renderLeft()}</Col>
							<Col size={70}>{this.renderCenter()}</Col>
							<Col size={15}>{this.renderRight()}</Col>
						</Row>
					</Grid>
				</Animatable.View>
	}
}

export default connect((state)=>{
	return {menu:state.menu}
})(TopBar);

const styles = StyleSheet.create({
		text:{
			fontSize:14,
			color:'#fff',
		},
		
		iconBox:{
			flex:1,
		}
	
})

