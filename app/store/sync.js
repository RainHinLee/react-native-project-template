/*--storage同步--*/
import store from './index.js';

export default {
	cates(params){ //--分类列表
			console.log('fetcates')
		
		let {resolve,reject} = params;
		store.fetchCates().then(results=>{
			console.log('fetcates')
			global.storage.save({
				key:'cates',
				data:results
			});	
			resolve && resolve(results);
		})
	}
}
