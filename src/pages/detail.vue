<template lang="pug">
	section.detail
		header.topbar
			span(@click="revert")
				a
					i.iconfont.icon-renzheng-fanhuijiantou-copy
			h2 {{title}}
		
		.detail-book.common
			//- 书籍信息模块
			section.book-info-section
				.book-detail
					img.book-cover(:src="book.cover" :alt="book.title")
					.book-desc
						h2.book-title {{book.title}}
						p.book-meta(style="color: #ed424b") {{book.author}}
						p.book-meta {{book.majorCate}}/{{book.minorCate}}
						p.book-meta {{ book.wordCount }}字<span class="split-line">&nbsp;|&nbsp;</span>{{ book.isSerial ? '连载中' : '完结'}}
				.book-reader
					p.reader-item
						span.title 追人气
						span.content {{ book.latelyFollower }}
					p.reader-item
						span.title 读者留存率
						span.content {{ book.retentionRatio }}%
					p.reader-item
						span.title 日更新字数/天
						span.content {{ book.serializeWordCount < 0 ? 0 : book.serializeWordCount }}

				.book-intro
					p.long-intro {{book.longIntro}}
				.book-menu
					router-link(:to="{name: 'menu', params: {id: book._id}, query: {menus: true}}")
						div.menu-title 目录
						p.menu-content {{book.updated|date('YYYY-MM-DD')}}<span class="split-dot">.</span>{{ book.lastChapter }}

			//- 书籍评论部分
			section.review
				h2 热门书评
				ul.review-list
					li.review-item(v-for="review in reviewList" :key="review._id")
						img.avatar(:src="staticUrl+review.author.avatar")
						.review-content
							p.name {{review.author.nickname}} <span class="time">{{review.updated|date("yyyy-MM-dd")}}</span>
							p.title {{review.title}}
							p.content.text-line-comm {{review.content}}
							p.like
								i.iconfont.icon-zan
								span {{review.likeCount}}
			//- 相关书籍部分
			section.recommend(style="padding-bottom: 20px")
				h4 同类推荐 <router-link :to="{name:'same', params: {id: book._id}}" class="more">更多></router-link>
				ul.recommend-list
					li.recommend-item(v-for="data in recommend" :key="data._id")
						router-link(:to="{name:'detail', params:{id: data._id}}")
							img.cover(:src="staticUrl + data.cover" :alt="data.title")
							p {{data.title}}
			//- 导入bookbar
			book-bar(:bookId="book._id" @add="add")
</template>
<script>
import api from '../fetch/index.js';
// bookbar
import BookBar from '../components/bookbar.vue';
	export default {
		name: 'detail',
		data () {
			return {
				staticUrl: "http://statics.zhuishushenqi.com",
				title: '书籍详情',
				book: {
					_id: 0
				},
				reviewList: '',
				recommend: '',
			}
		},
		created () {
			this.getData();
		},
		watch: {
			'$route': ['getData']
		},
		methods: {
			getData () {
				var id = this.$route.params.id;
				api.getBook(id).then(data=>{
					this.book = data.data
					this.book.cover = this.staticUrl + this.book.cover
				});
				// 获取书籍评论
				api.getReview(id).then(data=>{
					this.reviewList = data.data.reviews;
				});
				// 同类图书推荐
				api.getRecommend(id).then(data=>{
					this.recommend = data.data.books.slice(0, 4);
				})
			},
			// 添加书架
			add () {
				var bookcase = this.$store.state.bookcase;
				bookcase.push(this.book);
				var str = JSON.stringify(bookcase)
				localStorage.setItem('bookList', str);
			},
			// 返回上一级
			revert () {
				this.$router.back(-1)
			}
		},
		components: {
			BookBar
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
.detail-book
	.book-info-section
		height: 100%
		padding-top: 20px
		position: relative
		overflow: hidden
		.book-detail
			overflow: hidden
			padding: 0 15px
			.book-cover
				display: inline-block
				width: 64px
				height: 92px
				margin-right: 10px
				float: left
			.book-desc
				.book-title
					color: #333
					line-height: 1
					margin: 3px 0 5px
					font-weight: 500
					font-size: 16px
				.book-meta
					font-size: 13px
					line-height: 1.8
					&:first-child
						color: #ed424b
		.book-reader
			display: flex
			text-align: center
			padding: 10px 0
			border-top: 1px solid #ebebeb
			.reader-item
				flex: 1
				span
					display: block
					line-height: 1.5
					&.title
						font-size: 12px
						color: #999
					&.content
						font-size: 16px
						font-weight: 400
						color: #222
		.book-intro
			position: relative
			padding: 10px 15px 0
			font-size: 14px
			line-height: 1.5
			text-align: justify
			border-top: 1px solid #ebebeb
			overflow: hidden
			text-overflow: ellipsis
			display: -webkit-box
	    	-webkit-line-clamp: 4
	    	-webkit-box-orient: vertical
		.book-menu
			position: relative
			margin-top: 10px
			padding: 0 15px
			border-top: 1px solid #ebebeb
			border-bottom: 1px solid #ebebeb
			box-sizing: border-box
			overflow: hidden
			a 
				display: block
				.menu-title
					font-size: 16px
					line-height: 36px
					font-weight: 400
					float: left
					color: #000
				.menu-content
					postion: relative
					font-size: 12px
					line-height: 36px
					width: 70%
					text-align: right
					overflow: hidden
					white-space: nowrap
					text-overflow: ellipsis
					padding-right: 15px
					color: #969ba3
					float: right
	.review
    	position: relative
    	padding-left: 15px
    	overflow: hidden
    	border-bottom: 10px solid #f6f7f9
    	h2
    		line-height: 1
    		padding-top: 10px
    		font-weight: 400
    		font-size: 16px	
    	.review-list
    		overflow: hidden
    		.review-item
    			padding: 10px 0
    			font-size: 12px
    			position: relative
    			border-bottom: 1px solid #ebebeb
    			.avatar
    				position: absolute
    				top: 10px
    				left: 0
    				width: 40px
    				height: 40px
    			.review-content
    				margin-left: 50px
    				padding-right: 15px
    				.name
    					color: #a58d5e
    				.title
    					line-height: 2
    					font-weight: 700
    					white-space: nowrap
    					text-overflow: ellipsis
    					overflow: hidden
    				.content
    					line-height: 1.5
    				.like
    					margin-top: 5px
    					i
    						font-size: 13px
    						margin-right: 5px
    						color: #33373d
	.recommend
		position: relative
		overflow: hidden
		h4
			font-weight: 400
			font-size: 16px
			color: #33373d
			line-height: 1
			border-left: 2px solid #ed424b
			padding-left: 13px
			margin: 10px 0
			.more
				position: absolute
				top: 12px
				right: 15px
				font-size: 13px
				color: #ed424b
		.recommend-list
			position: relative
			display: flex
			li.recommend-item
				flex: 1
				padding: 0 15px
				.cover
					width: 60px
					height: 80px
				p
					margin-top: 10px
					color: #33373d
</style>
