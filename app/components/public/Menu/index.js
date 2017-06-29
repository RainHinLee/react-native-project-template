import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Dimensions,
	Alert,
	BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import Loading from '../Loading/index.js';

let CURRENT = '';

class Menu extends Component{
	constructor(props){
		super(props)
		this.state={
			cates:[],
		}
		
		this.onBackHandler = this.backHandler.bind(this)
	}
	
	hideMenu(){  //--隐藏
		this.props.dispatch({type:'menuHide'});
		
	}
	
	fetchCates(){ //--获取分类列表
		global.storage.load({
			key:'cates',
		}).then(results=>{
			this.setState({cates:results.data.child_list});
		}).catch(err=>{
			console.log('err',err.message)
		})
	}
	
	goDetail(slug){
		if(this.props.navigator.isGoing){
			return false
		}
		this.props.navigation.navigate('Detail',{slug});
	}
	
	shouldComponentUpdate(nextProps,nextState){

		if(nextState.cates != this.state.cates){
			return true
		}
		
		if(this.props.menu.isOpend != nextProps.menu.isOpend){
			
			if(nextProps.menu.isOpend){  //---展开
				this.refs.box.transitionTo({left:0},100,'linear');
				this.keys.length && this.keys.forEach((item,index)=>{
					let time = 200+index*50
					this.refs[item].transition({left:-300},{left:0},time,'ease-in-out')
				})
				BackHandler.addEventListener('hardwareBackPress',this.onBackHandler);
			}else{ //---收起
				this.refs.box.transitionTo({left:-1*width},100,'linear');
				BackHandler.removeEventListener('hardwareBackPress',this.onBackHandler)
			};
		}
		return false;
	}
	
	componentDidMount(){
		this.fetchCates();
	}
	
	backHandler(){
		if(this.props.menu.isOpend){
			this.hideMenu();
			BackHandler.removeEventListener('hardwareBackPress',this.onBackHandler)
			return true;
		};
		return false
	}
	
	renderList(){
		if(this.state.cates.length==0){
			return <Loading color="#ccc"/>
		}
		
		return this.state.cates.map((item,index) =>{
				let refKey = `item${index}`;
				this.keys.push(refKey);
				return <Animatable.View key={index} ref={refKey} style={styles.itemBox}>
							<Grid>
								<TouchableNativeFeedback onPress={() =>{this.goDetail(item.slug)}}>
									<Row>
										<Col size={7} style={styles.textBox}>
											<Icon name='square' size={10} color="#ccc"/>
										</Col>
										<Col size={93} style={styles.textBox}>
											<Text style={styles.text}>{item.name}</Text>
										</Col>
									</Row>
								</TouchableNativeFeedback>
							</Grid>
						</Animatable.View>
		})
	}
	
	render(){
		this.keys=[];
		return  <Animatable.View ref='box' style={styles.box}>
					<View style={styles.listBox}>{this.renderList()}</View>
					<TouchableNativeFeedback onPress={this.hideMenu.bind(this)}>
						<View style={styles.overlay}></View>
					</TouchableNativeFeedback>
				</Animatable.View>
	}
}

export default connect((state)=>{
	return {
		menu:state.menu,
		navigator:state.navigator
	}
})(Menu);

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
	box:{
		
		overflow:'hidden',
		position:'absolute',
		zIndex:12,
		left:-1*width,
		top:0,
		height,
		width,
	},
	
	listBox:{
		position:'relative',
		paddingTop:70,
		width:0.8 * width,
		height,
		overflow:'hidden',
		backgroundColor:'#fff',
		zIndex:3,
	},
	
	overlay:{
		position:'absolute',
		left:0,
		top:0,
		width,
		height,
		zIndex:2,
		backgroundColor:'rgba(0,0,0,0.3)',
	},
	
	itemBox:{
		height:50,
		paddingLeft:15,
		justifyContent:'center',
	},
	
	textBox:{
		justifyContent:'center'
	},
	
	text:{
		fontSize:16,
		color:'#222',
	}
	
})
