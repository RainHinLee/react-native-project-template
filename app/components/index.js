/*--app组件入口--*/

import React,{Component} from 'react';
import {
	View,
	StatusBar,
	BackHandler,
} from 'react-native';

import Home from './screen/Home/index.js';
import Detail from './screen/Detail/index.js';
import TopBar from './public/TopBar/index.js';

//---包装screen组件
function wrapScreen(Screen){
	
	class App extends Component {
		render(){		
			return <View style={global.styles.container}>
						<StatusBar backgroundColor='#FE4A4B' barStyle='light-content' animated={true}/>
						<TopBar navigation={this.props.navigation} {...Screen.routerOptions}/>
						{this.renderChildren()}
						<View style={global.styles.body}>
							<Screen navigation={this.props.navigation}/>
						</View>
					</View>
		}
		
		renderChildren(){  //--渲染子视图
			var childrens = Screen.components||[];
			return childrens.map((Item,key)=>{
				return <Item key={key} navigation={this.props.navigation}/>
			})
		}
	}
	
	return {
		screen: App,
		navigationOptions:{header:null}
	}
}

export default {
	Home: wrapScreen(Home),
	Detail:wrapScreen(Detail)
}

