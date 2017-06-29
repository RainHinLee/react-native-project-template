
import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config.js';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {H5Player,NativePlayer} from '../../../public/Player/index.js'


export default class Home extends Component{
 	static navigationOptions = config['Home'];
 	
 	click(){
 		this.props.navigation.navigate('User');
 		this.props.screenProps.stackNavigation.navigate('Detail',{slig:'text'});
 	}
 	
	render(){
		return  <NativePlayer 
					src={require('../../../../assets/media/Jeff.mp4')} 
					poster={require('../../../../assets/images/lilian.jpg')}
					autoplay={true}
				/>
	}
}

