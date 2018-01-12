import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


var store = new Vuex.Store({
	state: {
		title: "我的书架",
		// 性别是否显示
		isShowSex: false,
		// 是否显示加载动画
		isShowLoad: true
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
		}
	},
	actions: {
		change: ( {commit}, value )=>commit('change'),
		changeShow: ( {commit}, value )=>commit('changeShow'),
		changeLoad: ( {commit}, value )=>commit('changeLoad'),
	}
})
export default store;