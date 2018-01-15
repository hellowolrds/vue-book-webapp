<template lang="pug">
	section.best 
		//- 导入头部
		best-head(@bookList="change")
		//- 导入banner
		banner
		//- 中间图书部分制作
		section.book-list-section(v-for="data in $store.state.bookList" :key="data._id")
			.book-list-top
				h2.book-list-title {{data.title}}
				div.book-list-more
					router-link(:to="{name: 'more', params:{id: data._id, name: data.title}}") 更多>
			book-item(:book-id="data._id" :type="1")


		//- 导入tabbar
		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import BestHead from '../components/header.vue';
// 导入banner
import Banner from '../components/banner.vue';
// 导入图书组件
import BookItem from '../components/bookItem.vue';
import api from '../fetch/index.js';
	export default {
		name: 'best',
		data () {
			return {
				list: []
			}
		},
		created () {
			// 设置标题
			this.$store.commit("change", "RM")
			// 显示性别切换
			this.$store.commit("changeShow", true)
			// 获取图书数据
			api.getBestBook().then(data=>{
				this.list = data.data.data;
				this.$store.commit("changeBookList", this.list);
			})
		},
		components: {
			TabBar,
			BestHead,
			Banner,
			BookItem
		},
		methods: {
			change (sex) {
				this.$store.commit("changeBookList", this.list);
			}
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.best
	padding-bottom: 65px
.book-list-section
	position: relative
	border-bottom: 10px solid #f6f7f9
	padding: 15px 0 0 15px
	background: #fff	
	.book-list-top
		position: relative
		margin-bottom: 5px
		overflow: hidden
		.book-list-title
			font-weight: 400
			display: inline-block
			color: #33373d
			line-height: 1
			border-left: 2px solid #ed424b
			font-size: 16px
			padding-left: 8px
		.book-list-more
			display: inline-block
			a
				position: absolute
				top: 2px
				right: 15px
				font-size: 13px
				color: #ed424b
</style>