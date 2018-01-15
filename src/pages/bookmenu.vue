<template lang="pug">
	section.more
		header.topbar
			span
				a(@click="$router.back(-1)")
					i.iconfont.icon-renzheng-fanhuijiantou-copy
			h2 {{book.bookName}}
		.book-menu.common
			h4.chapter-head
				span.total 共256章
				span.sort(v-if="sort" @click="change") 倒序
				span.sort(v-if="!sort" @click="change") 正序
			.chapter-list-section
				.chapter-bar 正文卷
				ul.chapter-list
					li.chapter-item(v-for="item in book.chapters")
						p {{item.title}}
							span.vip(v-if="item.isVip")
								i.iconfont.icon-suo

			
</template>
<script>
import api from '../fetch/index.js';
	export default {
		name: 'menu1',
		data () {
			return {
				bookId: '',
				book: {},
				sort: true
			}
		},
		created () {
			this.bookId = this.$route.params.id;
			api.getChapters(this.bookId).then(res=>{
				console.log(res);
				this.book = res.data;
			})
		},
		methods: {
			change () {
				this.sort = !this.sort;
				this.book.chapters.reverse();
			}
		},
		components: {
			
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
.book-menu
	.chapter-head
		font-size: 13px
		font-weight: 500
		padding: 0 20px
		line-height: 40px
		.sort
			float: right
	.chapter-list-section
		position: absolute
		top: 80px
		left: 0
		right: 0
		bottom: 0
		.chapter-bar
			line-height: 36px
			padding-left: 20px
			color: #969ba3
			background-color: #f6f7f9
		.chapter-list
			position: absolute
			top: 36px
			right: 0;
			bottom: 0
			left: 20px
			overflow: auto
			.chapter-item
				padding: 15px 20px 15px 0
				border-top: 1px solid #f0f1f2
				white-space: nowrap
				text-overflow: ellipsis
				.vip
					float: right
					i 
						color: #ed424b
						font-size: 14px

	
</style>