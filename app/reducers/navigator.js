//---防止用户快速点击时，弹出多个栈；


export default function(state={},action){
	switch(action.type){
		case 'navigatorYes':
			return {isGoing:true}
			
		case 'navigatorNo':
			return {isGoing:false}
	}
	
	return Object.assign({},state)
	
}
