<template lang="pug">
	section.bookbar
		.book-bar-item(v-if="!isAdd")
			.book-bar-icon
				i.iconfont.icon-jiarushujia
			p.book-bar-content(@click="add()") 加入书架
		.book-bar-item(v-if="isAdd")
			.book-bar-icon
				i.iconfont.icon-jiarushujia
			p.book-bar-content 已加入书架
		.book-bar-item.read
			router-link.book-bar-content(:to="{name: 'menu', params: {id: bookId}, query: {menus: true}}") 立即阅读
</template>
<script>
	export default {
		name: 'bookbar',
		data () {
			return {
				isAdd: false
			}
		},
		props: ['bookId'],
		methods: {
			add () {
				this.$emit("add")
				this.isAdd = true;
			}
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.bookbar
	position: fixed
	left: 0
	right: 0
	bottom: 0
	z-index: 1
	display: flex
	height: 60px
	background-color: #fff
	.book-bar-item
		display: block
		flex: 1
		padding: 10px 0
		font-size: 12px
		color: #999
		border-top: 1px solid rgba(0, 0, 0, .1)
		text-align: center
		.book-bar-icon
			width: 24px
			height: 24px
			margin: 0 auto 4px
		.book-bar-content
			text-align: center
		&.read
			font-size: 16px
			color: #fff
			background-color: #ed424b
			line-height: 40px
			border-top-color: #ed42b
			.book-bar-content
				color: #fff
</style>