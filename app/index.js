//--引入框架和库
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {StackNavigator} from 'react-navigation';

//---引入各组件
import reducers from './reducers/index.js';
import styles from './styles/index.js';
import store from './store/index.js';
import storage from './store/storage.js';
import screens from './components/index.js';

//---设置全局变量
global.styles = styles;
global.store = store;
global.storage = storage

//--连接redux
const reduxStore = createStore(reducers);

//--连接react-navigation
const NavApp = StackNavigator(screens);

//--输出根组件
export default class App extends Component{
	render(){
		return <Provider store={reduxStore}>
					<NavApp/>
				</Provider>
	}
}




