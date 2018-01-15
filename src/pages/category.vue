<template lang="pug">
	section.category 
		//- 导入头部
		category-head
		//- 导入tabbar
		div.select.common
			section.cat(v-for=" (c, index) in category")
				h3.cat-title {{c.name}}
				ul.cat-list
					li.cat-item(v-for="book in bookList[index]")
						router-link(:to="{name: 'list', params:{major: book.name}, query: {gender: c.gender}}")
							p.cat-name {{book.name}}
							p.cat-count {{book.bookCount}}本
		div(style="padding-bottom: 65px")

		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import CategoryHead from '../components/header.vue';
import api from '../fetch/index.js';
	export default {
		name: 'category',
		data () {
			return {
				category: [],
				bookList: []
			}
		},
		created () {
			// 设置标题
			this.$store.commit("change", "分类")
			// 显示性别切换
			this.$store.commit("changeShow", false)
			api.getCategory().then(data=>{
				var obj = data.data
				for ( var key in data.data) {
					var temp = {}
					switch (key) {
						case 'male':
							temp.name = "男生";
							temp.gender = "male";		
							break;
						case 'female':
							temp.name = "女生";
							temp.gender = "female";
							break;
						case 'press':
							temp.name = "出版";
							temp.gender = "press";
							break;
						case 'picture':
							temp.name = "大众";
							temp.gender = "picture";
							break;
						default:
							break;
					}
					this.category.push(temp);
					this.bookList.push(obj[key]);
				}
				console.log(this.category, this.bookList)
			})
		},
		components: {
			TabBar,
			CategoryHead
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.cat
	position: relative
	background-color: #fff
	.cat-title
		padding: 0 10px
		height: 60px
		line-height: 60px
		font-weight: 400
		font-size: 14px
	.cat-list
		position: relative
		overflow: hidden
		.cat-item
			display: inline-block
			width: 33.3%
			box-sizing: border-box
			text-align: center
			padding: 10px 0
			&:first-child, &:nth-child(2), &:nth-child(3) 
				border-top: 1px solid #f0f0f0
			&:nth-child(3n+1), &:nth-child(3n+2) 
				border-right: 1px solid #f0f0f0
				border-bottom: 1px solid #f0f0f0
			&:nth-child(3n+3) 
				border-bottom: 1px solid #f0f0f0
			p
				line-height: 22px
			.cat-name
				font-size: 16px
				color: #333
			.cat-count
				font-size: 12px
				color: #ccc
</style>