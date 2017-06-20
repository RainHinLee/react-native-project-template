/*--storage同步--*/
import store from './index.js';

export default {
	cates(params){ //--分类列表
		let {resolve,reject} = params;
		store.fetchCates().then(results=>{
			global.storage.save({
				key:'cates',
				data:results
			});	
			resolve && resolve(results);
		})
	},
	
	populars(params){
		let {resolve,reject} = params;
		store.fetchPopulars().then(results=>{
			global.storage.save({
				key:'populars',
				data:results
			});	
			resolve && resolve(results);
		})		
	},
	
	swiperItems(params){
		let {resolve,reject} = params;
		store.fetchSwiperItems().then(results=>{
			global.storage.save({
				key:'swiperItems',
				data:results
			});	
			resolve && resolve(results);
		})			
	}
}
