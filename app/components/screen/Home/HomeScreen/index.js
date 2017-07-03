
import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Alert,
	Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config.js';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {H5Player,NativePlayer} from '../../../public/Player/index.js';

import stripe from 'tipsi-stripe';


export default class Home extends Component{
 	static navigationOptions = config['Home'];
 	
 	constructor(props){  
 		super(props);
 	}
 	
 	click(){
 		this.props.navigation.navigate('User');
 		this.props.screenProps.stackNavigation.navigate('Detail',{slig:'text'});
 	}
 	
 	payment(){

 		stripe.init({
 			'publishableKey': "pk_live_4MCGVN0LXWX1AvvI1oVYVgnx", //'pk_test_hEPP6zyeKdXJw4BYhsjWLhe6', //
 		});
 		
 		stripe.paymentRequestWithCardForm({theme:{
 			primaryBackgroundColor:'#FE4A4B',
 			secondaryBackgroundColor:'#FE4A4B',
 			primaryForegroundColor:'#FE4A4B'
 		}}).then(result=>{
 			Alert.alert('开始支付，请稍后...');
   			global.store.stripePay({
   				"price":100,
				"tokenId":result.tokenId,
				"livemode":"prod",  //'dev'
				"currency":"usd",
				"originPrice":"1000",
				"type":"app", 
				"uid": "4309",
   			}).then(result =>{
   				console.log(result)
   				Alert.alert(result.status)  
   			}).catch(err =>{
   				Alert.alert(`支付失败:${err.message}`)
   			})
 		}).catch(err=>{
 			Alert.alert(`错误:${err.message}`)
 		})
 	}
 	
	render(){
		return <TouchableNativeFeedback onPress={this.payment.bind(this)}>
					<View style={[global.styles.center,{height:40}]}>
						<Text>开始支付</Text>
					</View>
					
					
					
				</TouchableNativeFeedback>

	}
}

