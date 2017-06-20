/*--数据中心-*/

//---封装fetch请求
let fetch2 = function(type,url,body={}){
	let options = {
			method: type.toUpperCase(),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
	}
		
	if(type.toUpperCase( )=='POST'){
		options['body'] = JSON.stringify(body)
	}
	return fetch(url,options).then((response) => response.json())			
};

const config={
	'host' : 'http://dev.hanbridgemandarin.com',
	'cmsapi' : 'http://dev.hanbridgemandarin.com/cmsapi',
	'api2': 'http://dev.hanbridgemandarin.com/api2',
}

export default Object.create({
	fetchCates(){ //获取分类数据数据
		let url =`${config.cmsapi}/wp/terms/slug/videos`;
		return fetch2('GET',url);
	},
	
	fetchPopulars(id,num){ //---获取最热文章列表;
		let url = `${config.cmsapi}/wp/posts/term_taxonomy_id/${id}/list_type/3/page/1/per_page/${num}`
		return fetch2('GET',url);		
	},
	
	fetchItems(options){  //---获取文章列表,支持分页，即下拉刷新
		let url = `${config.cmsapi}/wp/posts/slug/${options.slug}/list_type/2/post_type/video/page/${options.page}/per_page/${options.limit}`;
		return fetch2('GET',url);		
	},
	
	fetchItem(id){  //--获取具体文章
		let url = `${config.cmsapi}/wp/post/id/${id}`;
		return fetch2('GET',url);		
	},
	
	fetchSwiperItems(){  //---获取首页swiper内数据；取每个类别人气最高的一个数据；
		return global.storage.load({key:'cates'}).then(results=>{
			let list = results.data.child_list;
			return Promise.all(list.map(item=>{
				return this.fetchPopulars(item.term_taxonomy_id,1)
			}))
		}).then(results=>{
			return results.map(item=>{
				return item.data[0] || {};
			})
		}).catch(err => {
			console.log(err.message)
		})
		
		
	}
})
