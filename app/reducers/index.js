import {combineReducers} from 'redux';

//---加入reducers
import menu from './menu.js';
import navigator from './navigator.js';
import player from './player.js';

export default combineReducers({
	menu,
	navigator,
	player,
});
