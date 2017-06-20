import {combineReducers} from 'redux';

//---加入reducers
import menu from './menu.js';
import navigator from './navigator.js';

export default combineReducers({
	menu,
	navigator,
});
