<template lang="pug">
	section.list
		header.topbar
			span
				router-link(to="/best") 
					i.iconfont.icon-renzheng-fanhuijiantou-copy
			h2 {{title}}
		.more-book.common
			section.cat-bar
				.cat-filter
					ul.cat-filter-list
						li.cat-filter-item(v-for="type in typeList" :class="{active: selectedType===type.value}" @click="change(type.value)") {{type.name}}
				.cat-filter
					ul.cat-filter-list
						li.cat-filter-item(data-value="全部" :class="{active: currentCate==='全部'}" @click="select('全部')") 全部
						li.cat-filter-item(v-for="c in category" :data-value="c" :class="{active: currentCate===c}" @click="select(c)") {{c}}
			.books
				rank-item(:bookList="bookList")
			.bottom(v-if="isMore")
				p <img class="load" src="../assets/images/loading.gif">
</template>
<script>
// 导入图书组件
import RankItem from '../components/rankItem.vue';
import api from '../fetch/index.js';
	export default {
		name: 'list',
		data () {
			return {
				title: '',
				gender: '',
				page: 0,
				limit: 20,
				type: 'hot',
				major: '',
				minor: '',
				selectedType: 'hot',
				bookList: [],
				category: [],
				currentCate: '全部',
				typeList: [{
					value: 'hot',
					name: '热门'
				}, {
					value: 'new',
					name: '新书'
				}, {
					value: 'reputation',
					name: '好评'
				}, {
					value: 'over',
					name: '完结'
				}, {
					value: 'monthly',
					name: '包月'
				}],
				isMore: true
			}
		},
		created () {
			this.title = this.$route.params.major;
			this.gender = this.$route.query.gender;
			this.major = this.$route.params.major;
			this.getData();
			console.log(this.gender)
			api.getMinorList().then(data=>{
				var arr = data.data[this.gender]
				arr.forEach(item=>{
					if ( item.major === this.major ) {
						this.category = item.mins;
					}
				})
			})
		},
		mounted () {
			window.addEventListener("scroll", this.loadMore)
		},
		methods: {
			change(type) {
				this.type = type;
				this.isMore = true;
				this.bookList.length = 0;
				this.selectedType = type;
				this.getData();
			},
			select (data) {
				this.currentCate = data;
				this.isMore = true;
				this.bookList.length = 0;
				this.minor = data;
				this.getData();
			},
			getData () {
				api.getCatBooks(this.gender, this.type, this.major, this.minor, this.page * this.limit).then(data=>{
					this.bookList.push(...data.data.books);
					this.isMore = false;
				})
			},
			loadMore (e) {
				// 可看区域高度
				var clientHeight = document.body.clientHeight;
				// 整个文档的高度
				var scrollHeight = document.body.scrollHeight
				// 被卷去的文档高度
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(clientHeight, scrollHeight, scrollTop);
				if ( (scrollHeight-clientHeight) - scrollTop <= 10 ) {
					this.isMore = true;
					this.page ++;
					this.getData();
				}
			}
		},
		components: {
			RankItem
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
.cat-bar
	position: fixed
	top: 40px
	left: 0
	right: 0
	font-size14px
	color: #666
	background-color: #fff
	z-index: 1
	.cat-filter
		position: relative
		border-bottom: 1px solid #e8e8e8
		box-sizing: border-box
		.cat-filter-list
			position: relative
			height: 100%
			overflow-x: scroll
			white-space: nowrap
			.cat-filter-item
				display: inline-block
				padding: 0 5px
				line-height: 40px
				&.active
					color: #ed424b
					font-size: 14px
	
.books
	overflow-y: scroll	
	padding-top: 80px
	padding-left: 10px
.bottom
	p
		text-align: center
		height: 20px
		line-height: 20px
		.load
			width: 60px
			vertical-align: middle
</style>