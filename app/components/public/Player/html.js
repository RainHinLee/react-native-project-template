
export default function parseHtml(props,layout){
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				
				<style>
					*{
						padding:0px;
						margin:0px;
					}
				</style>
			</head>
			<body>
				<video id='player' src=${props.src} width=${layout.width} autoplay=${props.autoplay}></video>
			</body>
			<script>
				
				var player =document.querySelector('video');
				
				
				player.addEventListener('canplay',function (){
					var data = JSON.stringify({
						type:"duration",
						time: player.duration,
					});
					
					setTimeout(function (){
						window.postMessage(data);
					},1000);
					
				});
				
				
				player.addEventListener('timeupdate',function (){
					var data = JSON.stringify({
							type:"update",
							time:player.duration
					});
					
					setTimeout(function (){
						window.postMessage(data);
					},1000);
	
				});
				
				window.document.addEventListener('message',function (e){
					var data = JSON.parse(e.data);
					
					switch(data.type){
						case 'play': 
							player.play();
							break;
						case 'pause': 
							player.pause();
							break;
						case 'seeking':
							player.pause();
							break;
						case 'seeked':
							player.currentTime = data.time;
							data.paused ? player.pause() : player.play();
							break;
						case 'muted':
							player.volume = 0;
							break;
						case 'volume':
							player.volume = 1;
							break;
					}
				});
				
			</script>
		</html>	
	`
}





