import React,{Component} from 'react'
import {
	View,
	Text,
} from 'react-native';

export default class Detail extends Component{
	render(){
		return <View><Text>Detail {this.props.navigation.state.params.slug}</Text></View>
	}
}
