<template lang="pug">
	section.rank 
		//- 导入头部
		rank-head(@bookList="changeData")
		//- 左侧排行榜制作
		div.rank.common
			section.rank-bar-section
				ul.rank-list
					li.rank-item(v-for="data in rank" :class="{active: current===data._id}" @click="change(data._id)") {{data.shortTitle}}
			section.book-list-section
				//- 导入书籍列表
				<rank-item :bookList="bookList" :type="1"></rank-item>
		//- 导入tabbar
		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import RankHead from '../components/header.vue';
//- 导入书籍选项
import RankItem from '../components/rankItem.vue';
import api from '../fetch/index.js';
	export default {
		name: 'rank',
		data () {
			return {
				maleRank: [],
				femaleRank: [],
				rank: [],
				current: '',
				bookList: []
			}
		},
		created () {
			// 设置标题
			this.$store.commit("change", "排行榜")
			// 显示性别切换
			this.$store.commit("changeShow", true)

			// 默认显示男生
			api.getRanks().then(data=>{
				this.maleRank = data.data['male'];
				this.femaleRank = data.data['female'];
				this.rank = this.maleRank;
				this.current = this.rank[0]._id;
				this.getData(this.current);
			})
		},
		methods: {
			change (id) {
				this.current = id;
				this.getData(this.current);
			},
			changeData (id) {
				if ( id === 0 ) {
					this.rank = this.maleRank;
				}
				else if ( id === 1 ) {
					this.rank = this.femaleRank;
				}
				this.current = this.rank[0]._id;
				this.getData(this.current);
			},
			getData ( id ) {
				api.getRankBooks(id).then(res=> {
					console.log(res);
					this.bookList = res.data.ranking.books;
				})
			}
		},
		components: {
			TabBar,
			RankHead,
			RankItem
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.rank
	.rank-bar-section
		width: 80px
		position: fixed
		top: 40px
		left: 0
		bottom: 60px
		background-color: #f6f7f9
		overflow-y: scroll
		.rank-item
			display: block
			width: 100%
			height: 36px
			line-height: 36px
			text-align: center
			border-left: 2px solid #f6f7f9
			box-sizing: border-box
			float: left
			&.active
				background-color: #fff
				border-left: 2px solid #ed424b
	.book-list-section
		position: relative
		margin: 5px 0 60px 90px
		background-color: #fff
</style>