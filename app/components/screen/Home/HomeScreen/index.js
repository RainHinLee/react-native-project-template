
import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config.js';

export default class Home extends Component{
 	static navigationOptions = config['Home'];
	
	render(){
		return  <View ><Text>Home</Text></View>
	}
}

