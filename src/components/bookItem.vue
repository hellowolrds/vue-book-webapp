<template lang="pug">
	section.book-home-list
		ol.book-list-content
			li.book-list-li(v-for="book in bookList" :key="book._id")
				router-link(:to="{name:'detail', params: {id: book.book._id}}")
					img(:src="book.book.cover")
					div.book-list-book-info
						h3.book-title {{book.book.title}}
						p.book-summary.text-line-comm {{book.book.shortIntro}}
						p.book-info
							span.book-author
								i.iconfont.icon-yonghu &nbsp;{{book.book.author}}
							span.book-tags
								<em class="small-tag">{{book.book.majorCate}}</em>
								<em class="small-tag">{{book.book.isSerial?"连载中":"完结"}}</em>
								<em class="small-tag">{{book.book.latelyFollower }}人气</em>
</template>
<script>
// 导入api
import api from '../fetch/index.js';
	export default {
		name: 'bookItem',
		data () {
			return {
				staticUrl: "http://statics.zhuishushenqi.com",
				bookList: []
			}
		},
		props:['bookId', 'type'],
		created () {
			if ( this.type === 1 ) {
				api.getBookSection(this.bookId).then(data=>{
					this.bookList = data.data.data;
				});
			}
			else if ( this.type === 2 ) {
				api.getBookList(this.bookId).then(data=>{
					this.bookList = data.data.data;
				})
			}
			else if ( this.type === 3 ) {
				api.getRecommend(this.bookId).then(data=>{
					this.bookList = data.data.books;
					console.log(this.bookList)
					this.bookList.forEach((book, i)=>{
						book.book = book
						book.book.cover = this.staticUrl + book.book.cover
					})
				})
			} 
		},
		methods: {

		}
	}
</script>

<style scoped type="text/css" lang="sass">

.book-home-list
	position: relative
	.book-list-li
		padding: 10px 15px 10px 0
		border-bottom: 1px solid #f0f1f2
		border-bottom: 1px solid #f0f1f2
		a
			display: block
			overflow: hidden
			img 
				display: inline-block
				width: 66px
				height: 88px
				margin-right: 10px
				float: left
			.book-list-book-info
				position: relative
				h3
					color: #333
					line-height: 1
					margin: 5px 0 8px
					font-size: 14px
				p.book-summary
					font-size: 12px
					line-height: 1.6
					color: #969ba3
				.book-info
					margin-top: 8px
					.book-author
						margin-top: 2px
						color: #969ba3
						i 
							font-size: 12px
					.book-tags
						margin: 3px 0
						float: right
						.small-tag
							border: 1px solid #969ba3
							color: #969ba3 
							font-size: 10px
							padding: 1px
							&:nth-child(2)
								color: #ed424b
								border: 1px solid #ed424b
							&:last-child
								color: #4284ed
								border: 1px solid #4284ed

</style>