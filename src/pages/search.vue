<template lang="pug">
	section.search 
		section.search-header
			span.search-back(@click="revert")
				i.iconfont.icon-renzheng-fanhuijiantou-copy
			div.search-input-section
				input(type="text" v-model="val" placeholder="请输入您要搜索的关键字" class="search-input") 
				span.search-icon(@click="find(val)")
					i.iconfont.icon-sousuo-copy
		//- 搜索结果
		section.result(v-if="bookList.length>0")
			<rank-item :bookList="bookList"></rank-item>
		template(v-else)
			//- 热门搜索
			section.search-hot.search-section
				h4 热门搜索
				ul.search-keyword-list
					li.search-keyword(v-for="word in keywords" @click="find(word.word)") {{word.word}}
			//- 搜索记录
			section.search-history.search-section
				h4 历史记录
					span.clear-all(@click="clear") 清空
				ul.search-keyword-list
					li.search-keyword(v-for="data in history") {{data}}
</template>
<script>
import api from '../fetch/index.js';
// 导入rankitem
import RankItem from '../components/rankItem.vue';
	export default {
		name: 'search',
		data () {
			return {
				keywords: [],
				bookList: [],
				val: '',
				history: []
			}
		},
		created () {
			// 先获取搜索热词
			api.getSearchHotKeywords().then(data=>{
				this.keywords = data.data.searchHotWords.slice(0, 30);
			})
			if ( !localStorage.getItem('history') )
				localStorage.setItem('history', this.history);
			this.history = localStorage.getItem('history').split('|') || [];
		},

		methods: {
			find ( word ) {
				if ( word === '' )
					return ;
				// 添加搜索记录
				this.history.push(word);
				var str = this.history.join('|')
				localStorage.setItem('history', str);
				api.searchByKeyword(word).then(data=>{
					this.bookList = data.data.books;
				})
			},
			revert () {
				// 返回上一个路由
				this.$router.back(-1);
			},
			clear () {
				localStorage.setItem('history', '');
				this.history = [];
			}
		},
		components: {
			RankItem
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.search
	position: relative
	overflow： hidden
	background-color: #f6f7f9
	.search-header
		position: relative
		height: 40px
		width: 100%
		background-color: #ed424b
		.search-back
			position: absolute
			top: 50%
			transform: translateY(-50%)
			left: 5px
			i
				color: #fff
				font-size: 13px
		.search-input-section
			padding: 8px 15px 7px 35px
			overflow: hidden
			.search-input
				width: 100%
				height: 25px
				background-color: #ed424b
				border: 0 none
				border-bottom: 1px solid #fff
				outline: none
				color: #fff
			.search-icon
				position: absolute
				top: 50%
				transform: translateY(-50%)
				right: 15px
				i
					color: #fff
					font-size: 13px
	.result
		padding-left: 10px
	.search-section
		position: relative
		padding: 10px 10px 20px
		overflow: hidden
		margin-top: 10px
		background-color: #fff
		h4
			line-height: 30px
			border-bottom: 1px solid #c6c7c9
			.clear-all
				float: right
		.search-keyword-list
			padding: 10px
			.search-keyword
				display: inline-block
				font-size: 12px
				margin: 5px
				padding: 5px
				color: #8c8c8c
				border: 1px solid #c6c7c9
				border-radius: 20px
</style>