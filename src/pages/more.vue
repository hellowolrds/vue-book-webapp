<template lang="pug">
	section.more
		header.topbar
			span
				router-link(to="/best") 
					i.iconfont.icon-renzheng-fanhuijiantou-copy
			h2 {{title}}
		.more-book.common
			book-item(:bookId="$route.params.id" :type="2")
</template>
<script>
// 导入图书组件
import BookItem from '../components/bookItem.vue';
import api from '../fetch/index.js';
	export default {
		name: 'more',
		data () {
			return {
				title: ''
			}
		},
		created () {
			this.title = this.$route.params.name;
		},
		methods: {
			
		},
		components: {
			BookItem
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.topbar
	position: fixed
	top: 0
	left: 0
	right: 0
	width: 100%
	height: 40px
	overflow: hidden
	color: #fff
	background-color: #ed424b
	box-sizing: border-box
	z-index: 99
	span 
		position: absolute
		top: 50%
		left: 10px
		transform: translateY(-50%)
		a
			color: #fff
	h2
		color: #fff
		line-height: 40px
		font-size: 16px
		text-align: center
.more-book 
	padding-left: 15px
	
</style>