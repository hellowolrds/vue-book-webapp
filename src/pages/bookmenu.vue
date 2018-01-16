<template lang="pug">
	section.more(v-if="isShow")
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
					li.chapter-item(v-for="(item, index) in book.chapters" @click="enterContent(item.id, index)")
						p {{item.title}}
							span.vip(v-if="item.isVip")
								i.iconfont.icon-suo

	section.content(v-else)
		h4 {{book.bookName}}
		.content-list(v-for="chapter in contentList")
			h3 {{chapter.title}}
			div(v-if="!chapter.isVip")
				p(v-for="data in chapter.cpContent") {{data}}
			div(v-if="chapter.isVip")
				p vip章节请到正版网站观看
		button.nextChapter(@click="more()") 加载下一章	
</template>
<script>
import api from '../fetch/index.js';
	export default {
		name: 'menu1',
		data () {
			return {
				bookId: '',
				book: {},
				sort: true,
				isShow: true,
				contentList: [],
				index: 0
			}
		},
		created () {
			this.bookId = this.$route.params.id;
			api.getChapters(this.bookId).then(res=>{
				this.book = res.data;
				console.log(this.book)
			})
		},
		methods: {
			change () {
				this.sort = !this.sort;
				this.book.chapters.reverse();
			},
			enterContent (id, index) {
				this.isShow = false;
				this.index = index;
				console.log(this.index)
				this.getData(id);
			},
			// 加载下一章
			more () {
				var id = this.book.chapters[this.index++].id;
				this.getData(id);
			},
			getData (id) {
				api.getChapterContent(id).then(data=>{
					console.log(data);
					data.data.chapter.cpContent = data.data.chapter.cpContent.split('\n')
					this.contentList.push(data.data.chapter);
				})
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

.content
	background-color: #c4b395
	height: 100%
	overflow-y: scroll
	h4
		font-size: 12px
		color: #666
		font-weight: 400
		position: fixed
		top: 0
		left: 0
		right: 0
		line-height: 30px
		padding-left: 15px
		z-index: 9
		background-color: #c4b395
	.content-list
		position: relative
		h3
			padding: 30px 0 20px 10px
			font-size: 20px
		p
			text-indent: 2em
			margin: .5em 0
			line-height: 1.8
	.nextChapter
		display: block
		margin: 15px auto
		width: 80%
		font-size: 16px
		line-height: 36px
		border: 0 none
		border-radius: 100px
		color: #fff
		background-color: #ed424b
		z-index: 999
		outline: 0 none
	

	
</style>