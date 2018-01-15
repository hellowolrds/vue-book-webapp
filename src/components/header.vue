<template lang="pug">
	header.topbar
		h2 {{title}}
		//- 男生和女生进行切换
		nav.nav-group(v-if="$store.state.isShowSex")
			h3.nav-item(:class="{active: sex==0}" @click="change(0)") 男生
			h3.nav-item(:class="{active: sex==1}" @click="change(1)") 女生
		.head-search 
			router-link.search(to="/search")
				i.iconfont.icon-sousuo-copy
</template>
<script>
	export default {
		name: 'topbar',
		data () {
			return {
				sex: 0
			}
		},
		computed: {
			title () {
				return this.$store.state.title
			}
		},
		methods: {
			change (sex) {
				this.sex = sex;
				this.$store.state.sex = sex;
				// 向组件传值
				this.$emit("bookList", sex);
			}
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
	h2
		position: absolute
		top: 12px
		left: 15px
		color: #fff
		line-height: 20px
		font-size: 16px
	.nav-group
		margin: 10px auto
		display: table
		border: 1px solid #fff
		border-radius: 4px
		.nav-item
			display: table-cell
			font-weight: 400
			line-height: 20px
			padding: 0 10px
			color: #fff
			&.active
				color: #666
				background-color: #fff
	.head-search
		position: absolute
		display: inline-block
		top: 12px
		right: 15px
		.search
			color: #fff
</style>