<template lang="pug">
	section.tabbar
		router-link.tab-item(to='/home')
			div.tab-item-icon
				i.iconfont.icon-wxbzhuye
			p.tab-item-label 书架
		router-link.tab-item(to='/best')
			div.tab-item-icon
				i.iconfont.icon-jingpin
			p.tab-item-label 精品
		router-link.tab-item(to='/category')
			div.tab-item-icon
				i.iconfont.icon-leimupinleifenleileibie--
			p.tab-item-label 分类
		router-link.tab-item(to='/rank')
			div.tab-item-icon
				i.iconfont.icon-paihang
			p.tab-item-label 排行
</template>
<script>
	export default {
		name: 'tabbar',
		data () {
			return {

			}
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.tabbar
	position: fixed
	left: 0
	right: 0
	bottom: 0
	z-index: 999
	display: flex
	height: 60px
	background-color: #fff
	border-top: 1px solid rgba(0, 0, 0, .1)
	box-sizing: border-box
	.tab-item
		display: block
		flex: 1
		padding: 10px 0
		color: #33373d
		.tab-item-icon, .tab-item-label
			text-align: center
			font-size: 14px
		.tab-item-icon i 
			font-size: 20px
		&.router-link-active
			.tab-item-icon, .tab-item-label
				color: #ed424b
</style>