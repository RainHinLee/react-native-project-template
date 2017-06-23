/*--首页--*/

import React,{Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {
	View,
	Text,
	BackHandler,
} from 'react-native';

import HomeScreen from './HomeScreen/index.js';
import UserScreen from './UserScreen/index.js';
import Menu from '../../public/Menu/index.js';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {NativePlayer,H5Player} from '../../public/Player/index.js';

const src = resolveAssetSource(require('../../../assets/media/Jeff.mp4')).uri;
const poster = resolveAssetSource(require('../../../assets/images/lilian.jpg'))

const screens = {
	Home: {
		screen: HomeScreen
	},
	
	User :{
		screen: UserScreen
	} 	
}

const options = { 
	swipeEnabled:false,
	tabBarPosition:'bottom',
	tabBarOptions:{
		activeTintColor:'#FE4A4B',  //--激活是文本颜色
		inactiveTintColor:'#ccc',
		showIcon:true,
		labelStyle:{ //--
			fontSize:12,	
		},
		
		indicatorStyle:{ //---状态条样式
			backgroundColor:'rgba(0,0,0,0.2)'
		},
		
		iconStyle:{
			height:18,
		},
		
		tabStyle:{
			height:70,
		},
		
		style:{ 
			backgroundColor:'#fff',
			height:56,
		},
	}	
}

let App = TabNavigator(screens,options);

export default class Home extends Component{
	static routerOptions={  //---导入到导航条组件数据
		title:'HanbridgeMandarin',
	}
	
	static components=[
		{
			Component:Menu,
			props:{},
		},
		
		{
			Component:H5Player,
			props:{
				poster,
				src,
				fullscreen:true,
				autoplay:true,
			}
		}

	
	];  //---子组件

	render(){
		return <App screenProps={{stackNavigation:this.props.navigation}}/>
	}
}

