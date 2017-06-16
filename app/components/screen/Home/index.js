/*--首页--*/

import React,{Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {
	View,
	Text,
} from 'react-native';

import HomeScreen from './HomeScreen.js';
import UserScreen from './UserScreen.js';
import Menu from '../../public/Menu/index.js';

const screens = {
	Home: {
		screen: HomeScreen
	},
	
	User :{
		screen: UserScreen
	} 	
}

const options = {  
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
	
	static components=[Menu];  //---子组件

	render(){
		return <App/>
	}
}

