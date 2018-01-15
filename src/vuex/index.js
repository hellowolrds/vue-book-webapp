import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


var store = new Vuex.Store({
	state: {
		title: "我的书架",
		// 性别是否显示
		isShowSex: false,
		// 是否显示加载动画
		isShowLoad: true,
		// 书籍列表
		bookList: [],
		// 默认显示男生书籍
		sex: 0,
		// 保存搜索记录
		searchList: []
	},
	mutations: {
		// 改变标题
		change ( state, value ) {
			state.title = value
		},
		// 改变性别是否显示
		changeShow ( state, value ) {
			state.isShowSex = value;
		},
		// 改变加载动画的状态
		changeLoad ( state, value ) {
			this.state.isShowLoad = value;
		},
		// 根据性别改变书籍
		changeBookList ( state, bookList ) {
			this.state.bookList.length = 0;
			if ( this.state.sex === 0 ) {
				bookList.forEach((book, i)=>{
					if ( i === 2 || i === 5 || i === 7 || i === 9 ) {
						this.state.bookList.push(book);
					}
				});
			} else {
				bookList.forEach((book, i)=>{
					if ( i === 0 || i === 4 || i === 6 || i === 8 ) {
						this.state.bookList.push(book);
					}
				});
			}
		},
		// 将searchList保存在localStorage中
		saveSearch ( state, value ) {
			console.log(state, value);
		}
	},
	actions: {
		change: ( {commit}, value )=>commit('change'),
		changeShow: ( {commit}, value )=>commit('changeShow'),
		changeLoad: ( {commit}, value )=>commit('changeLoad'),
		changeBookList: ( {commit}, value )=>commit('changeBookList'),
		saveSearch: ( {commit}, value )=>commit("saveSearch")
	}
})
export default store;