
export default function (state={isOpend:false},action){
	switch(action.type){
		case 'menuShow':
			return Object.assign({},state.menu,{isOpend:true});
		case 'menuHide':
			return Object.assign({},state.menu,{isOpend:false});
	}
	
	return {isOpend:false};
}
