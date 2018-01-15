<template lang="pug">
	section.book-rank-list
		ol.book-list-content
			li.book-list-li(v-for="book in bookList" :key="book._id")
				router-link(:to="{name:'detail', params: {id: book._id}}")
					img(:src="staticUrl + book.cover")
					div.book-list-book-info
						h3.book-title {{book.title}}
						p.book-summary.text-line-comm {{book.shortIntro}}
						p.book-info
							span.book-author
								i.iconfont.icon-yonghu &nbsp;{{book.author}}
						p.bo
							span.red {{book.retentionRatio}}%留存
							span &nbsp;|&nbsp;
							span.blue {{book.latelyFollower}}人气
</template>
<script>
// 导入api
import api from '../fetch/index.js';
	export default {
		name: 'bookItem',
		data () {
			return {
				staticUrl: "http://statics.zhuishushenqi.com",
			}
		},
		props:['bookList'],
		created () {

		},
		methods: {

		}
	}
</script>

<style scoped type="text/css" lang="sass">

.book-rank-list
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
					-webkit-line-clamp: 1
				.book-info
					margin-top: 8px
					.book-author
						margin-top: 2px
						color: #969ba3
						i 
							font-size: 12px
				p.bo
					color: #969ba3
					margin-top: 8px
					.red 
						color: #ed424b
					.blue
						color: #4284ed
</style>