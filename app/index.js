//--引入框架和库
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'; //---切换效果
import {connect} from 'react-redux';
import {BackHandler,Alert,View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

//---引入各组件
import reducers from './reducers/index.js';
import styles from './styles/index.js';
import store from './store/index.js';
import storage from './store/storage.js';
import screens from './components/index.js';
import Intro from './components/public/Intro/index.js';

//---设置全局变量
global.styles = styles;
global.store = store;
global.storage = storage

//--连接redux
const reduxStore = createStore(reducers);
//--连接react-navigation,
const NavApp = StackNavigator(screens,{
	transitionConfig:()=>{
		return{
			screenInterpolator:CardStackStyleInterpolator.forHorizontal,
		}
	},
	
	onTransitionStart(){ //--防止多次点击同一个navigation元素；
		reduxStore.dispatch({type:'navigatorYes'}) 
	},
	
	onTransitionEnd(){
		reduxStore.dispatch({type:'navigatorNo'})
	}
	
});


//--输出根组件
export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
			inited: false,  //--是否初次进入app
			fetched: true, //--是否取得数据；
		}

		BackHandler.addEventListener('hardwareBackPress',this.backHandler.bind(this))
	}
	
	backHandler(){
		Alert.alert(null,'是否退出app',[
			{text:'NO'},
			{text:'YES',onPress:()=>{BackHandler.exitApp()}},
		]);
		return true
	}
	
	componentDidMount(){
		SplashScreen.hide();
	}

	introDone(){
		this.setState({
			inited:true,
			fetched:true
		})
	}
	
	render(){
//		let component = this.state.fetched 
//						? (this.state.inited ? <NavApp/> : <Intro done={this.introDone.bind(this)}/>)
//						: <View/>;
		let component = <NavApp/>
		return <Provider store={reduxStore}>
					{component}
				</Provider>
	}
}




