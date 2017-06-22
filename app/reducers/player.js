//---播放器全屏和小屏切换

export default function(state={},action){
	switch(action.type){
		case 'fullscreen':
			return {
					isFullscreen:true,
					currentTime:action.currentTime,
					paused:action.paused,
					volume: action.volume,
					isStarting: action.isStarting,
			}
		case 'exitFullscreen':
			return {
				isFullscreen:false,
					currentTime:action.currentTime,
					paused:action.paused,
					volume: action.volume,
					isStarting: action.isStarting,
			}
	}
	return Object.assign({},state);
	
}
