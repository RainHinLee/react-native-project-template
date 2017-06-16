import React,{Component} from 'react';
import {
	View,
	Text
} from 'react-native';

import config from './config.js';

export default class Home extends Component{
 	static navigationOptions = config['User']
	render(){
		return <Text>User</Text>
	}
}
