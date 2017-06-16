//---主要是配置各个组件中的tabBar组件

import React,{Component} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const fontSize = 22;

export default {
	Home:{
    	tabBarLabel:'Home',
    	tabBarIcon: (params)=> {
    		return <Icon name='home' size={fontSize} color={params.tintColor}/>
    	}
	},
	
	User:{
    	tabBarLabel: 'User',
    	tabBarIcon: (params)=>{
    		return <Icon name='user' size={fontSize} color={params.tintColor} />
    	}		
	}
}
